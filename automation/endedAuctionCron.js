// import cron from "node-cron";
// import { Auction } from "../models/auctionSchema.js";
// import { User } from "../models/userSchema.js";
// import { Bid } from "../models/bidSchema.js";
// import { sendEmail } from "../utils/sendemail.js";
// import { calculateCommission } from "../controllers/commissionController.js";
// //import ErrorHandler from "../middlewares/error.js";

// export const endedAuctionCron=()=>{
//     cron.schedule("*/1 * * * *",async()=>{
//         const now = new Date();
//         console.log("Cron for ended auction running...");
//          // const endedAuctions = await Auction.find({
//         //     endTime:{$lt: now},
//         //     commissionCalculated:false,
//         // });
// const endedAuctions = await Auction.find({
//     endTime: { $lt: now },
//     commissionCalculated: false,
// });
// ////my changes
// //console.log("Found ended auctions:", endedAuctions.length); /////my change

//         for (const auction of endedAuctions){
//             try{
//                 const commissionAmount = await calculateCommission(auction._id);
//                 auction.commissionCalculated= true;
//                 const highestBidder= await Bid.findOne({
//                     auctionItem:auction._id,
//                     amount:auction.currentBid,
//                 });
//                 const auctioneer = await User.findById(auction.createdBy);
//                 auctioneer.unpiadComission= commissionAmount;
//                 if(highestBidder){
//                     auction.highestBidder= highestBidder.bidder.id;
//                     await auction.save();
//                     const bidder = await User.findById(highestBidder.bidder.id);
//                     await User.findByIdAndUpdate(bidder._id,{
//                         $inc:{
//                             // moneySpent: highestBidder.amount,
//                              moneySpent: highestBidder.amount, 
//                             auctionsWon:1,
//                         },
                       
//                     },
//                      {new:true}
//                 );
//                 await User.findByIdAndUpdate(
//                     auctioneer._id,
//                     {
//                         $inc:{
//                              unpiadComission:commissionAmount,
                             
//                         },
//                     },
//                     {new :true}
//                 );

//  const subject = `Congratulations! You won the auction for ${auction.title}`;
//           const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the auction for ${auction.title}.
//            \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer.email}
//             \n\nPlease complete your payment using one of the following methods:
//             \n\n1. **Bank Transfer**: \n- Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} 
//             \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}
//              \n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **Googlepay**:
//              \n- You can send payment via GooglePay: ${auctioneer.paymentMethods.googlepay.googlepay_upi_id}\n\n3. **Phonepe**:
//              \n- Send payment to: ${auctioneer.paymentMethods.phonepe.phonepe_upi_id}\n\n4. **Cash on Delivery (COD)**:\
//              n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.
//              \n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}
//              \n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!
//              \n\nBest regards,\nMAHIMA Auction Team`;
//           console.log("Sending email to highest bidder");
         

//          sendEmail({email:bidder.email, subject , message});

//            console.log("Successfully email send to highest bidder");




//                 }else{
//                     await auction.save();
//                 }

//             }catch(error){
//                 // return next (console.error(error|| "Some error in ended auction cron"));
//                  console.error(`Error processing auction ${auction._id}:`, error.message);
//             }
//         }
         
//     });
// };

// ///,My changes 
// // --- START THE CRON IMMEDIATELY WHEN THIS FILE RUNS ---
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const startCron = async () => {
//   try {
//     console.log("Connecting to MongoDB...");
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ Connected to MongoDB");

//     endedAuctionCron(); // start the cron job
//     console.log("🚀 endedAuctionCron started...");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error.message);
//   }
// };

// if (import.meta.url === `file://${process.argv[1]}`) {
//   startCron();
// }









// automation/endedAuctionCron.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cron from "node-cron";

import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendemail.js";
import { calculateCommission } from "../controllers/commissionController.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load custom env file
dotenv.config({ path: path.join(__dirname, "../config/config.env") });

// Debug env
console.log("MONGO_URI:", process.env.MONGO_URI);

// ------------------------
// Cron function
// ------------------------
export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("⏰ Cron tick — checking ended auctions...");
    const now = new Date();

    try {
      const endedAuctions = await Auction.find({
        endTime: { $lt: now },
        commissionCalculated: false,
      });

      console.log(`Found ended auctions: ${endedAuctions.length}`);

      for (const auction of endedAuctions) {
        try {
          const commissionAmount = await calculateCommission(auction._id);
          auction.commissionCalculated = true;

          const highestBidder = await Bid.findOne({
            auctionItem: auction._id,
            amount: auction.currentBid,
          });

          const auctioneer = await User.findById(auction.createdBy);
          if (typeof auctioneer.unpiadComission !== "number") {
    auctioneer.unpiadComission = parseFloat(auctioneer.unpiadComission) || 0;
    await auctioneer.save();
}

          if (highestBidder) {
            auction.highestBidder = highestBidder.bidder.id;
            await auction.save();

            const bidder = await User.findById(highestBidder.bidder.id);
if (typeof bidder.moneySpent !== "number") {
  bidder.moneySpent = parseFloat(bidder.moneySpent) || 0;
  await bidder.save();
}
            // Update bidder stats
            // await User.findByIdAndUpdate(
            //   bidder._id,
            //   {
            //     $inc: {
            //       moneySpent: highestBidder.amount,
            //       auctionsWon: 1,
            //     },
            //   },
            //   { new: true }
            // );

            const alreadyWon = await Auction.exists({
  _id: auction._id,
  highestBidder: bidder._id
});

if (!alreadyWon) {
  await User.findByIdAndUpdate(
    bidder._id,
    {
      $inc: {
        moneySpent: highestBidder.amount,
        auctionsWon: 1,
      },
    },
    { new: true }
  );
}

            // Update auctioneer stats
            await User.findByIdAndUpdate(
              auctioneer._id,
              {
                $inc: {
                  unpiadComission: commissionAmount,
                },
              },
              { new: true }
            );

            // Send email to highest bidder
            const subject = `Congratulations! You won the auction for ${auction.title}`;
            const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the auction for ${auction.title}.
           \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer.email}
            \n\nPlease complete your payment using one of the following methods:
            \n\n1. **Bank Transfer**: \n- Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} 
            \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}
             \n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **Googlepay**:
             \n- You can send payment via GooglePay: ${auctioneer.paymentMethods.googlepay.googlepay_upi_id}\n\n3. **Phonepe**:
             \n- Send payment to: ${auctioneer.paymentMethods.phonepe.phonepe_upi_id}\n\n4. **Cash on Delivery (COD)**:\
             n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.
             \n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}
             \n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!
             \n\nBest regards,\nMAHIMA AUCTION TEAM`;

            console.log(`Sending email to highest bidder: ${bidder.email}`);
            await sendEmail({ email: bidder.email, subject, message });
            console.log("✅ Successfully sent email to highest bidder");
          } else {
            await auction.save();
          }
        } catch (error) {
          console.error(`Error processing auction ${auction._id}:`, error.message);
        }
      }
    } catch (err) {
      console.error("Error fetching ended auctions:", err.message);
    }
  });
};

// ------------------------
// MongoDB connection and start cron
// ------------------------
const startCron = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

  //  endedAuctionCron();
    console.log("🚀 endedAuctionCron started...");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

// Call startCron directly
startCron();
