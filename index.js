const express = require("express"); // require express package
const app = express(); // run express as app

// ----------------------------- PACKAGES ----------------------------------
const cors = require("cors"); 
app.use(cors()); // CORS allows or denies cross-origin requests (allow two diff ports to talk)

require("dotenv").config(); // is used for loading environment variables

var bodyParser = require("body-parser"); // require body-parser package (NEED TO STUDY MORE)
// var urlencodedParser = bodyParser.urlencoded({ extended: false }) // DO NOT NEED - THIS IS FOR URL ENCODED DATA NOT RAW JSON
var jsonParser = bodyParser.json(); // ^^ assigns to jsonParser

const daysModel = require("./backend/models/days"); // Mongoose schema and model for handling notes ---- Found in days.js

// ------------------------------------------------------------------------


// testing route
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// get days route
app.get("/api/days", (request, response) => {
  daysModel.find({}).then((days) => {
    console.log("finding days");
    response.json(days);
    console.log("days found!");
  });
});

// create days route
app.post("/api/days", jsonParser, (request, response) => {
  console.log("Received POST request:", request.body);

  const body = request.body;

  // Check if moodValue or activities are missing in the request body
  if (body.moodValue === undefined || body.activities === undefined) {
    return response.status(400).json({ error: "moodValue and activities are required" });
  }

  // Create a new day document using the daysModel
  const day = new daysModel({
    moodValue: body.moodValue,
    activities: body.activities,
  });

  // Save the new day document to the database
  day.save()
    .then((savedDay) => {
      response.json(savedDay);
    })
    .catch((error) => {
      console.error("Error saving day to MongoDB:", error);
      response.status(500).json({ error: "Internal server error" });
    });
});



// ----------------------------- PACKAGES ----------------------------------
const PORT = process.env.PORT || 3001; // starts server on designated port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
