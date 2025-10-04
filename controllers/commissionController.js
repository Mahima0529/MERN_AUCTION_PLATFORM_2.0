import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import { User } from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const proofOfCommission = catchAsyncErrors(async(req , res , next)=>{
//     console.log("BODY:", req.body);
// console.log("FILES:", req.files);
//////////
    if(!req.files|| Object.keys(req.files).length===0){
        return next (new ErrorHandler("Payment Proof Screenshot Required", 400));
    }
    const {proof}= req.files;
    const { amount, comment }= req.body;
//    const amount = req.body?.amount;
//     const comment = req.body?.comment; ///////my changes
    const user= await User.findById(req.user._id);

if(!amount || !comment){ 
    return next (new ErrorHandler("Amount and Comment are required fields",400));
}

if(user.unpiadComission===0){
    return res.status(200).json({
        success:true,
        message: "You dont have to pay any commission",
    });
}
if(user.unpiadComission <amount){ 
    return next (new ErrorHandler(`The amount exceeds your unpaid commission balance.Please enter an amount up to ${user.unpiadComission}`,403)); 
}
const allowedFormats = ["image/png",  "image/jpeg","image/jpg", "image/webp"];

if(!allowedFormats.includes(proof.mimetype)){
    return next(new ErrorHandler("Screenshot format not supported ", 400));
}



const cloudinaryResponse = await cloudinary.uploader.upload(
    proof.tempFilePath,
    {
    folder:"MERN_AUCTION_PAYMENT_PROOFS",
}
);
if(!cloudinaryResponse|| cloudinaryResponse.error){
    console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "Unknown cloudinary error"
    );
    return next(
        new ErrorHandler("Failed to upload payment prroof", 500)
    );
}
const commissionProof = await PaymentProof.create({
    userId: req.user._id,
    proof:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
    },
    amount,
    comment,
});
res.status(201).json({
    success:true,
    message:"Your proof has been submitted successfully. We will review it and respond to you within 24 hours",
    commissionProof,
});
});


