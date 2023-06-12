const mongoose = require('mongoose')

//bcrypt is to hash(encrypt) the password
const bcrypt = require('bcrypt')

//for validation
const validator = require('validator') 

const Schema = mongoose.Schema

const blogSchema = new Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

//static signup method
    //arror functions wont work cause we are using the "this" keyword
    blogSchema.statics.signup = async function(email,password) {
        //validation
            if(!email || !password){
                throw Error('All fields must be filled')
            }
            //using the validator dependency
                if(!validator.isEmail(email)){
                    throw Error('Email is not valid.must contain an "@" symbol')
                }
                

                if(!validator.isStrongPassword(password)){
                    throw Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character')
                }
        const exists = await  this.findOne({email})
        if(exists){
            throw Error('Email already in use')
        }

        //password hashing
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password,salt)

        const user = await this.create({email:email,password:hash})
        
        return user
    }
//static login method
    blogSchema.statics.login = async function(email,password) {
        if(!email && password){
            throw Error('Email can`t be blank')
        }else if(email && !password){
            throw Error('Password can`t be blank')
        }else if(!email || !password){
            throw Error('All fields must be filled')
        }

        const user = await this.findOne({email})
        if(!user ){
            throw Error('Invalid Login Credentials')
        }

        const match = await bcrypt.compare(password,user.password)
        if(!match ){
            throw Error('Invalid Login Credentials')
        }
        
        return user
    }
module.exports = mongoose.model('User',blogSchema)