const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/databaseModel');


// routes/userRoutes.js
exports.generateAccessToken = (id, name,isPremiumUser) => {
    return jwt.sign({ userId: id , name:name, isPremiumUser}, 'thisIsMySecretKey');
  }
exports.signUp = async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
  
      bcrypt.hash(password, 10, async (err, hash) => {
        await User
          .create({
            name: name,
            email: email,
            password: hash,
          })
          .then((result) => {
            console.log("User Added");
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }catch (err) {
      console.error("Error in User route:", err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email: username } });

      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const token = exports.generateAccessToken(user.id,user.name, user.isPremiumUser);
        return res.status(201).json({
          message: 'User login successful',
          token: token,
        });
      } else {
        return res.status(401).json({ message: 'User not authorized' });
      }
    } catch (error) {
      console.error('Error in User route:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } 
}



// exports.isPremiumUser = async (req, res, next) => {
//   try {
//     if (req.user.isPremiumUser) {
//       return res.json({ isPremiumUser: true });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };