import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: "../.env"
});

const connectDatabase=async ()=>{
    try {
        const connectionToDB = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`\n Connected to database(chill man) !! DB HOST:${connectionToDB.connection.host}`);
    
    } catch (error) {
        console.error("mongo db connection problem in ds.js file (this shit is real!!!!!!!)")
        throw error;
    }
}
export default connectDatabase;