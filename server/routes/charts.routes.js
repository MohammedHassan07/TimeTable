const express = require('express')
const {facultyWorkLoad, courses, uploadFile, departmentSubjects, facultyWorkLoadStacked, facultyWorkLoadStackedPie} = require('../controller/charts.controller');
const uploadExcelFile = require('../middleware/excelFileUpload');
const route = express.Router();


route.post('/draw-graphs', uploadExcelFile.single('file'), uploadFile)

route.get("/workload", facultyWorkLoad);

// Endpoint for course distribution
route.get("/courses", courses);

// --------------------------

route.get('/faculty-workload', facultyWorkLoadStacked)


route.get('/faculty-workload-distribution', facultyWorkLoadStackedPie)
// ---------------------------
route.get('timetable')

route.get('/department-subjects', departmentSubjects)

module.exports = route

