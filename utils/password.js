const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

 const PasswordEncrypt = async(password)=>{
  const salt =await bcrypt.salt()  
  const hashpassword = await bcrypt.hash(password,salt)
  return hashpassword
}

 const ComparePassword = async(password,userpassword)=>{
   return await bcrypt.compare(password,userpassword)
}



 const GetSignature = async(id,username)=>{
    const token = jwt.sign({userId:id,username:username})
    return token
}
module.exports = {PasswordEncrypt,ComparePassword,GetSignature}