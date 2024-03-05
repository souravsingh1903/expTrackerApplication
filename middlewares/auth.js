const User = require("../models/databaseModel")
const jwt = require("jsonwebtoken");
exports.authenticate = async(req,res,next)=>{
    try {
        const token = req.header("Authorization");
        const user = jwt.verify(token,'thisIsMySeceretKey');
        if(!user)
        {
            throw new Error("Invalid Token");
        }
        await User.findByPk(user.userid)
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            error:"Something Went WrOnG"
        })
    }
    
}