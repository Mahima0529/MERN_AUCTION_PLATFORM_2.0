import mongoose from "mongoose"

export const  connection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
dbName:"MERN_AUCTION_PLATFORM",
    }).then(()=>{
        console.log("connected to databse");
    }).catch((err)=>{
        console.log(`Some problem occured while connecting to database :${err}`);
    })
    
};
