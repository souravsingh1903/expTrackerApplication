// routes/expenseRoutes.js
const express = require('express');

const expenseController  = require('../controller/expenseContrroller')
const userAuthorization = require('../middlewares/auth');
const router = express.Router();

// ... (addExpense route)
console.log('Route 1 Working');
router.post('/expense/addExpense', userAuthorization.authenticate, expenseController.addExpense);

console.log('Route 2 Working');
router.get('/expense/get-expense', userAuthorization.authenticate, expenseController.getExpense );

router.delete('/expense/delete-expense/:id', userAuthorization.authenticate, expenseController.deleteExpense );
console.log('Route 3 Working');
module.exports = router;
