require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}



// The other parts of the application can access the environment variables by importing the configuration module:

// const config = require('./utils/config')

// logger.info(`Server running on port ${config.PORT}`)