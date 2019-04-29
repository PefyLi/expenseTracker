const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Record = require('./models/record');
const User = require('./models/user');
const methodOverride = require('method-override');

// Router Variables
const HomeRouter = require('./routes/home');
const RecordRouter = require('./routes/record');

app.use(methodOverride('_method'));

// 建立 DB 連線
mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', () => {
  console.log('Oh no, mongodb error!')
})

db.once('open', () => {
  console.log('Okay, mongodb is connected!')
})

// Import Router 
app.use('/', HomeRouter);
app.use('/records', RecordRouter);

app.listen(port, () => {
  console.log('Express is running.')
})