import { User } from "../models/userSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import { Commission } from "../models/commissionSchema.js";
import cron from "node-cron";
import { sendEmail } from "../utils/sendEmail.js";

if (!global.__verifyCommissionCronStarted) global.__verifyCommissionCronStarted = false;

export const verifyCommissionCron = () => {
  if (global.__verifyCommissionCronStarted) {
    console.log("⏭️ verifyCommissionCron already started, skipping duplicate scheduler.");
    return;
  }
  global.__verifyCommissionCronStarted = true;    
    cron.schedule("*/1 * * * *", async()=>{
        console.log("Running verify Commission Cron...");
        const approvedProofs = await PaymentProof.find({status:"Approved"});
        for(const proof of approvedProofs){
            try{
                const user = await User.findById(proof.userId);
                let updatedUserData={};
                if(user){
                    if(user.unpiadComission>= proof.amount){
                        updatedUserData= await User.findByIdAndUpdate(user._id,{
                            $inc:{
                                unpiadComission: -proof.amount
                            }
                        },
                    {new:true});
                    await PaymentProof.findByIdAndUpdate(proof._id,{
                        status:"Settled",
                    });
                    }else{
                         updatedUserData= await User.findByIdAndUpdate(user._id,
                            {
                          unpiadComission:0,
                        },
                    {new:true});
                    await PaymentProof.findByIdAndUpdate(proof._id,{
                        status:"Settled",
                    });
                    }
                    await Commission.create({
                        amount:proof.amount,
                        user:user._id,
                    });
                    const settlementDate = new Date(Date.now())
                    .toString()
                    .substring(0,15);

                    const subject = `Your Payment Has Been Successfully Verified And Settled`;
          const message = `Dear ${user.userName},\n\nWe are pleased to inform you that your recent payment has been successfully verified and settled.
           Thank you for promptly providing the necessary proof of payment. 
           Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.
           \n\nPayment Details:\nAmount Settled: ${proof.amount}\nUnpaid Amount: ${updatedUserData.unpiadComission}\nDate of Settlement: ${settlementDate}
           \n\nBest regards,\nMahima Auction Team`;
         sendEmail({email: user.email, subject, message});
        //await sendEmail({email:bidder.email, subject , message});///my changes

                }
                console.log(`User ${proof.userId} paid commission of ${proof.amount}`)
            }catch(error){
                console.error(
                    `Error processing commission proof for user ${proof.userId}: ${error.message}`
                );
            }
        }
    });
};



//             }
//         }
//     });
// };
