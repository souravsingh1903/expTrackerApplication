// app.js
const express = require('express');
const sequelize = require('./util/databaseConnector');
const User = require('./models/databaseModel');
const Expenses = require('./models/expenses');
const Order = require('./models/orders');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);

User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
// .sync({force : true})
.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .then(() => {
    app.listen(8000);
    console.log('Server running on port no 8000');
  })
  .catch(e => {
    console.log(e);
  });
