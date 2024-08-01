const multer = require('multer');

const storage = multer.diskStorage({
    
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/'); // Ensure the uploads directory exists
    // },
    
    filename: function (req, file, cb) {
        const uniqueName = Date.now();
        cb(null, `${uniqueName}--${file.originalname}`);
    }
});

const upload = multer({ storage });

module.exports = upload;
