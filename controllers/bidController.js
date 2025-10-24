// import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
// import ErrorHandler from "../middlewares/error.js";
// import { Auction } from "../models/auctionSchema.js";
// import { Bid } from "../models/bidSchema.js";
// import { User } from "../models/userSchema.js";
// export const placeBid = catchAsyncErrors(async(req, res, next)=>{
//     const {id} = req.params;
//     const auctionItem = await Auction.findById(id);
//     if(!auctionItem){
//         return next (new ErrorHandler("Auction Item not found ", 404));
//     }
//     const {amount}= req.body;
//     if(!amount){
//         return next (new ErrorHandler(" Please place your bid", 404));
//     }
//     if(amount<= auctionItem.currentBid){
//         return next (new ErrorHandler("Bid amount must be greater than the current bid", 404));
//     }

//      if(amount< auctionItem.startingBid){
//         return next (new ErrorHandler("Bid amount must be greater than the starting bid", 404));
//     }
//     try{
//         const existingBid = await Bid.findOne({
//             "bidder.id": req.user._id,
//             auctionItem:auctionItem._id,
//         });
//         const existingBidInAuction = auctionItem.bids.find((bid)=> bid.userId.toString()== req.user._id.toString());
//         if( existingBid&& existingBidInAuction){
//             existingBidInAuction.amount = amount;
//             existingBid.amount= amount;
//            // await existingBidInAuction.save();
//             await auctionItem.save();//my change
//             await existingBid.save();
//             auctionItem.currentBid= amount;
//         }else{
//             const bidderDetail = await User.findById(req.user._id);
//             const bid = await Bid.create({
//                 amount,
//                 bidder:{
//                     id: bidderDetail._id,
//                     userName: bidderDetail.userName,
//                     profileImage: bidderDetail.profileImage?.url,

//                 },
//                 auctionItem: auctionItem._id,
//             });
//             auctionItem.bids.push({
//                 userId: req.user._id,
//                 userName: bidderDetail.userName,
//                     profileImage: bidderDetail.profileImage?.url,
//                     amount,
//             });
//              auctionItem.currentBid= amount;
//         }
//         await auctionItem.save();
//         res.status(201).json({
//             success:true,
//             message:"Bid placed",
//             currentBid: auctionItem.currentBid,
//         });
//     }
//     catch (error){
//         return next (new ErrorHandler(error.message|| "Failed to place bid", 500)
//         );
//     }
// });



import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const auctionItem = await Auction.findById(id);
    
    if (!auctionItem) {
        return next(new ErrorHandler("Auction Item not found", 404));
    }

    const { amount } = req.body;

    if (!amount) {
        return next(new ErrorHandler("Please place your bid", 404));
    }

    if (amount <= auctionItem.currentBid) {
        return next(new ErrorHandler("Bid amount must be greater than the current bid", 400));
    }

    if (amount < auctionItem.startingBid) {
        return next(new ErrorHandler("Bid amount must be greater than the starting bid", 400));
    }

    try {
        // Check if user has already placed a bid on this auction
        const existingBid = await Bid.findOne({
            "bidder.id": req.user._id,
            auctionItem: auctionItem._id,
        });

        const existingBidInAuction = auctionItem.bids.find(
            (bid) => bid.userId.toString() === req.user._id.toString()
        );

        if (existingBid && existingBidInAuction) {
            // Update existing bid
            existingBidInAuction.amount = amount;
            existingBid.amount = amount;

            //await existingBidInAuction.save();
             await auctionItem.save();//my change
            await existingBid.save();
        } else {
            // Create a new bid
            const bidderDetail = await User.findById(req.user._id);

            const bid = await Bid.create({
                amount,
                bidder: {
                    id: bidderDetail._id,
                    userName: bidderDetail.userName,
                    profileImage: bidderDetail.profileImage?.url,
                },
                auctionItem: auctionItem._id,
            });

            auctionItem.bids.push({
                userId: req.user._id,
                userName: bidderDetail.userName,
                profileImage: bidderDetail.profileImage?.url,
                amount,
            });
        }

        // Always update currentBid
        auctionItem.currentBid = amount;

        // 🚫 Important: Do NOT touch commissionCalculated here
        // auctionItem.commissionCalculated stays as it is (false until auction ends)

        console.log("Before saving auction:", auctionItem.commissionCalculated);
        await auctionItem.save();
        console.log("After saving auction:", auctionItem.commissionCalculated);

        res.status(201).json({
            success: true,
            message: "Bid placed successfully",
            currentBid: auctionItem.currentBid,
        });
    } catch (error) {
        return next(
            new ErrorHandler(error.message || "Failed to place bid", 500)
        );
    }
});
