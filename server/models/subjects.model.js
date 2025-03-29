const { Schema, model } = require('mongoose');

const practicalSchema = new Schema({

    name: String,

    labName: String
});

const subjectSchema = new Schema({

    name: String,

    abbreviation: String, 
 
    semester: Number,

    subjectCode: String,

    department: {
        type: String,
        enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'],
    },

    year: String,

    program: {
        type: String,
        enum: ['Diploma', 'Degree']
    },

    practicals: [practicalSchema]
});

const Subjects = new Schema({

    subjects: [subjectSchema]
})

const Subject = model('Subject', Subjects)

module.exports = Subject;
