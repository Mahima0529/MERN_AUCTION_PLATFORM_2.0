// import mongoose from "mongoose"

// export const  connection = ()=>{
//     mongoose.connect(process.env.MONGO_URI, {
// dbName:"test",
//     }).then(()=>{
//         console.log("connected to databse");
//     }).catch((err)=>{
//         console.log(`Some problem occured while connecting to database :${err}`);
//     })
    
// };

import mongoose from "mongoose";

export const connection = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    dbName: "test",
  })
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(`Some problem occurred while connecting to database: ${err}`);
      throw err;   // important for Render
    });
};
