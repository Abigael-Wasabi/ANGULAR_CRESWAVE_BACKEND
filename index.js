const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');


const app = express();//!app initialization
app.use(express.json());//!body parser
require('dotenv').config();
const {authenticateUser} = require('./middleware/auth');

// sync the DB after changes/eq=laravel seeders//updating
db.sync({alert:true});

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions)); 
app.use(express.urlencoded({ extended: true }));

// db connection n authentication 
db.authenticate()
  .then(() => {//!successfully
    console.log('Connected to the database.'); 
  })
  .catch((err) => {//!errors caught in the catch block
    console.error('Error connecting to the database:', err);
  });

app.get('/', (req, res) => { 
  res.send('Take control of your work and personal life, by HappyTodoList',);
});

app.use('/user',authRoutes);
app.use('/tasks',taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});