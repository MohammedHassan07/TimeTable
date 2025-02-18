const ExcelJS = require("exceljs");
const path = require("path");

const facultyWorkLoad = async (req, res) => {
    try {
        const filePath = path.join(__dirname, "/Master TT Sem-II 2024-25 (1).xlsx");
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        // Debugging: Check available sheet names
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
        const filePath = path.join(__dirname, "/Master TT Sem-II 2024-25 (1).xlsx");
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        // Debugging: Check available sheet names
        console.log("Available Sheets:", workbook.worksheets.map(sheet => sheet.name));

        const sheet = workbook.getWorksheet("Course Stream Report");

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

module.exports = { facultyWorkLoad, courses };
