require('dotenv').config()
const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser')
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.use('/auth', authRouter)



module.exports = app;