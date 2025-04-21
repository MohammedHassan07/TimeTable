const { Schema, model } = require('mongoose');

const practicalSchema = new Schema({

    name: String,

    labName: String,

    year: String,
    
    semester: Number,
    
    program: {
        type: String,
        enum: ['Diploma', 'Degree']
    },

    department: {
        type: String,
        enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'],
    },
});

const subjectSchema = new Schema({

    name: String,

    abbreviation: String, 
 
    semester: Number,

    subjectCode: String,

    department: {
        type: String,
        enum: ['Computer', 'Mechanical', 'Electrical', 'Civil', 'ENTC'],
    },

    year: String,

    program: {
        type: String,
        enum: ['Diploma', 'Degree']
    },
});


const TheorySubjects = model('TheorySubject', subjectSchema)
const Practicals = model('Practical', practicalSchema)

module.exports = {TheorySubjects, Practicals}
