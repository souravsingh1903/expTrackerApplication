const Expense = require('../models/expenses');
const User = require('../models/databaseModel');
const sequelize = require("../util/databaseConnector");
exports.addExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { date, name, amount, category } = req.body;
    const expense = await Expense.create({ date, name, amount, category, UserId: req.user.id }, { transaction: t });

    const sum = Number(req.user.totalExpense) + Number(amount);
    await User.update(
      { totalExpense: sum },
      {
        whee: {
          id: req.user.id
        },
        transaction: t
      }
    );

    await t.commit();
    return res.status(200).json(expense);
  } catch (err) {
    console.error("Error in expense route:", err);
    await t.rollback();
    return res.status(500).send(`Error adding the expense.`);
  }
};




exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    return res.status(200).json(expenses);
  } catch (err) {
    console.error(`Error getting expenses : ${err}`);
    res.status(400).json({ "Error": `Error getting expenses : ${err}` });
  }
};

exports.deleteExpense = async (req, res) => {
  // const t = await  sequelize.transaction();
  // try {
  //   const id = req.params.id;
  //   const userId = req.users.id;
  //   const totalExpense =  req.users.totalExpense;
  //   if (!id) {
  //     return res.status(404).json({ success: false });
  //   }
  //   totalExpense  = totalExpense - Number(req.body.amount);
  //   User.update({totalExpense : totalExpense}, 
  //     {
  //       where : {
  //         id : req.user.id
  //       }, 
  //       {
  //         transaction : t
  //       }
  //     })
  //   const noOfRows = await Expense.destroy({ where: { id: id, UserId: userId } });
  //   User.update()
  //   if (noOfRows === 0) {
  //     return res.status(404).json({ success: false, message: 'Expense does not belong to the user' });
  //   } else {
  //     return res.json({ success: true, message: 'Expense has been deleted' });
  //   }
  let userId = req.user.id;
  let totalExpense = req.user.totalExpense;
  const t = await sequelize.transaction();
  try {
      if(!totalExpense)
      {
          return res.status(404).json({
              error:"Can't Delete the Expense!"
          })
      }
      let id = req.params.id;
      let expense = await Expense.findByPk(id);
      let amount = Number.parseInt(expense.amount);
      totalExpense -= amount;
      await Expense.destroy({where:{id,userId},transaction:t})
      await User.update({totalExpense},{where:{id:userId},transaction:t})
      t.commit();
      res.status(201).json({
          message:"Expense Deleted!"
      })
  } catch (err) {
    console.error('Error Expense comment:', err);
    t.rollback();
    return res.status(500).json({ success: true, message: 'Failed' });
  }
};
