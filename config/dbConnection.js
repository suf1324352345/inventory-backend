import mongoose from "mongoose";
import "dotenv/config"
import chalk from "chalk";

const connectDb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL)
      if(conn)
      {
          console.log(chalk.yellow(`Connected to Db server!!`))
      }

    } catch (error) {
      console.log(error)  
    }
}
export default connectDb
