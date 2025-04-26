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


        const [theory, practicals] = await Promise.all([TheorySubjects.find(), await Practicals.find()])

        // console.log('view subject -->', theory)

        res.status(200).json({ theory, practicals })


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

        let [theorySubjects, practicalSubjects] = [];
        if (department === 'All') {
            
            [theorySubjects, practicalSubjects] = await Promise.all([TheorySubjects.find(), Practicals.find()])
        } else {
            [theorySubjects, practicalSubjects] = await Promise.all([TheorySubjects.find({ department }), Practicals.find({ department })])
        }

        // console.log(theorySubjects, practicalSubjects)

        const SE_subjects = theorySubjects.filter(subject => subject.year === 'SE');
        const TE_subjects = theorySubjects.filter(subject => subject.year === 'TE');
        const BE_subjects = theorySubjects.filter(subject => subject.year === 'BE');

        const SE_practicals = practicalSubjects.filter(prac => prac.year === 'SE')
        const TE_practicals = practicalSubjects.filter(prac => prac.year === 'TE')
        const BE_practicals = practicalSubjects.filter(prac => prac.year === 'BE')

        // console.log('TE theory', TE_subjects, '\n practicals', TE_practicals)

        res.status(200).json({ SE_subjects, SE_practicals, TE_subjects, TE_practicals, BE_subjects, BE_practicals })


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