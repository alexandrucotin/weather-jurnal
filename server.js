const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//object
const projectData = {};

const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("website"));

//routes
app.get("/getData", (req, res) => {
  res.send(projectData);
});

app.post("/insertData", (req, res) => {
  console.log(req.body);
  data = {
    city: req.body.city,
    temperature: req.body.temperature,
  };
  projectData.push(data);
  res.send(projectData);
});

//starting the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on localhost: ${port}`);
});
