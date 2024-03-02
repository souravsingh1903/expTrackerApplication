const express = require('express');
// const bodyParser = require('body-parser');
const sequelize = require('./util/databaseConnector');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
// const path = require('path');

const app = express();

// middlewares
app.use(cors()); // enable CORS
app.use(express.json()); // parse requests of content-type - application/json

// Use blog routes
app.use(userRoutes);

sequelize.sync()
.then(() => {
    console.log('Database synchronized');
  })
  .then( ()=>{
    app.listen(8000);
    console.log("server running on port no 8000");
  })
  .catch(e =>{
    console.log(e);
  })