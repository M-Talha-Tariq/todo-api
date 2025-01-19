// pQGzX5GPpV8uOaH9
// G4keG0fh9RoFlZvV
import mongoose from "mongoose"

const mongodbUri = process.env.MONGO_URI;

const connectDB = async ()=>{
    try{
        await mongoose.connect(mongodbUri , {
            dbName : "my-todo-db"
        });
        console.log(`mongo db connected`);
        
        mongoose.connection.on(
            "error",
            console.error.bind(console , "Connection error :")
        )
        process.on("SIGNIT" , ()=>{
            mongoose.connection.close();
            console.log("Mongoose connection closed due to application termination");
            process.exit(0)   
        });
    }
    catch(error){
        console.error("MONGODB connection Failed " , error);
        process.exit(1)
        
    }
}
try{
    await connectDB();
}catch(error){
    console.error(error)
}