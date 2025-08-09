const jwt  = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')

const registerGetController = async (req, res) => {
    res.render('register');
}

const registerPostController = async (req, res)=>{
    
const {username, email, password}= req.body;

const isUserExist = await userModel.findOne({
    $or:[
        {username},{email}
    ]
})

if(isUserExist){
    return res.status(409).json({
        message:"user already exist"
    })
}

const user = await userModel.create({
    username, email, password: await bcrypt.hash(password, 10)
})
const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
res.cookie('token', token)
res.status(201).json({
    message:"user created succesfully",
     user
})

}

module.exports = {registerGetController, registerPostController};