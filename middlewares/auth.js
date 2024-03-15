// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/databaseModel');

 const authenticate =async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // Verify the token
        const user = jwt.verify(token, 'thisIsMySecretKey');
            User.findByPk(user.userId)
             .then(user =>{
              req.user = user;
              next();
            }) 
        }catch(error){
                console.log(error);
                return res.status(401).json({success : false})
}
 }

module.exports =  {
    authenticate
}; 
