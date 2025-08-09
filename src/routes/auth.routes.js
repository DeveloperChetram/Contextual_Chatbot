const express = require('express');
const {registerGetController, registerPostController} = require('../controllers/auth.controller');

const authRouter = express.Router();


// authRouter.get('/register', registerController)
authRouter.route('/register')
    .get(registerGetController)
    .post(registerPostController)

module.exports = authRouter;