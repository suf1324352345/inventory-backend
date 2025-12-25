import express from "express"
import { addUserController, deleteUser, editUserController, getSingleUserController, getUsersController } 
from "../contorllers/userController.js"

// router instance
const router = express.Router()
//API
// add //  http://localhost:8000/api/v1/user/add
 router.post("/add",addUserController)
 router.get("/all",getUsersController)
 //  http://localhost:8000/api/v1/user/single
 router.get("/profile/:_id",getSingleUserController)
 router.delete("/delete/:_id",deleteUser)
 router.put("/edit/:_id",editUserController)


export default router