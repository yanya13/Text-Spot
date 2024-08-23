const path = require("path")
const express = require("express")
const uploadRoute = require('./controller/routeUpload')
const extractTextRoute = require('./controller/extractTextRoute')

const app = express()
const PORT = 8000;

// app.set("view engine", "ejs")
// app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false})); // parse data from html form
app.use(express.json());

app.use(express.static(path.join(__dirname, './')))

app.use('/api', uploadRoute);
app.use('/api', extractTextRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '', './public/index.html'))
})



app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))