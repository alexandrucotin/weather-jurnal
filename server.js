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
  const { city, temperature, feelings } = req.body;
  projectData = {
      city,
      temperature,
      feelings
  }
  res.send(projectData);
}

//starting the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on localhost: ${port}`);
});
