const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next) =>{

    //verify authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:'authorization token required'})
    }

    //the split() function makes the const authorization an array.with bearer as it's first value and the second being the token.
    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdiNmQ1NzhiNmI1YThlNDU3MTE5YzkiLCJpYXQiOjE2ODYyNDE3MTcsImV4cCI6MTY4NjUwMDkxN30.9BHqyyzFUmoaMdLXymLmJowyGJkJ9Ln1_qcR9jVdthw"


    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token,process.env.SECRET)
        
        //ask chatgpt to explain!!
        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(err){
        console.log(err)
        res.status(400).json({error:'Request not authorized'})
    }
}

module.exports = requireAuth