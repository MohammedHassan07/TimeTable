const teacherModel = require('../models/Teacher.model')
const userModel = require('../models/user.model')
const timetableModel = require('../models/Timetable.model')

// generate time table
router.post('/generate', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { branch, year, subjects } = req.body // subjects = [{ subject, teacherId }]

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const slotsPerDay = 6

        const breakTime = { day: 'Thursday', slotNumber: 3 } // Break on Thursday slot 3

        let schedule = []

        // Fetch teachers and their free slots
        let teachers = await teacherModel.find({ role: 'Teacher' }).lean()

        let assignedSlots = {}

        // Assign subjects to slots for each day
        for (let day of days) {
            let daySchedule = { day, slots: [] }
            let availableSubjects = [...subjects]

            for (let slotNumber = 1; slotNumber <= slotsPerDay; slotNumber++) {
                if (day === breakTime.day && slotNumber === breakTime.slotNumber) {
                    daySchedule.slots.push({ slotNumber, subject: 'Break', teacher: null })
                    continue
                }

                if (availableSubjects.length === 0) break // No more subjects to assign

                let randomIndex = Math.floor(Math.random() * availableSubjects.length)
                let { subject, teacherId } = availableSubjects[randomIndex]

                // Ensure no conflicts
                if (!assignedSlots[teacherId]) assignedSlots[teacherId] = []
                if (assignedSlots[teacherId].some(s => s.day === day && s.slotNumber === slotNumber)) {
                    continue // Skip if teacher is already assigned this slot
                }

                // Assign lecture
                daySchedule.slots.push({ slotNumber, subject, teacher: teacherId })
                assignedSlots[teacherId].push({ day, slotNumber })

                // Remove subject to prevent overuse
                availableSubjects.splice(randomIndex, 1)
            }

            schedule.push(daySchedule)
        }

        // Save to DB
        const timetable = new timetableModel({ branch, year, schedule })
        await timetable.save()

        res.status(201).json({ message: 'Timetable generated successfully', timetable })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

module.exports = {
    genera
}