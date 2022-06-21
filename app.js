const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const expressValidator = require('express-validator');

const userRoutes = require('./routes/user');

const app = express()

//connection to mongodb
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> console.log('DB connected suceessfully!'));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes
app.use("/api", userRoutes);

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`app is running on the port ${port}`);
})