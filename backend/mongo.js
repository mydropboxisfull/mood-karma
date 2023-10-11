







// THIS FILE IS USED FOR TESTING AND IS NOT RELEVANT TO APP  --- USE MODELS FOLDER



const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://notesDB:bennotesDB@cluster0.asxu5yv.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  message: String,
  status: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  message: 'hello UNIVERSE man',
  status: true,
})

note.save().then(result => {
  console.log('note numba 2 saved!')
  mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })