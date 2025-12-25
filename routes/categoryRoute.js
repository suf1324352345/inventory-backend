import express from "express"
import { addCategory, deleteCategory, getAllCategories, updateCategory } 
from "../contorllers/categoryController.js"

// router instance
const router = express.Router()
//API
// http://localhost:8000/api/v1/category/add
router.post("/add", addCategory)
router.get("/all", getAllCategories)
router.delete("/:_id", deleteCategory)
router.put("/update/:_id", updateCategory)


export default router