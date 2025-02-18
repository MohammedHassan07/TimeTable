
const express = require('express')
const route = express.Router();
const {facultyWorkLoad, courses} = require('../controller/charts.controller')


// Endpoint to get faculty workload data
route.get("/workload", facultyWorkLoad);

// Endpoint for course distribution
// route.get("/courses", courses);

module.exports = route

