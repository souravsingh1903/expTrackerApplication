const express = require('express');
// const bodyParser = require('body-parser');
const sequelize = require('./util/databaseConnector');
const User = require('./models/databaseModel')
const Expenses = require('./models/expenses');

const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
// const path = require('path');

const app = express();

// middlewares
app.use(cors()); // enable CORS
app.use(express.json()); // parse requests of content-type - application/json

// Use blog routes
app.use(userRoutes);
app.use(expenseRoutes);

// Asscoiation
User.hasMany(Expenses);
Expenses.belongsTo(User);


sequelize.sync()
.then(() => {
    console.log('Database synchronized');
  })
  .then( ()=>{
    app.listen(8000);
    console.log("server running on port no 8000");
  })
  .catch(e =>{
    console.log(e);
  })