const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

console.log('Before db connection');
console.log('MONGO_URL', MONGO_URL);
if (MONGO_URL && !mongoose.connection.readyState) {
  console.log('Attempting db connection');
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('DB connected');
    })
    .catch(() => {
      console.log('DB connection failed')
    })
}


module.exports = {
  Todo
}
