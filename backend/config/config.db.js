import mongoose from "mongoose";

const connectBD = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/ChatApp`);
        console.log("✅ Database connected successfully")
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

export default connectBD;