const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
   return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
//login user
const loginUser = async(req,res) =>{
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)

        //create Token
            const token = createToken(user._id)

        res.status(200).json({email,token})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//signup user
const signUpUser = async (req,res) =>{
    const {email,password} = req.body

    try{
        const user = await User.signup(email,password)

        //create Token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports = { loginUser,signUpUser}