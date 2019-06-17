const express = require('express');
const mongoose = require('mongoose');


//initalization of express to one constant
const app = express();


//body-parser middeleware
app.use(express.json());

//DB config
const db = require('./config/default.json').mongodbUrl;





//connect to mongobd
mongoose.connect(db,
   {
      useNewUrlParser: true
   })
   .then(() => console.log("db connected"))
   .catch(error => console.log('error'))

//run server
const port = process.env.PORT || 5000;



//listening the port
app.listen(port, () => console.log(`Server Started on Port ${port}`));