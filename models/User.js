const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'please enter an email'],
        unique:true
    },
    email:{type:String,required:true},
    password:{
        type:String,
        required:[true,'Please enter password']
    },
    country:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    zipCode:{type:Number,required:true},
    winked :[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    favourite:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    profile:{type:String},
    preferences :{type:[]},
    token:''
},{timestamps:true})


module.exports = mongoose.model('User',UserSchema)




