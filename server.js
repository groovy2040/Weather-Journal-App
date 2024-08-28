// Require Express to run server and routes
const express = require('express')
const cors = require('cors')
const port = 3000

// Setup empty JS object to act as endpoint for all routes
let projectData = {};


// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json())

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


app.get('/all', (req, res) => {
    res.json(projectData)
})

app.post('/projectdata', (req, res) => {
    const payload = req.body;
    //since we need dynamic nonrepeatable key, lets combine time and user input chunk
    // we should respect object with only this properties and should ignore others
    console.log(payload)
    const temp = payload.temp
    const date = payload.date
    const content = payload.content
    if (temp && date && content) {
        //const key = date + content.subString(0, 5)//now we can guarantee that key will be unique
        //projectData[key] = {
        projectData = {
            temp, date, content
        }
        //res.status(201).json({[key]:projectData[key]})
        res.status(201).json(projectData)
    } else {
        res.status(422).json({ message: "respect object structure {temp: number, date: Date, content: string}" })
    }

})


// Setup Server

app.listen(port, () => console.log(`server is working on a port ${port}`))