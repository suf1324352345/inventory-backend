import express from "express"
import { Login, Register } from "../contorllers/authController.js"
// router instance
const router = express.Router()
//API
// REGISTER //  http://localhost:8000/api/v1/auth/register
 router.post("/register",Register)
// LOGIN
router.post("/login",Login)

export default router