import mongoose from "mongoose"

export const  connection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
dbName:"test",
    }).then(()=>{
        console.log("connected to databse");
    }).catch((err)=>{
        console.log(`Some problem occured while connecting to database :${err}`);
    })
    
}