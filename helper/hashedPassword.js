import bcrypt from "bcryptjs"
// HASHED PASSWORD
export const hashedPassword = async(password)=>{
     const saltRound = 11;
     return await bcrypt.hash(password,saltRound)
}

// COMPARE PASSWORD
export const comparePassword = async(password,hashPass)=>{
          return await bcrypt.compare(password,hashPass)
}