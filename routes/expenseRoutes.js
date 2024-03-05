const express = require('express');

const Expense = require('../models/expenses');
const Expenses = require('../models/expenses');

const router = express.Router();

router.post('/expense/addExpense', async (req, res) => {
  try{
    const {date, name , amount, category, userId} = req.body;
    await  Expense.create({date, name,amount,category, userId})
    .then((result) => {
        console.log("Expense Added");
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }catch (err) {
    console.error("Error in expense route:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.get('/expense/get-expense', async (req,res)=>{
  try {
    const { date, name, amount, category } = req.query;
    // const userId = req.query.userId; // Assuming userId is also a query parameter

    if (!date && !name && !amount && !category) {
      const allExpenses = await Expense.findAll({where : {userId: req.user.userId,}});
      return res.json(allExpenses);
    }
   } catch(e){
    console.error(`Error getting expenses : ${e}`);
    res.status(400).json({"Error": `Error getting expenses : ${e}`});
   }
});

router.delete('/expense/delete-expense/:id',async (req,res)=> {
  try {
    const id = req.params.id;
    await Expenses.destroy({ where: { id } });
    console.log('Expense deleted successfully');
    res.json({ success: true });
  } catch (err) {
    console.error('Error Expense comment:', err);
    res.status(500).json({ success: false, error: err.message });
  }

});

module.exports = router;
