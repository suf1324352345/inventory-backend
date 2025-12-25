import express from "express"
import { addProductController, deleteProductController,
     getAllProducts, 
     updateProductController} from "../contorllers/productController.js"
// INSTANCE OF ROUTER
const router =  express.Router()
//API
// POST || http://localhost:8000/api/v1/product/add
router.post("/add",addProductController)
router.get("/all",getAllProducts)
router.delete("/delete/:_id",deleteProductController)
router.put("/update/:_id",updateProductController)

export default router;