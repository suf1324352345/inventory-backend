import { comparePassword, hashedPassword } from "../helper/hashedPassword.js"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

// Register
export const Register = async (req, res) => {
    try {
        const { name, email, password, address } = req.body
        if (!name || !email || !password || !address) {
            return res.status(404).json({ message: "All fields are mandatory!" })
        }
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: await hashedPassword(req.body.password),
            address: req.body.address,
            role: req.body.role
        })

        await user.save()
        res.status(201).json({
            success: true,
            message: "Registeration success!",
            user
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while registering a user ...",
            error
        })
    }
}


// Login
export const Login = async (req, res) => {
    try {
         const user =  await userModel.findOne({email:req.body.email})
         if(!req.body.email)
         {
            return res.status(404).json({message:"Please provide email id!"})
         }
         else if(!user)
         {
            return res.status(401).json({message:"Not a registered user!"})
         }
         else{
             const match =  await comparePassword(req.body.password,user.password)
             if(!match)
             {
                return res.status(401).json({message:"Invalid credentials!"})
             }
             else{
                  const token =  jwt.sign({_id:user._id,role:user.role},process.env.JWT_PRIVATE_KEY,{expiresIn:"2h"})
                  
                  res.status(201).json({
                    success:true,
                    message:"Login success!",
                    token,
                    user:{
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        address:user.address,
                        role:user.role
                    }
                  })
             }
         }



    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while login ...",
            error
        })
    }
}