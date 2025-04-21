const { createTeacherProfile, viewTeachers, viewTeachersByDepartment } = require('../controller/teacher.controller')
const isEmpty = require('../middleware/isEmpty')
const isUnique = require('../middleware/isUnique')
const express = require('express')
const { verify_jwt_token } = require('../middleware/verifyToken')

const userRoute = express.Router()

userRoute.post('/add-teacher',

    isEmpty,
    // isUnique,
    verify_jwt_token,
    createTeacherProfile
)

userRoute.get('/view-teacher',

    verify_jwt_token,
    viewTeachers
)

userRoute.get('/view-teacher-by-department/:department',

    verify_jwt_token,
    viewTeachersByDepartment
)

module.exports = userRoute
