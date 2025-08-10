const express = require('express');
const {getRegisterController, postRegisterController, getLoginController, postLoginController} = require('../controllers/auth.controller');

const authRouter = express.Router();


// authRouter.get('/register', registerController)
authRouter.route('/register')
    .get(getRegisterController)
    .post(postRegisterController)
authRouter.route('/login')
.get(getLoginController)
.post(postLoginController)
module.exports = authRouter;