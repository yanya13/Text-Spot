const Tesseract = require('tesseract.js')

async function recognizeText(buffer){

    try{

        const result = await Tesseract.recognize(buffer, 'eng', {
            logger: info => console.log(info)
        });

        return result.data.text;

    } catch(err){
        throw new Error("Error extracting text from image: " + err.message);
    }
}

module.exports = recognizeText;