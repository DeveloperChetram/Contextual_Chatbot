const express = require('express')
const {getHomeController}= require('../controllers/home.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const homeRouter = express.Router();

homeRouter.route('/')
.get(authMiddleware,getHomeController)
module.exports = homeRouter;
