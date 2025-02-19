const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    try {
        // Allowed MIME types
        const allowedMimes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
            "application/vnd.ms-excel" // XLS
        ];

        const extname = [".xlsx", ".xls"].includes(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedMimes.includes(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Error: Please upload an Excel file!'));
        }
    } catch (error) {
        console.error(error);
        cb(new Error('An error occurred while processing the file.'));
    }
};

const uploadExcelFile = multer({
    storage, fileFilter
})

module.exports = uploadExcelFile