const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/databaseModel');

var rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})
exports.purchasePremium = async (req, res) => {
    try {
        // console.log(process.env.RAZORPAY_KEY_ID);
        
        const amount = 2500;
        const createOrder = () => {
            return new Promise((resolve, reject) => {
                rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(order);
                    }
                });
            });
        };

        // Create the order and handle errors
        const order = await createOrder();

        // Create a Premium record and handle errors
        await Order.create({ orderid: order.id, status: 'PENDING', userId: req.user.id });

        res.status(201).json({ order, key_id: rzp.key_id });

    } catch (err) {
        console.log(err)
        res.status(403).json({ message: 'Something went wrong', error: err })
    }
}


// exports.updateTransactionStatus = async(req,res)=>{
//     const t = await sequelize.transaction();
//     try {
//         let userId = req.user.id;
//         const username = req.user.username;
//         const orderid = req.body.orderid;
//         const payment_id = req.body.payment_id;
        
//         const order = await Order.findOne({where:{orderid},transaction:t});
//         const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
//         const promise2 =  req.user.update({ ispremium: true }) 
        
//         Promise.all([promise1, promise2]).then(async()=> {
//             await t.commit();
//             return res.status(201).json({success: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,username,true) });
//         }).catch((error ) => {
//             throw new Error(error)
//         })

//     } catch (error) {
//         await t.rollback();
//         return res.status(500).json({
//             error:"Something Went Wrong !"
//         })
//     }
// }

 exports.updateTransactionStatus = async (req, res) => {
    const { payment_id, order_id } = req.body;

    if (!req.body.suc) {
        try {

            const order = await Order.findOne({ where: { orderid: order_id } })
            const promise1 = await order.update({ paymentid: payment_id, status: 'SUCCESSFUL' })

            const user = await User.findOne({ where: { id: req.user.id } });
            const promise2 = await user.update({ ispremiumuser: true })

            Promise.all([promise1, promise2]).then(() => {
                res.status(202).json({ success: true, message: 'Transaction Successfull' })
            })
                .catch((err) => {
                    console.log(err);
                    res.status(409).json({ success: false, message: 'Transaction cancelled due to technical issues' })
                })
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err, message: 'Something went wrong' })
        }
    } else {
        try {

            const order = await Order.findOne({ where: { orderid: order_id } })
            const promise1 = await order.update({ paymentid: payment_id, status: 'FAILED' })

            const user = await User.findOne({ where: { id: req.userID.userId } });
            const promise2 = await user.update({ ispremiumuser: false })

            Promise.all([promise1, promise2]).then(() => {
                res.status(202).json({ success: true, message: 'Transaction Unsuccess' })
            })
                .catch((err) => {
                    console.log(err);
                    res.status(409).json({ success: false, message: 'Transaction cancelled due to technical issues' })
                })
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Error occured while updating' })
        }
    }

}