const path = require("path")
const express = require("express")
const multer = require("multer")
const recognizeText = require("./test_extractor")

const app = express()
const PORT = 8000;


// STORAGE OBJECT TO HANDLE UPLOADS
const storage = multer.diskStorage({

    // where to store the file {request object, file object from user, 
    // run callback after operation }
    destination: function (req, file, cb){
        return cb(null, "./uploads")
    },
    filename: function(req, file, cb) {
        const uniqueName = Date.now()
        return cb(null, `${uniqueName}--${file.originalname}`)
        // creating our own filename 
    }
})



const upload = multer({ storage })
// uploading files from frontend to the folder uploads



app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}));
// parse data from html form


app.get("/", (req, res) => {
    return res.render("homepage")
})


// defining route to upload a single file
app.post("/upload", upload.single('textImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const filePath = req.file.path

    console.log("The file-path: ", filePath);

    
    return res.redirect("/")
    // returning back to homepage
})


app.listen(PORT, () => console.log(`Server started at PORT: 8000`))