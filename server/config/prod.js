// Enables access to MongoDB using ID and PW during production mode.
module.exports = {
    mongoURI: process.env.MONGO_URI
}