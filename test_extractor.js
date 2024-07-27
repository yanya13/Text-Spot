// var tesseract = require("tesseract.js")
// tesseract.recognize(
//     'test_img.png',
//     'eng',
//     {logger:m=>console.log(m)}
// ).then(({data:{text}})=>{
//     console.log(text)
// })


const Tesseract = require("tesseract.js")

function recognizeText(file){
    Tesseract.recognize(file.buffer, {logger:m=>console.log(m)})
        .then(({data:{text}}) =>{
            return text;
        })
        .catch(err => {
            throw new Error("Error extracting text from image: " +err.message)
        })
}

module.exports = recognizeText;