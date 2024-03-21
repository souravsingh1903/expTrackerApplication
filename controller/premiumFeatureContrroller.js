const Expenses = require('../models/expenses');
const User = require('../models/databaseModel');
const sequelize = require('../util/databaseConnector');


exports.getLeaderBoard = async (req, res) => {
    try {
    //     const expenses = await Expense.findAll({
    //         attributes : ['UserId', [sequelize.fn('sum', sequelize.col(expenses.amount)), 'total_cost'] ],
    //         gorup : ['UserId'],
    // });
    // console.log(expenses);
    //     const users = await User.findAll({
    //         attributes : ['id','name'],
    //     });
        //const userAggregateExpense = {}; 

        // expenses.forEach(expense => {
        //     if (userAggregateExpense[expense.UserId]) {
        //         userAggregateExpense[expense.UserId] += expense.amount;
        //     } else {
        //         userAggregateExpense[expense.UserId] = expense.amount;
        //     }
        // });

        // const leaderBoardDetails = [];
        // users.forEach(user => {
        //     leaderBoardDetails.push({ name: user.name, total_cost: userAggregateExpense[user.id] || 0 });
        // });

        // leaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost); // Sort in descending order

        // res.status(200).json(expenses);

// OPTIMIZATION

        // const userLeaderBoard = await User.findAll({
        //     attributes: [
        //         'id',
        //         'name',
        //         [sequelize.fn('sum', sequelize.col('Expenses.amount')), 'total_cost']
        //     ],
        //     include: [
        //         {
        //             model: Expenses,
        //             attributes: []
        //         }
        //     ],
        //     group: ['Users.id'],
        //     order: [[sequelize.literal('total_cost'), 'DESC']]
        // });


        const leaderboardofusers = await User.findAll({
            attributes:['id','name','totalExpense'],
            group:['id'],
            order:[['totalExpense','DESC']]
        })
       
        res.status(200).json(leaderboardofusers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}