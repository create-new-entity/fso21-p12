const express = require('express');
const { Todo } = require('../mongo')
const redisFns = require('./../redis/index');
const redis = require('redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET one todo */
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  }
  catch(err) {
    console.log(err);
    res.status(500).end();
  }
});

/* PUT one todo */
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body , { new: true });
    res.json(updatedTodo);
  }
  catch(err) {
    console.log(err);
    res.status(500).end();
  }
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const keyExists = await redisFns.keyExists('added_todos');
  if(keyExists) {
    const currNumberOfTodos = await redisFns.getAsync('added_todos');
    await redisFns.setAsync('added_todos', '' + (Number(currNumberOfTodos) + 1));
  }
  else {
    await redisFns.setAsync('added_todos', '1');
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
