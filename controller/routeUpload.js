const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');
const axios = require('axios');
const { deleteImageCheck } = require('../utils/counterUtils');

router.post('/upload', upload.single('textImage'), async function(req, res) {
    try {
        await deleteImageCheck();

        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;

        const textExtractionResponse = await axios.post('http://localhost:8000/api/extract-text', {
            imageUrl: imageUrl
        });

        const extractedText = textExtractionResponse.data.data.extractedText;

        // render the homepage again with results
        // res.render('homepage', {
        //     imageUrl: imageUrl,
        //     extractedText: extractedText
        // });

        res.status(200).json({
            success: true,
            message: "Text Extracted!",
            data: {
                extractedText: extractedText
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error processing the image",
            error: err.message
        });
    }
});

module.exports = router;




        