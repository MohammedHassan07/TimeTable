const { Schema, model, Types } = require('mongoose');

const teacherSchema = new Schema({

  admin: { type: Types.ObjectId, ref: 'Admin' },

  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  department: {

    type: String,
    enum: ['Computer', 'Mechanical', 'Electrical', 'Civil', 'ENTC'],
    required: true
  },

  // programType: {
  //   type: String,
  //   enum: ['Diploma', 'Degree', 'Both'],
  //   required: true
  // },

  Theory: [{ type: Types.ObjectId, ref: 'TheorySubject' }], // Reference to Subjects collection
  practical: [{ type: Types.ObjectId, ref: 'Practical' }], // Reference to Subjects collection

  freeSlots: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
      },
      slotNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 6 // Slot numbers between 1-6
      }
    }
  ]
});

const Teacher = model('Teacher', teacherSchema);
module.exports = Teacher;
