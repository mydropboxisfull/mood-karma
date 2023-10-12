const express = require("express"); // require express package
const app = express(); // run express as app

// ----------------------------- PACKAGES ----------------------------------
const cors = require("cors"); 
app.use(cors()); // CORS allows or denies cross-origin requests (allow two diff ports to talk)

require("dotenv").config(); // is used for loading environment variables

var bodyParser = require("body-parser"); // require body-parser package (NEED TO STUDY MORE)
// var urlencodedParser = bodyParser.urlencoded({ extended: false }) // DO NOT NEED - THIS IS FOR URL ENCODED DATA NOT RAW JSON
var jsonParser = bodyParser.json(); // ^^ assigns to jsonParser

const daysModel = require("./models/days"); // Mongoose schema and model for handling notes ---- Found in days.js

app.use(express.static('dist'))

// ------------------------------------------------------------------------



const baseUrl = '/api/days'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}



// testing route
// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// get days route
app.get("/api/days", (request, response) => {
  daysModel.find({}).then((days) => {
    console.log("finding days");
    response.json(days);
    console.log("days found!");
  });
});


// API route to get activities from the most recent day
app.get('/api/days/prev-activities', async (req, res) => {
  try {
    // Find the most recent day based on the 'date' field
    const mostRecentDay = await daysModel.findOne().sort({ date: -1 });

    if (!mostRecentDay) {
      return res.status(404).json({ message: 'No recent day found' });
    }

    // Extract activities from the most recent day
    const activities = mostRecentDay.activities.map(activity => activity.name);

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
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
const PORT = process.env.PORT || 3000; // starts server on designated port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
