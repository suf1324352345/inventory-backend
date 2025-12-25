import express from "express"
import { addSupplier, deleteSupplier, getAllSupplier, updateSupplier } 
from "../contorllers/supplierController.js"

// router instance
const router = express.Router()
//API ||  http://localhost:8000/api/v1/supplier/add
router.post("/add",addSupplier)
// http://localhost:8000/api/v1/supplier/all
router.get("/all",getAllSupplier)
router.delete("/delete/:_id",deleteSupplier)
//http://localhost:8000/api/v1/supplier/update/
router.put("/update/:_id",updateSupplier)



export default router