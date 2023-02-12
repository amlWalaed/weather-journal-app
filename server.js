
// Setup empty JS object to act as endpoint for all routes
const url = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = 'appid=d9efe5bdf63dbb7e7b2c869a96552aed&units=imperial';
projectData = [];

// Require Express to run server and routes
const express = require("express")
// Start up an instance of app
const app = express()

/* Middleware*/
const bodyParser = require("body-parser")
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.post('/getApi', (req , res) => {
    res.send({url:url+apiKey+'&zip='+req.body.zip})
})
app.post('/getData', async (req, res) => {
    try{
       projectData.push(req.body)
       res.send({
        temp:req.body.temp,
        date:req.body.date,
        feel:req.body.feel
    })
    }catch(err){
        console.log(err)
    }
})
const port = 3333
app.listen(port, function(req , res){
    console.log(`Example app listening on port ${port}!`);
})