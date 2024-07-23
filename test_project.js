var tesseract = require("tesseract.js")

// require: This is a function that loads a module. In this case, it loads the tesseract.js module.
// tesseract: A variable that stores the module so you can use its functions.


tesseract.recognize(
    'test_img.png',
    'eng',
    {logger:m=>console.log(m)}
).then(({data:{text}})=>{
    console.log(text)
})

// tesseract.recognize: A function from the tesseract.js module that performs Optical Character Recognition (OCR) on an image.
// 'test_img.png': The path to the image file you want to analyze.
// 'eng': The language of the text in the image. Here, it is set to English ('eng').


// Breakdown of { logger: m => console.log(m) }

// Curly Braces {}:

// The curly braces represent an object literal in JavaScript. An object is a collection of key-value pairs.
// Key logger:

// Inside the object, logger is a key. Keys in JavaScript objects are also known as properties.
// Colon ::

// The colon separates the key (logger) from its value. It assigns the value on the right to the key on the left.
// Arrow Function m => console.log(m):

// This is a shorthand syntax for writing functions in JavaScript, introduced in ES6 (ECMAScript 2015).
// Detailed Breakdown of the Arrow Function
// Parameter m:

// m is the parameter for the arrow function. It represents the input to the function.
// Arrow =>:

// The arrow (=>) separates the parameter list from the function body. It is used to define arrow functions.
// Function Body console.log(m):

// The body of the arrow function contains the statement console.log(m), which logs the value of m to the console.

// .then: This is used to handle the result of the recognize function. It takes a function that will run when the OCR process is complete.

// ({ data: { text } }) => { ... }: This is an arrow 
// function that takes the result of the OCR process. The result is an object, and we're extracting the text property from data.