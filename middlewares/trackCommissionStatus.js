import {User} from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js"; //make change

export const trackCommissionStatus = catchAsyncErrors(
    async(req , res , next)=>{
        const user = await User.findById(req.user._id);
        if(user.unpiadComission>0){
            return next (new ErrorHandler("You have unpaid commission. Please pay it before posting a new auction", 403));
        }
        next();
    }
)