const express = require('express');
const cors = require('cors'); //allows server to inficate any origins
const mongoose = require('mongoose'); //

require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 5000; //

//middleware
app.use(cors()); 
app.use(express.json());

//mongodb connection
const uri = process.env.ATLAS_URI; //
mongoose.connect(uri, {
    useNewURLParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))

//file routes
const tuitionRouter = require('./routes/tuition'); //require tuition route file
const loansRouter = require('./routes/loans'); //require loans route file
const expensesRouter = require('./routes/expenses'); //require expenses route file

app.use('/tuition', tuitionRouter); //use tuition route file
app.use('/loans', loansRouter); //use loans route file
app.use('/expenses', expensesRouter); //use expenses route file

//display port 
app.listen(port, () => { //
    console.log('Server is running on port: ' + port);
});