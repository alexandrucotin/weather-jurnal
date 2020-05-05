projectData = {};

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

app.get("/getData", (req, res) => {
  res.send(projectData);
});

app.post("/insertData", pushData);

function pushData(req, res) {
  const { date, city, weather, temperature, feelings } = req.body;
  if (date != '' && city != '' && weather != '' && temperature != '' && feelings != '') {
    projectData = {
      date,
      city,
      weather,
      temperature,
      feelings,
    };
    res.status(202).send();
}}

//starting the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on localhost: ${port}`);
});
