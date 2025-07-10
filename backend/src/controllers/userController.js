const userModel = require("../models/userModel") ;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
// login user

const loginUser = async(req,res) => {
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email});
        if(!user){
          return res.status(401).json("User Doesn't exist")
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
          return res.status(401).json("Invalid credentials")
        }

        const token = createToken(user._id)
        res.status(201).json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


// register user

const registerUser = async(req,res) => {
    const {username,password,email} =req.body;
    try {
        const exist = await userModel.findOne({email})
        console.log(exist)
        if(exist){
            return res.status(400).json('email already exists')
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json('Please enter a valid email')
        }

        if (password.length < 8) {
            return res.status(400).json('Password must be at least 8 characters long')
        }


        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new userModel({
            username:username,
            email:email,
            password:hashedPassword,
        })
        const user = await newUser.save()
        res.status(201).json(`User created Successfully`)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = {loginUser,registerUser}