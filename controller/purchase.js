const Razorpay = require('razorpay');
const order = require('../models/orders');
exports.purchasePremium = async (req, res) => {
    try {
        let rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const amount = 2500;
        rzp.orders.create({ amount, currency: "INR" }, async (err, orders) => {
            if (err) {
                console.error("Error creating order in Razorpay:", err); // Log the error for debugging

                return res.status(404).json({
                    error: "Error in razorpay",
                    message: err.message
       
                });
            }
            try {
                // Create order in the database
                const createdOrder = await req.user.createOrder({
                    orderid: order.id,
                    status: "pending",
                });
                return res.status(201).json({ order, key_id: rzp.key_id });
            } catch (error) {
                return res.status(500).json({
                    error: "Error creating order"
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: "Something Went Wrong!"
        });
    }
};

exports.updateTransactionStatus = async(req,res)=>{
    const t = await sequelize.transaction();
    try {
        let userId = req.user.id;
        const username = req.user.username;
        const orderid = req.body.orderid;
        const payment_id = req.body.payment_id;
        
        const order = await Order.findOne({where:{orderid},transaction:t});
        const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.user.update({ ispremium: true }) 
        
        Promise.all([promise1, promise2]).then(async()=> {
            await t.commit();
            return res.status(201).json({success: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,username,true) });
        }).catch((error ) => {
            throw new Error(error)
        })

    } catch (error) {
        await t.rollback();
        return res.status(500).json({
            error:"Something Went Wrong !"
        })
    }
}