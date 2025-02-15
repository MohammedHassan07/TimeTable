const { Schema, model } = require('mongoose')

const timetableSchema = new Schema({

    branch: { type: String, enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'], required: true },

    year: { type: String, enum: ['First Year', 'Second Year', 'Third Year', 'Final Year'], required: true },

    schedule: [
        {
            day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },

            slots: [
                {
                    slotNumber: { type: Number, min: 1, max: 6, required: true }, 
                    subject: { type: String, required: true },
                    teacher: { type: Schema.Types.ObjectId, ref: 'user', required: true }
                }
            ]
        }
    ]
}, { timestamps: true })

const timetableModel = model('timetable', timetableSchema)

module.exports = timetableModel
