// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes

// Start up an instance of app

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

// Initialize the main project folder

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route



const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const projectData = [];

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//initialize thje main project folder
app.use(express.static('website'));

//routes

app.get('/', (req, res) => {
    res.send("HELLOOO!!!");
})

app.post('/addMovie', (req, res) =>{
    console.log(req.body);
    data.push(req.body);
})

//running the server on port 8000
const port = 8000;

const server = app.listen(port, () => {console.log(`Server is running on localhost: ${port}`);})
