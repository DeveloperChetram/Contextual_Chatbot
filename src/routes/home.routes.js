const express = require('express')
const {getHomeController}= require('../controllers/home.controller')

const homeRouter = express.Router();

homeRouter.route('/')
.get(getHomeController)
module.exports = homeRouter;
