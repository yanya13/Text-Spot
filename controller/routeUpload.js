const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');
const axios = require('axios');
const recognizeText = require('../core/text_extractor');


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

        // calling the text extraction endpoint
        const textExtractionResponse = await axios.post('http://localhost:8000/api/extract-text', {
            imageUrl: imageUrl
        });      

        

        // send response with image URL and extracted text
        res.status(200).json({
            success: true,
            message: "Uploaded and Text Extracted!",
            data: {
                imageUrl: imageUrl,
                extractedText: textExtractionResponse.data.data.extractedText
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
