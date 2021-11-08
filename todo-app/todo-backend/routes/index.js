const express = require('express');
const router = express.Router();

const redisFns = require('./../redis/index');

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  let keyExists = await redisFns.keyExists('added_todos');
  if(keyExists) {
    nTodos = await redisFns.getAsync('added_todos');
    res.json({
      "added_todos": nTodos
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;
