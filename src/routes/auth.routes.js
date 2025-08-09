const express = require('express');
const {registerController} = require('../controllers/auth.controller');

const authRouter = express.Router();


authRouter.get('/register', registerController)

module.exports = authRouter;