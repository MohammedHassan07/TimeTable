const Subject = require("../models/subjects.model")

// add subject
const addSubject = async (req, res) => {
    try {


        /* Request JSON
    {
        "subjects": [
            {
                "name": "Data Structures",
                "abbreviation": "DSA",
                "semester": 3,
                "department": "Computer",
                "programType": "Degree",
                "practical": {
                    "name": "DSA Lab",
                    "abbreviation": "DSA Lab",
                    "labName": "Computer Lab 1"
                }
            }, {
                "name": "Data Structures",
                "abbreviation": "DSA",
                "semester": 3,
                "department": "Computer",
                "programType": "Degree",
                "practical": {
                    "name": "DSA Lab",
                    "abbreviation": "DSA Lab",
                    "labName": "Computer Lab 1"
                }
            }
        ]
    }

        */

        const { program, department, year, semester, subjects, practicals } = req.body

        // console.log('add subject -->', practicals)

        const subjectsData = new Subject({subjects: {program, department, year, semester, subjects, practicals}})

        const saved_data = await subjectsData.save()

        res.status(201).json({
            saved_data,
            "status": 201,
            "message": "Subject Added successfully"
        })

    } catch (error) {
        console.log('Add subject --> ', error)
        res.status(500).json({
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        })
    }
}

// view subject
const viewSubject = async (req, res) => {
    try {

        const { } = req.body
        console.log('view subject -->', req.body)


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

    addSubject,
    viewSubject
}