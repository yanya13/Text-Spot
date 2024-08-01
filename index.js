const path = require("path")
const express = require("express")
const uploadRoute = require('./controller/routeUpload')
const upload = require("./middleware/multer");

const app = express()
const PORT = 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false})); // parse data from html form
app.use(express.json());

app.get("/", (req, res) => {
    return res.render("homepage")
})


app.use('/api', uploadRoute);


app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))