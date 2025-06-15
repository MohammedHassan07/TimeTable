const teacherModel = require('../models/Teacher.model')
const timetableModel = require('../models/Timetable.model')
const userModel = require('../models/user.model')
const {TheorySubjects} = require('../models/subjects.model')
const fs = require('fs')

const generateTimetable = async (req, res) => {
    try {
        const { department, semester, year } = req.body;

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const slotsPerDay = 6;
        const breakTime = { day: 'Friday', slotNumber: 5 };

        let schedule = [];

        // 1. Fetch subjects for given branch and year
        const subjects = await TheorySubjects.find({ department, semester, year }).lean();

        // 2. Fetch all teachers who belong to the branch
        const teacherIds = subjects.map(s => s.teacherId);
        const teachers = await userModel.find({ _id: { $in: teacherIds } }).lean();

        console.log('generate teachers -->', teachers)
        console.log('generate -->', subjects)

        // 3. Map teacherId to teacher details
        const teacherMap = {};
        teachers.forEach(teacher => {
            teacherMap[teacher._id] = teacher;
        });

        // 4. Initialize subject lecture counters
        const subjectSlotCounter = {};
        subjects.forEach(subject => {
            subjectSlotCounter[subject._id.toString()] = {
                remaining: subject.type === 'Practical' ? 2 : 3, // default assumption
                type: subject.type,
                teacherId: subject.teacherId
            };
        });

        // 5. Helper to check if teacher is free
        const isTeacherFree = (teacher, day, slot) => {
            return teacher.freeSlots.some(s => s.day === day && s.slotNumber === slot);
        };

        const assignedSlots = {}; // Track teacher assignments

        for (let day of days) {
            const daySchedule = { day, slots: [] };

            for (let slotNumber = 1; slotNumber <= slotsPerDay; slotNumber++) {
                if (day === breakTime.day && slotNumber === breakTime.slotNumber) {
                    daySchedule.slots.push({ slotNumber, subject: 'Break', teacher: null });
                    continue;
                }

                let scheduled = false;

                for (let subject of subjects) {
                    const subjectId = subject._id.toString();
                    const teacher = teacherMap[subject.teacherId];
                    if (!teacher || subjectSlotCounter[subjectId].remaining <= 0) continue;

                    if (subject.type === 'Practical') {
                        // Practical requires 2 continuous slots
                        if (slotNumber >= slotsPerDay) continue;
                        if (
                            isTeacherFree(teacher, day, slotNumber) &&
                            isTeacherFree(teacher, day, slotNumber + 1) &&
                            !(assignedSlots[teacher._id]?.some(s => s.day === day && (s.slot === slotNumber || s.slot === slotNumber + 1)))
                        ) {
                            // Assign both slots
                            daySchedule.slots.push({ slotNumber, subject: subject.name, teacher: teacher.name });
                            daySchedule.slots.push({ slotNumber: slotNumber + 1, subject: subject.name, teacher: teacher.name });

                            assignedSlots[teacher._id] = assignedSlots[teacher._id] || [];
                            assignedSlots[teacher._id].push({ day, slot: slotNumber });
                            assignedSlots[teacher._id].push({ day, slot: slotNumber + 1 });

                            subjectSlotCounter[subjectId].remaining = 0;
                            slotNumber++; // Skip next slot
                            scheduled = true;
                            break;
                        }
                    } else {
                        // Theory
                        if (
                            isTeacherFree(teacher, day, slotNumber) &&
                            !(assignedSlots[teacher._id]?.some(s => s.day === day && s.slot === slotNumber))
                        ) {
                            daySchedule.slots.push({ slotNumber, subject: subject.name, teacher: teacher.name });

                            assignedSlots[teacher._id] = assignedSlots[teacher._id] || [];
                            assignedSlots[teacher._id].push({ day, slot: slotNumber });

                            subjectSlotCounter[subjectId].remaining--;
                            scheduled = true;
                            break;
                        }
                    }
                }

                if (!scheduled) {
                    daySchedule.slots.push({ slotNumber, subject: 'Free', teacher: null });
                }
            }

            schedule.push(daySchedule);
        }

        const timetable = new timetableModel({ department, year, semester, schedule });
        // await timetable.save();

        // fs.writeFile('./temp.json', JSON.stringify(timetable, null, 2), (err) => {
        //     if (err)
        //         console.log(err)
        // })

        res.status(201).json({ message: 'Timetable generated successfully', timetable });

    } catch (error) {
        console.error('Error generating timetable:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
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