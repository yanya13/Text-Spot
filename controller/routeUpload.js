const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');
const axios = require('axios');
const recognizeText = require('../test_extractor');


router.post('/upload', upload.single('textImage'), async function(req, res){
    
    // if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    // }

    // const filePath = req.file.path;

    try {
        // upload image to cloudinary
        const result =  await cloudinary.uploader.upload(req.file.path);

        // get image url from the cloudinary response
        const imageUrl = result.secure_url;

        // fetch the image data from cloudinary as a buffer
        const response = await axios.get(imageUrl, {responseType:'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Extract text from the image buffer using recongizeText function
        const extractedText = await recognizeText(imageBuffer);

        // send response with image URL and extracted text
        res.status(200).json({
            success: true,
            message: "Uploaded and Text Extracted!",
            data: {
                imageUrl: imageUrl,
                extractedText: extractedText
            }
        });
         
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error processing the image",
            error: err.message
        });
    }

});

module.exports = router;
