// routes/userRoutes.js
const express = require('express');
const userController  = require('../controller/userController');

const router = express.Router();

// ... (user sign-up route)

router.post("/user/sign-up",userController.signUp);


console.log("user routes working");
router.post('/user/login', userController.login);

module.exports = router;
