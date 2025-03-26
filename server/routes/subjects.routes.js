const isEmpty = require('../middleware/isEmpty')
const isUnique = require('../middleware/isUnique')
const express = require('express')
const { verify_jwt_token } = require('../middleware/verifyToken')
const { addSubject, viewSubject } = require('../controller/subjects.controller')

const subjectRoutes = express.Router()

subjectRoutes.post('/add-subject',

    isEmpty,
    verify_jwt_token,
    addSubject
)

subjectRoutes.get('/view-subjects',

    verify_jwt_token,
    viewSubject
)

module.exports = subjectRoutes
