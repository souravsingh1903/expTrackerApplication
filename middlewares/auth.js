// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/databaseModel');

 const authenticate =async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // Verify the token
        
        const user = jwt.verify(token, 'thisIsMySecretKey');
          const findUser = await  User.findByPk(user.userId)
            //  .then(user =>{
            //   req.user = user;
            // //   console.log(user);
            //   next();
            // }) 
            if(!findUser){
                return res.status(401).send({ error: "Invalid Token" });
            }
            req.user = findUser;
            console.log(req.user.id);
          next();

        }catch(error){
                console.log(error);
                return res.status(401).json({success : false})
}
 }

module.exports =  {
    authenticate
}; 
