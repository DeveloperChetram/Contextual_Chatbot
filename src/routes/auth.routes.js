const express = require('express');
const {getRegisterController, postRegisterController, getLoginController, postLoginController, getLogoutController} = require('../controllers/auth.controller');

const authRouter = express.Router();


// authRouter.get('/register', registerController)
authRouter.route('/register')
    .get(getRegisterController)
    .post(postRegisterController)
authRouter.route('/login')
.get(getLoginController)
.post(postLoginController)

authRouter.route('/logout')
.get(getLogoutController)


module.exports = authRouter;


