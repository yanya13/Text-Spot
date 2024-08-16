const express = require('express');
const router = express.Router();
const axios = require('axios');
const recognizeText = require('../core/text_extractor')

router.post('/extract-text', async function(req, res){

    // extracting image url from request body
    const { imageUrl } = req.body;

    try {
        
        // fetch image data from cloudinary as a buffer
        const response = await axios.get(imageUrl, {responseType: 'arraybuffer'});
        const imageBuffer = Buffer.from(response.data, 'binary');

        // extract text from the image buffer using recognizeText function
        const extractedText = await recognizeText(imageBuffer);

        // send response with the extracted text
        res.status(200).json({
            success: true,
            message: "Text extracted successfully!",
            data: {
                extractedText: extractedText
            }
        });

    } catch(err){

        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error extracting text from image",
            error: err.message
        });

    }
});

module.exports = router;