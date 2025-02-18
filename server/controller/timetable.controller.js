const teacherModel = require('../models/Teacher.model')
const timetableModel = require('../models/Timetable.model')
const userModel = require('../models/user.model')

/* Generate time table 
POST /api/timetable/generate
Authorization: Bearer your_token_here
Content-Type: application/json

{
  "branch": "Computer",
  "year": "First Year",
  "subjects": [
    { "subject": "Math", "teacherId": "65b78a9f1234567890abcdef" },
    { "subject": "Physics", "teacherId": "65b78a9f9876543210fedcba" }
  ]
}
*/
const generateTimetable = async (req, res) => {
    try {
        const { branch, year, subjects } = req.body; // subjects = [{ subject, teacherId }]
        console.log(req.body);

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const slotsPerDay = 6;
        const breakTime = { day: 'Thursday', slotNumber: 3 }; // Break on Thursday slot 3

        let schedule = [];

        // Fetch teachers and group them by subjects they can teach
        let teachers = await userModel.find({ department: branch }).lean();
        let teacherMap = {}; // Map subject -> list of available teachers
        teachers.forEach(teacher => {
            if (!teacherMap[teacher.subject]) {
                teacherMap[teacher.subject] = [];
            }
            teacherMap[teacher.subject].push(teacher._id);
        });

        let assignedSlots = {}; // Track assigned slots for each teacher

        // Assign subjects to slots for each day
        for (let day of days) {
            let daySchedule = { day, slots: [] };
            let availableSubjects = [...subjects];

            for (let slotNumber = 1; slotNumber <= slotsPerDay; slotNumber++) {
                if (day === breakTime.day && slotNumber === breakTime.slotNumber) {
                    daySchedule.slots.push({ slotNumber, subject: 'Break', teacher: null });
                    continue;
                }

                if (availableSubjects.length === 0) break; // No more subjects to assign

                let randomIndex = Math.floor(Math.random() * availableSubjects.length);
                let { subject } = availableSubjects[randomIndex];

                // Get available teachers for the subject
                let availableTeachers = teacherMap[subject] || [];

                if (availableTeachers.length === 0) {
                    console.log(`No teacher available for subject: ${subject}`);
                    continue; // Skip if no teacher is available
                }

                // Pick a random teacher for the subject
                let teacherId = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

                // Ensure no conflicts
                if (!assignedSlots[teacherId]) assignedSlots[teacherId] = [];
                if (assignedSlots[teacherId].some(s => s.day === day && s.slotNumber === slotNumber)) {
                    continue; // Skip if teacher is already assigned this slot
                }

                // Assign lecture
                daySchedule.slots.push({ slotNumber, subject, teacher: teacherId });
                assignedSlots[teacherId].push({ day, slotNumber });

                // Remove subject to prevent overuse
                availableSubjects.splice(randomIndex, 1);
            }

            schedule.push(daySchedule);
        }

        // Save to DB
        const timetable = new timetableModel({ branch, year, schedule });

        console.log('Generated Timetable:', timetable);
        await timetable.save();

        res.status(201).json({ message: 'Timetable generated successfully', timetable });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        console.log('Error generating timetable:', error);
    }
};


/*
Fetch Timetable for a Specific Class
GET /api/timetable/Computer/First Year
Authorization: Bearer your_token_here
*/
const fetchTimetableOfSpfecificClass = async (req, res) => {

    try {
        const { branch, year } = req.params
        const timetable = await timetableModel.findOne({ branch, year }).populate('schedule.slots.teacher', 'name email')

        if (!timetable) return res.status(404).json({ message: 'Timetable not found' })
        res.json(timetable)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

/* 
GET /api/timetable/teacher/65b78a9f1234567890abcdef
Authorization: Bearer your_token_here
*/
const fetchTimetableOfSpfecificTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params
        const timetables = await timetableModel.find({ 'schedule.slots.teacher': teacherId }).populate('schedule.slots.teacher', 'name email')

        if (timetables.length === 0) return res.status(404).json({ message: 'No schedule found for this teacher' })
        res.json(timetables)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

/*
PUT /api/timetable/65b78a9fabcdef1234567890
Authorization: Bearer your_token_here
Content-Type: application/json
{
  "schedule": [
    { "day": "Monday", "slots": [{ "slotNumber": 1, "subject": "Updated Math", "teacher": "65b78a9f1234567890abcdef" }] }
  ]
}
*/

const updateTimeTable = async (req, res) => {

    try {
        const updatedTimetable = await timetableModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedTimetable) return res.status(404).json({ message: 'Timetable not found' })

        res.json({ message: 'Timetable updated successfully', updatedTimetable })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

/* 

DELETE /api/timetable/65b78a9fabcdef1234567890
Authorization: Bearer your_token_here
*/
const deleteTimetable = async (req, res) => {

    try {
        const deletedTimetable = await timetableModel.findByIdAndDelete(req.params.id)
        if (!deletedTimetable) return res.status(404).json({ message: 'Timetable not found' })

        res.json({ message: 'Timetable deleted successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// 🔹 Generate timetableModel (Handles Conflicts)
// router.post('/generate', async (req, res) => {
//     try {
//         const { qualification, branch, year, subjects } = req.body;

//         let timetableModel = await timetableModel.findOne({ qualification, branch, year });
//         if (timetableModel) {
//             return res.status(400).json({ message: 'timetableModel already exists' });
//         }

//         timetableModel = new timetableModel({ qualification, branch, year, schedule: [] });

//         const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         const slotsPerDay = 6;
//         const schedule = [];

//         for (const day of days) {
//             const slots = [];

//             for (let i = 1; i <= slotsPerDay; i++) {
//                 const subject = subjects[i % subjects.length]; // Assign subjects cyclically

//                 // Find a free teacher who teaches the subject
//                 const teacher = await User.findOne({
//                     subjects: subject,
//                     freeSlots: { $elemMatch: { day, slotNumber: i } }
//                 });

//                 if (!teacher) {
//                     return res.status(400).json({ message: `No available teacher for ${subject} on ${day}, Slot ${i}` });
//                 }

//                 // Check if teacher has already taken a lecture in another qualification at the same time
//                 const teacherConflict = await timetableModel.findOne({
//                     schedule: {
//                         $elemMatch: {
//                             day,
//                             slots: { $elemMatch: { slotNumber: i, teacher: teacher._id } }
//                         }
//                     }
//                 });

//                 if (teacherConflict) {
//                     return res.status(400).json({ message: `Teacher ${teacher.name} has a conflict at ${day}, Slot ${i}` });
//                 }

//                 slots.push({ slotNumber: i, subject, teacher: teacher._id, isPractical: false });

//                 // Handle Practical (100-minute session, i.e., two consecutive slots)
//                 if (i < slotsPerDay && i % 2 !== 0) {
//                     const practicalTeacher = await User.findOne({
//                         subjects: subject,
//                         freeSlots: { $elemMatch: { day, slotNumber: i + 1 } }
//                     });

//                     if (practicalTeacher) {
//                         slots.push({ slotNumber: i + 1, subject, teacher: practicalTeacher._id, isPractical: true });
//                         i++; // Skip next slot as it's already assigned
//                     }
//                 }
//             }

//             schedule.push({ day, slots });
//         }

//         timetableModel.schedule = schedule;
//         await timetableModel.save();

//         res.status(201).json({ message: 'timetableModel generated successfully', timetableModel });

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// // 🔹 Get timetableModel for a Class
// router.get('/', async (req, res) => {
//     try {
//         const { qualification, branch, year } = req.query;
//         const timetableModel = await timetableModel.findOne({ qualification, branch, year }).populate('schedule.slots.teacher', 'name email');

//         if (!timetableModel) {
//             return res.status(404).json({ message: 'timetableModel not found' });
//         }

//         res.json(timetableModel);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

module.exports = {
    generateTimetable,
    fetchTimetableOfSpfecificClass,
    fetchTimetableOfSpfecificTeacher,
    updateTimeTable,
    deleteTimetable
}