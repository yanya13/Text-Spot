const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

router.post('/upload', upload.single('textImage'), function(req, res){
    
    // if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    // }

    // const filePath = req.file.path;

    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error uploading to Cloudinary"
            });
        }

        const image_url = result.secure_url;

        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: image_url
        });
    });
});

module.exports = router;
