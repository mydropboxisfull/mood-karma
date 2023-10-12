const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


// const url = process.env.MONGODB_URI
const url = "mongodb+srv://notesDB:bennotesDB@cluster0.asxu5yv.mongodb.net/noteApp?retryWrites=true&w=majority"



console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const daysSchema = new mongoose.Schema({
    moodValue: {
      type: Number,
      required: true,
      min: 1, // Minimum mood value
      max: 3, // Maximum mood value
    },
    activities: [
      {
        name: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          required: true,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  });
  

daysSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Days', daysSchema)