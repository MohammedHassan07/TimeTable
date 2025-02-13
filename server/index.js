const express = require('express')
const connectDB = require('./config/db')
const dotenv =  require('dotenv')
dotenv.config()

const app =  express()

app.use(express.json())

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`)

    connectDB()
})

const userRoute = require('./routes/user.routes')

app.use('/auth', userRoute)
