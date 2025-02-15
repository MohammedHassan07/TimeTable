const express = require('express')
const { adminMiddleware, verify_jwt_token } = require('../middleware/verifyToken')
const { generateTimetable, fetchTimetableOfSpfecificClass, fetchTimetableOfSpfecificTeacher, updateTimeTable, deleteTimetable } = require('../controller/timetable.controller')
const timetableRoute = express.Router()

timetableRoute.post('/generate', verify_jwt_token, adminMiddleware, generateTimetable)

timetableRoute.get('/:branch/:year', verify_jwt_token, fetchTimetableOfSpfecificClass)

timetableRoute.get('/teacher/:teacherId', verify_jwt_token, fetchTimetableOfSpfecificTeacher)

timetableRoute.put('/:id', verify_jwt_token, adminMiddleware, updateTimeTable)

timetableRoute.delete('/:id', verify_jwt_token, adminMiddleware, deleteTimetable)

module.exports = timetableRoute