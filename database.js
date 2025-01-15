// pQGzX5GPpV8uOaH9
// G4keG0fh9RoFlZvV
import mongoose from "mongoose"

const mongodbUri = "mongodb+srv://talha-admin:pQGzX5GPpV8uOaH9@cluster0.0o81x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

console.log("Talha");


const connectDB = async ()=>{
    try{
        await mongoose.connect(mongodbUri);
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