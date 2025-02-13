const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    name: String,
    email: { type: String, unique: true },
    password: String,
    
    role: { type: String, enum: ['admin', 'teacher'], required: true },
    department: { type: String, enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'], required: true },
  
    freeSlots: [
        {
          day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
          slotNumber: { type: Number } // 1 to 6, representing free lecture slots
        }
      ]

}, { timestamps: true })

const userModel = model('user', userSchema)

module.exports = userModel