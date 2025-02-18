const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
  // Allowed MIME types
  const allowedMimes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
      "application/vnd.ms-excel" // XLS
  ];

  const extname = [".xlsx", ".xls"].includes(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimes.includes(file.mimetype);

  // console.log("Mimetype:", file.mimetype, "| Extname:", path.extname(file.originalname));
  // console.log("Validation:", mimetype, extname);

  if (mimetype && extname) {
      cb(null, true);
  } else {
      cb(new Error('Error: Please upload an Excel file!'));
  }
};

const uploadExcelFile = multer({
  storage, fileFilter
})
module.exports = uploadExcelFile

