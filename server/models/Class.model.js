const classSchema = new Schema({

    branch: { type: String, enum: ['Computer', 'Mechanical', 'Electrical', 'Civil'], required: true },

    year: { type: Number, required: true },

    subjects: [{ type: String, required: true }], // Subjects taught in this class
    
  })
  
  const Class = model('Class', classSchema)
  module.exports = Class
  