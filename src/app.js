const express = require('express');
const authRouter = require('./routes/auth.routes');

const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.use('/auth', authRouter)



module.exports = app;