const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const router = require('./routes/UserRoute')
const dotenv = require("dotenv")
dotenv.config()


app = express()
PORT = 5000
app.use(express.json())

app.use(cors());


app.listen(PORT, () => {
    console.log(`server is running ar PORT ${PORT}`)
})

app.use('/api/user', router)
mongoose.connect(process.env.MONGOURL).then(
    console.log("mongo db is connected")
)