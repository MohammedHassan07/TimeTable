const express = require('express')
const { adminMiddleware, verify_jwt_token } = require('../middleware/verifyToken')
const timetabRoute = express.Router()

timetabRoute.post('/generate', verify_jwt_token)

module.exports = timetabRoute