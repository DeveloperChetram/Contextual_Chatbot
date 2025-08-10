const jwt  = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')

const getRegisterController = async (req, res) => {
    res.render('register');
}

const postRegisterController = async (req, res)=>{
    
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

const getLoginController= async(req, res)=>{
    res.render('login')
}
const postLoginController = async (req, res)=>{
     const {email_username , password} = req.body
console.log(req.body)
     const user = await userModel.findOne({
      $or:[

            {username:email_username},
            {email:email_username}
        ]
    //    username: email_username
     }) 
console.log(user)
     if(!user){
        return res.redirect('/auth/login?error=user not found');
     }

     const isPasswordValid = await bcrypt.compare(password, user.password)

     if(!isPasswordValid){
        return res.status(401).json({
            message:"wrong password"
        })
     }

     const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
     res.cookie('token', token)
     res.status(200).json({
        message:'user logged in successfully'
     })

}
module.exports = {getRegisterController, postRegisterController, getLoginController, postLoginController};