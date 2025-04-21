const Teacher = require('../models/Teacher.model')

// create teacher profile
const createTeacherProfile = async (req, res) => {

    try {

        // console.log('create teacher profile -->', req.body)

        // const { subjects } = req.body

        const admin = req.id

        const newTeacher = new Teacher({...req.body, admin});

        // update the teacher profile while assigning the subjects, (update subjects field)

        const saved_data = await newTeacher.save()

        res.status(201).json({
            saved_data,
            "status": 201,
            "message": "Teacher Profile created sccessfully"
        })


    } catch (error) {

        console.log('create teacher --> ', error)
        res.status(500).json({
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        })
    }
}

const viewTeachers = async (req, res) => {
    try {

        const teachers = await Teacher.find()

        if (!teachers) return res.status(404).json({
            message: 'No teachers added yet. Click Create to add one.',
            "status": 404,
        })
        res.status(200).json({
            teachers,
            "status": 200,
        })

    } catch (error) {
        console.log('view teacher --> ', error)
        res.status(500).json({
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        })
    }
}

const viewTeachersByDepartment = async (req, res) => {
    try {

        const department = req.params.department

        // console.log('view teacher by department', department)

        const teachers = await Teacher.find({ department })

        res.status(200).json({teachers})


    } catch (error) {
        console.log('view subject --> ', error)
        res.status(500).json({
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        })
    }
}

module.exports = {

    createTeacherProfile,
    viewTeachers,
    viewTeachersByDepartment
}