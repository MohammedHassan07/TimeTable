const express = require('express')
const {facultyWorkLoad, courses, uploadFile} = require('../controller/charts.controller');
const uploadExcelFile = require('../middleware/excelFileUpload');
const route = express.Router();


route.post('/draw-graphs', uploadExcelFile.single('file'), uploadFile)

route.get("/workload", facultyWorkLoad);

// Endpoint for course distribution
route.get("/courses", courses);

route.get('timetable')

module.exports = route

