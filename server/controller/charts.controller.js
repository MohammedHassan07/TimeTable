const ExcelJS = require("exceljs");
const path = require("path");
const fs = require('fs');

// Upload Excel file
const uploadFile = async (req, res) => {
    try {
        if (req.file) {
            res.status(200).json({ messsage: "File uploaded successfully" })
        } else {
            res.status(400).json({ messsage: "No file upload" })
        }
    } catch (error) {
        console.error("Error while uploading the file", error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

// Faculty workload chart
const facultyWorkLoad = async (req, res) => {
    try {

        const dirContent = fs.readdirSync('./uploads');

        // console.log('dir', dirContent);

        const recentFile = dirContent
            .map(file => ({
                name: file,
                time: fs.statSync(path.join('./uploads', file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        const filePath = './uploads/' + recentFile.name

        // console.log('Most recent file:', filePath);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        // console.log("Available Sheets:", workbook.worksheets.map(sheet => sheet.name));

        const sheet = workbook.getWorksheet("STAFF LIST");

        if (!sheet) {
            return res.status(400).json({ error: "Sheet 'Faculty Workload' not found" });
        }

        let facultyCounts = {};
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                row.eachCell((cell) => {
                    if (cell.value && typeof cell.value === 'string') {
                        facultyCounts[cell.value] = (facultyCounts[cell.value] || 0) + 1;
                    }
                });
            }
        });

        // console.log(facultyCounts)
        res.status(200).json(facultyCounts);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).json({ error: 'Failed to read faculty workload data' });
    }
}

const courses = async (req, res) => {
    try {

        const dirContent = fs.readdirSync('./uploads');

        // console.log('dir', dirContent);

        const recentFile = dirContent
            .map(file => ({
                name: file,
                time: fs.statSync(path.join('./uploads', file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        const filePath = './uploads/' + recentFile.name

        // console.log('Most recent file:', filePath);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        // Debugging: Check available sheet names
        // console.log("Available Sheets:", workbook.worksheets.map(sheet => sheet.name));

        const sheet = workbook.getWorksheet("STREAMS");

        if (!sheet) {
            return res.status(400).json({ error: "Sheet 'Course Stream Report' not found" });
        }

        let courseCounts = {};
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                let stream = row.getCell(5).value;
                if (stream) {
                    courseCounts[stream] = (courseCounts[stream] || 0) + 1;
                }
            }
        });

        res.json(courseCounts);
    } catch (error) {
        console.error("Error processing courses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const timetable = async (req, res) => {
    try {



    } catch (error) {

        console.error("Error processing courses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const departmentSubjects = async (req, res) => {
    try {
        const dirPath = './uploads';
        const dirContent = fs.readdirSync(dirPath);

        if (dirContent.length === 0) {
            return res.status(404).json({ error: "No files found in the uploads directory." });
        }

        const recentFile = dirContent
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(dirPath, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        const filePath = path.join(dirPath, recentFile.name);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.worksheets[0]; // Assuming data is in the first sheet

        const timetableData = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Skip header row
            timetableData.push({
                Department: row.getCell(1).value,
                Subject: row.getCell(2).value
            });
        });

        const departmentSubjects = {};

        timetableData.forEach((entry) => {
            const department = entry['Department'];
            const subject = entry['Subject'];
            if (!department || !subject) return;

            if (!departmentSubjects[department]) {
                departmentSubjects[department] = new Set();
            }
            departmentSubjects[department].add(subject);
        });

        const formattedData = Object.entries(departmentSubjects).map(([dept, subjects]) => ({
            department: dept,
            subjects: subjects.size,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("Error processing the Excel file:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// API: Daily Lecture Distribution
// app.get('/api/daily-lectures', (req, res) => {
//     const timetableData = loadExcelData();
//     const dailyLectures = {};

//     timetableData.forEach((entry) => {
//         const day = entry['Day'];
//         if (!day) return;

//         if (!dailyLectures[day]) {
//             dailyLectures[day] = 0;
//         }
//         dailyLectures[day]++;
//     });

//     res.json(dailyLectures);
// });

// // API: Time Slot Utilization
// app.get('/api/time-slot-utilization', (req, res) => {
//     const timetableData = loadExcelData();
//     const timeSlots = {};

//     timetableData.forEach((entry) => {
//         const timeSlot = entry['Time Slot'];
//         if (!timeSlot) return;

//         if (!timeSlots[timeSlot]) {
//             timeSlots[timeSlot] = 0;
//         }
//         timeSlots[timeSlot]++;
//     });

//     res.json(timeSlots);
// });


// 

const facultyWorkLoadStacked = async (req, res) => {
    try {
        const dirPath = './uploads';
        const dirContent = fs.readdirSync(dirPath);

        if (dirContent.length === 0) {
            return res.status(404).json({ error: "No files found in the uploads directory." });
        }

        const recentFile = dirContent
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(dirPath, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        const filePath = path.join(dirPath, recentFile.name);
        if (!filePath) return res.status(404).json({ error: "No timetable file found." });

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.worksheets[0]; // Assuming data is in the first sheet

        const facultyWorkload = {};

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Skip header
            const department = row.getCell(1).value; // Department
            const faculty = row.getCell(2).value; // Faculty name

            if (!department || !faculty) return;

            if (!facultyWorkload[department]) {
                facultyWorkload[department] = {};
            }
            facultyWorkload[department][faculty] = (facultyWorkload[department][faculty] || 0) + 1;
        });

        res.json(facultyWorkload);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const facultyWorkLoadStackedPie = async (req, res) => {
    try {
        const dirPath = './uploads';
        const dirContent = fs.readdirSync(dirPath);

        if (dirContent.length === 0) {
            return res.status(404).json({ error: "No files found in the uploads directory." });
        }

        const recentFile = dirContent
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(dirPath, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        const filePath = path.join(dirPath, recentFile.name);
        if (!filePath) return res.status(404).json({ error: "No timetable file found." });

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.worksheets[0];

        const facultyDistribution = {};

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            const faculty = row.getCell(2).value;

            if (!faculty) return;
            facultyDistribution[faculty] = (facultyDistribution[faculty] || 0) + 1;
        });

        res.json(facultyDistribution);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    facultyWorkLoad,
    courses,
    uploadFile,
    departmentSubjects,
    facultyWorkLoadStacked,
    facultyWorkLoadStackedPie
};
