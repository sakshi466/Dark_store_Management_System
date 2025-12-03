import mongoose from "mongoose";

const connectDB = async () =>
{
    try
    { 
        mongoose.connection.on("connected", ()=>{console.log("connect to db")})
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect Successfully")
    }
    catch(error)
    {
        console.log("Connection Failed", error.message)
        process.exit(1);
    }
}

export default connectDB;