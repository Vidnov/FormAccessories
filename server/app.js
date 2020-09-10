const express = require("express");
const app = express();
const multer  = require("multer");  
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const config = require("./config");
const Users = require("./model/Users");
const path =require('path')
//require Routes

const indexRouter= require('./routes/Index')
const sendRouter= require('./routes/Send')
const markRouter= require('./routes/Mark')
const mailRouter= require('./routes/Mail')
const usersRouter= require('./routes/Users')
const requestRouter= require('./routes/Request')
const retailRouter= require('./routes/Retail')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
// Routers
app.use('/',indexRouter)
app.use('/send',sendRouter)
app.use('/getmark',markRouter)
app.use('/mail',mailRouter)
app.use('/users/',usersRouter)
app.use('/request/',requestRouter)
app.use('/retail/',retailRouter)


app.use(multer({dest:"uploads"}).single("filedata"));





app.listen(3000);
