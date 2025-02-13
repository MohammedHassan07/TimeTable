const isEmpty = require('../middleware/isEmpty')
const isUnique = require('../middleware/isUnique')
const express = require('express')
const { user_login, create_user_profile } = require('../controller/user.controller')

const userRoute = express.Router()

userRoute.post('/register',
    
    isEmpty,
    isUnique,
    create_user_profile)

userRoute.post('/login', isEmpty, user_login)

module.exports = userRoute
