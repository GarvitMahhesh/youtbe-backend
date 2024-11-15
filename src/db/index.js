import mongoose from "mongoose";
import { DB_NAME } from "../constansts.js";

const  conNECTDB = async () =>{
    try {
       const connectioninstance =  await mongoose.connect(`${process.env.MONGODB_URI}://${DB_NAME}`)
       console.log(`MongoDB connected successfully: ${connectioninstance.connection.host}`)
    } catch (error) {
        console.log( "error" ,error)
        process.exit(1)
    }
}


export default conNECTDB;