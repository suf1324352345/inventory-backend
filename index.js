import express from "express"
import "dotenv/config"
import chalk from "chalk"
import cors from "cors"
import connectDb from "./config/dbConnection.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import supplierRoutes from "./routes/supplierRoute.js"
import productRoutes from "./routes/productRoute.js"
import usersRoutes from "./routes/userRoute.js"
import ordersRoute from "./routes/orderRoute.js"

// instance of an express
const app = express()
const port = process.env.PORT
// DB server
connectDb()

// middlewares
app.use(cors())
app.use(express.json())

//route middlewares
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/supplier",supplierRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/user",usersRoutes)
app.use("/api/v1/order",ordersRoute)

app.listen(port,()=>{
    console.log(chalk.magenta(`Server running PORT:http://localhost:${port}`))
})

