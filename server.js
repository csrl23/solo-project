// import dependencies 
const dotenv = require('dotenv'); // import dotenv library to access environment variables 
dotenv.config(); //invoke dotenv.config() to read .env file and load into process.env
const express = require('express'); // import express
const path = require('path'); // import path
const mongoose = require('mongoose'); // import mongoose 


const app = express(); // instantiate an express app
const PORT = 8080; // declare a port to listen to 


// import controller 
const controller = require('./src/server/controller'); 


// import router 
// const notebookRrouter = express.Router(); 
// app.use('/verbs', notebookRouter); 


// connect to MongoDB 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB'); 
    })
    .catch((err) => console.error('MongoDB connection error:', err)); 


// middleware to parse incoming requests with JSON payloads 
app.use(express.json()); 


//! need to include middleware to parse urlencoded payloads? 


app.get('/verbs', controller.sendVerbs, (req, res) => 
    res.status(200).json({verbs: res.locals.sendVerbs})
); 


app.post('/verbs', controller.addVerb, (req, res) => 
    res.status(201).json(res.locals.newVerb)
); 

app.delete('/verbs/:verb', controller.deleteVerb, (req, res) => 
    res.sendStatus(204)
); 

app.get('/vocabs', controller.sendVocabs, (req, res) => 
    res.status(200).json({vocabs: res.locals.sendVocabs})
); 

app.post('/vocabs', controller.addVocab, (req, res) => 
    res.status(201).json(res.locals.newVocab)
); 

//unknown route handler 
app.use((req, res) => res.sendStatus(404)); 


// global error handler middleware 
app.use((err, req, res, next) => {
    // define a default error object 
    const defaultErr = {
        log: 'Express error handler caught an unkown error', 
        status: 500, 
        message: { err: 'An internal server error occured' }, 
    }; 

    /* merge incoming error obj with default error obj (ensures all properties 
    are defined in case they are missing on the error obj) */
    const errorDetails = {
        log: err.log || defaultErr.log, 
        status: err.status || defaultErr.status, 
        message: err.message || defaultErr.message, 
    }; 

    // log error details for debugging on the server 
    console.error(errorDetails.log); 
    console.error(`Request Method: ${req.method}`); 
    console.error(`Request URL: ${req.originalUrl}`); 

    // send error status code and message to the client 
    res.status(errorDetails.status).json(errorDetails.message); 
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 