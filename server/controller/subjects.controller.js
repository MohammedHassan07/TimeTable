const { TheorySubjects, Practicals } = require("../models/subjects.model")


// add subject
const addSubject = async (req, res) => {

    try {

        const { program, department, year, semester, subjects, practicals } = req.body

        // console.log('add subject -->', subjects)

        let savedTheorySubjects = []
        let savedPracticalSubjects = []

        for (const subj of subjects) {

            const theorySubject = new TheorySubjects({
                program,
                department,
                year,
                semester,
                ...subj
            })

            const savedTheorySubject = await theorySubject.save();

            savedTheorySubjects.push(savedTheorySubject);
        }

        for (const pract of practicals) {

            const practicalSubject = new Practicals({
                program,
                department,
                year,
                semester,
                ...pract
            })
            const savedPracticalSubject = await practicalSubject.save();

            savedPracticalSubjects.push(savedPracticalSubject);
        }

        res.status(201).json({
            savedTheorySubjects,
            savedPracticalSubjects,
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


        const subjects = await TheorySubjects.find()
        // console.log('view subject -->', subjects)

        res.status(200).json({ subjects })


    } catch (error) {
        console.log('view subject --> ', error)
        res.status(500).json({
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        })
    }
}

// view subject
const viewSubjectByDepartment = async (req, res) => {
    try {

        const department = req.params.department

        // console.log('view subject by department -->', department)

        const subjects = await TheorySubjects.find({ department })

        const SE_subjects = subjects.filter(subject => subject.year === 'SE');
        const TE_subjects = subjects.filter(subject => subject.year === 'TE');
        const BE_subjects = subjects.filter(subject => subject.year === 'BE');


        // let SE_subjects = [], TE_subjects = [], BE_subjects = [];

        // for (const subject of subjects) {

        //     if (subject.year === 'SE') {

        //         SE_subjects.push(subject)
        //     } else if (subject.year === 'TE') {

        //         TE_subjects.push(subject)
        //     } else if (subject.year === 'BE') {

        //         BE_subjects.push(subject)
        //     }
        // }

        console.log(TE_subjects)

        res.status(200).json({ SE_subjects, TE_subjects, BE_subjects })


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
    viewSubject,
    viewSubjectByDepartment
}