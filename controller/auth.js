const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const PasswordEncrypt = require('../utils/password')


const Register = async(req,res,next)=>{
    const {email,password,country,state,city,zipCode,username} = req.body   
    const alreadyExist = await User.findOne({email}) 
    const name = await User.findOne({username})
    if(alreadyExist || name){
        next(new Error('username or email already exists'))
        
    }
    else{
            const hash = await bcrypt.genSalt()
            const hashedpassword = await bcrypt.hash(password,hash)
            newUser = await User.create({email,password:hashedpassword,country,state,city,username,zipCode,preferences:[]})
            res.status(201).json(newUser)  
    }
}
const Login = async(req,res,next)=>{
    const {username,password} = req.body  
    const user = await User.findOne({username}) 
   
    if(user){
       const isTrue = await bcrypt.compare(password,user.password) 
       !isTrue && next(new Error('wrong password!!!!!'))

       const token = await jwt.sign({id:user._id,username:user.username},'nawaoooo',{expiresIn:'2d'})
       
       user.token = token
       await user.save()
      return res.status(200).json(user)   
       
    }   else{
       next(new Error('Wrong Credentials'))
    }
}

const forgetPassword = async (req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email}) 
    console.log(user)
    !email && next(new Error('email does not exist in the database')) 
    const token = await jwt.sign({id:user._id,username:user.username},'asake',{expiresIn:'15m'})

  
    res.status(200).json(`http://localhost:8000/auth/resetpass/${user._id}/${token}`) 
}

const Resetpass = async(req,res,next)=>{  
    const {id,token} = req.params
    const {password} = req.body
    
    const salt = await bcrypt.genSalt()
    const hash =await bcrypt.hash(password,salt)
    try{
        const verify = await jwt.verify(token,'asake')
        if(verify.id===id){
            const user = await User.findByIdAndUpdate(id,{password:hash},{new:true})
            res.status(201).json(user)
        }
    }catch(err){
        if(err.message === 'jwt expired'){
            next(new Error('reset password TimeOut'))
        }
    }
    
}
module.exports ={Login,Register,forgetPassword,Resetpass} 