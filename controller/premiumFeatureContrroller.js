const Expense = require('../models/expenses');
const User = require('../models/databaseModel');
const sequelize = require('../util/databaseConnector');

exports.getLeaderBoard = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        const users = await User.findAll();
        const userAggregateExpense = {};

        expenses.forEach(expense => {
            if (userAggregateExpense[expense.UserId]) {
                userAggregateExpense[expense.UserId] += expense.amount;
            } else {
                userAggregateExpense[expense.UserId] = expense.amount;
            }
        });

        const leaderBoardDetails = [];
        users.forEach(user => {
            leaderBoardDetails.push({ name: user.name, total_cost: userAggregateExpense[user.id] || 0 });
        });

        leaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost); // Sort in descending order

        res.status(200).json(leaderBoardDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
