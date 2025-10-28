import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import { v2 as cloudinary }from "cloudinary"
import { generateToken } from "../utils/jwtToken.js";

export const register=catchAsyncErrors(async(req,res,next)=>{
 if(!req.files|| Object.keys(req.files).length===0){
    return next(new ErrorHandler("Profile Image Required",400))

    }
 

const {profileImage} = req.files;
const allowedFormats = ["image/png",  "image/jpeg","image/jpg", "image/webp"];
if(!allowedFormats.includes(profileImage.mimetype)){
    return next(new ErrorHandler("File format is not supported", 400));
}
const {userName,
     email, 
     password, 
     phone ,
     address,
      role, 
      bankAccountNumber, 
      bankAccountName, 
      bankName,
      googlepay_upi_id,
      phonepe_upi_id,
    
    }= req.body;

    if(!userName || !email|| !password|| !phone|| ! address|| !role){
        return next (new ErrorHandler("Please fill full form", 400));
    }
    if(role== "Auctioneer"){
        if(!bankAccountName||!bankAccountNumber || !bankName){
            return next (new ErrorHandler("Please provide your complete bank details", 400));
        }
//         if (!googlepay_upi_id) {
//   return next(new ErrorHandler("Please provide your valid Google Pay UPI ID", 400));
// }

// if (!phonepe_upi_id) {
//   return next(new ErrorHandler("Please provide your valid PhonePe UPI ID", 400));
// }

const upiRegex = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/;
if (googlepay_upi_id && !upiRegex.test(googlepay_upi_id)) {
  return next(new ErrorHandler("Invalid Google Pay UPI ID format", 400));
}
if (phonepe_upi_id && !upiRegex.test(phonepe_upi_id)) {
  return next(new ErrorHandler("Invalid PhonePe UPI ID format", 400));
}


    }

    const isRegistered = await User.findOne({email});

if(isRegistered){
    return next (new ErrorHandler(" User is already Registered", 400));

}

const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath,{
    folder:"MERN_AUCTION_PLATFORM_USERS",
}
);
if(!cloudinaryResponse|| cloudinaryResponse.error){
    console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "Unknown cloudinary error"
    );
    return next(
        new ErrorHandler("Failed to upload profile image to cloudinary ", 500)
    );
}
const user = await User.create({
    userName,
     email, 
     password, 
     phone ,
     address,
      role,
      profileImage:{
        public_id: cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
      },
     paymentMethods:{
        bankTransfer:{
            bankAccountNumber,
            bankAccountName,
            bankName,
        },
        googlepay:{
googlepay_upi_id,
        },
        phonepe:{
            phonepe_upi_id,
        },

    },
 });

 generateToken(user,"User registered successfully", 201,res)
 
});



export const login= catchAsyncErrors(async(req,res,next)=>{
const {email, password}= req.body;
if(!email|| !password){
    return next(new ErrorHandler("Please fill full form"));
}
const user = await User.findOne({email}).select("+password");
if(!user){
    return next(new ErrorHandler("Invalid credentials",400));
}
const isPasswordMatch = await user.comparePassword(password);
if(!isPasswordMatch){
    return next(new ErrorHandler("Invalid credentials", 400));
}
generateToken(user, "Login successfully", 200, res);

});



export const getProfile= catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
    
});



export const logout= catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("token", "", {
          expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success:true,
        message: "Logout Successfully",
    });
     
});
export const fetchLeaderboard= catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find({moneySpent:{$gt:0}});
    const leaderboard= users.sort((a,b)=> b.moneySpent-a.moneySpent);
    res.status(200).json({
        success:true,
        leaderboard,
    });
});
