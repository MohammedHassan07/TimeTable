const { Schema, model } = require('mongoose')

const practicalSchema = new Schema({

    name: String,

    labName: String

})

const subject = new Schema({

    name: String,

    abbreviation: String,

    semester: Number,

    department: {
        type: String,
        enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'],
    },

    programType: {

        type: String,
        enum: ['Diploma', 'Degree']
    },

    practical: practicalSchema

})



const subjectsSchema = new Schema({

    subjects: [subject]
})


const Subject = model('Subjects', subjectsSchema)
module.exports = Subject
