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
const timetableRoutes = require('./routes/timetable.routes')

app.use('/auth', userRoute)
app.use('/timetable', timetableRoutes)
