const mongoose = require('mongoose')

module.exports = async function connectDB() {
    try {
        
        const DB_URL = process.env.DB_URL
        const connection = await mongoose.connect(DB_URL)

        if (connection) {
            console.log('Database Connected...')
        }
    } catch (error) {
        console.log(error)
    }
}

