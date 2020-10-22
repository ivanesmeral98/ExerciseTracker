
const express = require('express');
const cors = require('cors');

// allows us to connect to mongodb database
const mongoose = require('mongoose');

// allows us to have environment variables in .env file
require('dotenv').config();

// express server and port
const app = express();
const port = process.env.PORT || 5000;

// middleware ; allows us to parse json because we are sending / receving json
app.use(cors());
app.use(express.json());

// DATABASE URI and connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// requiring and using routes
const exerciseRouter = require('./routes/exercises');

app.use('/exercises', exerciseRouter)


// listens on certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});