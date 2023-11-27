const daysRouter = require('express').Router()
const daysModel = require('../models/days')




// get days route
daysRouter.get('/', (request, response) => {
    daysModel.find({}).then((days) => {
        response.json(days)
        console.log('days found!')
    })
})

// API route to get activities from the most recent day
daysRouter.get('/prev-activities', async (req, res) => {
    try {
        // Find the most recent day based on the 'date' field
        const mostRecentDay = await daysModel.findOne().sort({ date: -1 })

        if (!mostRecentDay) {
            return res.status(404).json({ message: 'No recent day found' })
        }

        // Extract activities from the most recent day
        const activities = mostRecentDay.activities.map(
            (activity) => activity.name,
        )

        res.status(200).json(activities)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

// create days route
daysRouter.post('/', (request, response) => {
    console.log('Received POST request:', request.body)

    const body = request.body

    // Check if moodValue or activities are missing in the request body
    if (body.moodValue === undefined || body.activities === undefined) {
        return response
            .status(400)
            .json({ error: 'moodValue and activities are required' })
    }

    // Create a new day document using the daysModel
    const day = new daysModel({
        moodValue: body.moodValue,
        activities: body.activities,
    })

    // Save the new day document to the database
    day
        .save()
        .then((savedDay) => {
            response.json(savedDay)
        })
        .catch((error) => {
            console.error('Error saving day to MongoDB:', error)
            response.status(500).json({ error: 'Internal server error' })
        })
})



module.exports = daysRouter