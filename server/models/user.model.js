const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {

    name: { type: String, required: true },

    email: { type: String, unique: true, required: true, lowercase: true, trim: true },

    password: { type: String, required: true },

    role: { type: String, enum: ['Admin', 'Teacher'], required: true },
    
    department: { 
      type: String, 
      enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'], 
      required: function() { return this.role === 'Teacher' } // Department required for teachers
    },

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
    ]}, 
  { timestamps: true }
)


const userModel = model('User', userSchema)

module.exports = userModel
