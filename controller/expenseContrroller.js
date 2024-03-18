const Expense = require('../models/expenses');

 exports.addExpense = async (req, res) => {
    try{
      const {date, name , amount, category,} = req.body;
      await  Expense.create({date, name,amount, category, UserId : req.user.id})
      .then((result) => {
          console.log("Expense Added");
          res.status(201).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }catch (err) {
      console.error("Error in expense route:", err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  exports.getExpense = async (req, res) => {
    try {
      // 
      await Expense.findAll({where : {userId : req.user.id}})
      .then(expesne =>{
        return res.status(201).json(expesne);
      })
      
      } catch (e) {
        
      console.error(`Error getting expenses : ${e}`);
      res.status(400).json({ "Error": `Error getting expenses : ${e}` });
    }
  }

  exports.deleteExpense =  (req, res) => {
    try {
        const id = req.params.id; // Check the parameter name in your route
        const userId = req.user.id;
     if(id == undefined || id.length === 0){
      return res.status(404).json({success : false});
     }
         Expense.destroy({ where: { id: id, UserId: userId } })
        .then((noOfRows) =>{
          if(noOfRows === 0){
           return res.status(404).json({ success: false , message : 'Expense does not belong to the user'});
          }else{
            return  res.json({ success: true , message : 'Expense has been deleted'});
        }
        });
       
    } catch (err) {
        console.error('Error Expense comment:', err);
        return  res.status(500).json({ success: true, message : failed });
    }
}