const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/UserRoute');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', router);

// Start server and connect to MongoDB

app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });