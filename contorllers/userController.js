import { hashedPassword } from "../helper/hashedPassword.js"
import userModel from "../models/userModel.js"


// add user
export const addUserController = async (req, res) => {
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
            message: "User added successfully!",
            user
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while adding a user ...",
            error
        })
    }
}
// get users
export const getUsersController = async (req, res) => {
    try {

        const users = await userModel.find().select("-password")

        res.status(201).json({
            success: true,
            users
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while getting users ...",
            error
        })
    }
}

// get single user
export const getSingleUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req?.params?._id }).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while getting a user ...",
            error
        })
    }
}

export const editUserController = async (req, res) => {
    try {
        // console.log(req.params._id,req.body)
        const user = await userModel.findByIdAndUpdate({ _id: req.params._id }, {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: await hashedPassword(req.body.password)
        },
        {new:true}
    )
       
        res.status(201).json({
            success: true,
            message: "User updated successfully!",
            user
        })


    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while updating a user ...",
            error
        })
    }
}


// delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete({ _id: req.params._id })
        res.status(200).json({
            status: true,
            message: `${user.name} deleted!`
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error while deleting a user...",
            error

        })
    }
}

