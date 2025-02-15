const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    name: String,
    email: { type: String, unique: true },
    password: String,
    
    role: { type: String, enum: ['Admin', 'Teacher'], required: true },
    department: { type: String, enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'], required: true },
  
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

}, { timestamps: true })

const userModel = model('user', userSchema)

module.exports = userModel