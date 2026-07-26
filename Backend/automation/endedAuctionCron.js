

// automation/endedAuctionCron.js
import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

// Prevent multiple registrations in dev/nodemon
if (!global.__endedAuctionCronStarted) global.__endedAuctionCronStarted = false;

export const endedAuctionCron = () => {
  if (global.__endedAuctionCronStarted) {
    console.log("⏭️ endedAuctionCron already started, skipping duplicate scheduler.");
    return;
  }
  global.__endedAuctionCronStarted = true;
  console.log("🚀 endedAuctionCron scheduler starting…");

  cron.schedule(
    "*/1 * * * *",
    async () => {
      const now = new Date();
      console.log("⏰ Cron tick — checking ended auctions...", now.toISOString());

      try {
        // Fetch candidates; we will still gate with an atomic update below
        const endedAuctions = await Auction.find({
          endTime: { $lt: now },
          commissionCalculated: false,
        }).select("_id title currentBid createdBy endTime");

        console.log(`Found ended auctions: ${endedAuctions.length}`);

        for (const a of endedAuctions) {
          try {
            // ATOMIC GATE: flip flags only if still unprocessed
            const auction = await Auction.findOneAndUpdate(
              { _id: a._id, commissionCalculated: false },
              {
                $set: {
                  commissionCalculated: true,
                  processedAt: new Date(),
                },
              },
              { new: true }
            );

            // If null, some other runner grabbed it first → skip
            if (!auction) {
              continue;
            }

            // Commission (do not rely on auction.save() to mark processed; we already set it)
            const commissionAmount = await calculateCommission(auction._id);

            // Find highest bid
            const highestBidder = await Bid.findOne({
              auctionItem: auction._id,
              amount: auction.currentBid,
            }).lean();

            const auctioneer = await User.findById(auction.createdBy);

            if (auctioneer && typeof auctioneer.unpiadComission !== "number") {
              auctioneer.unpiadComission =
                parseFloat(auctioneer.unpiadComission) || 0;
              await auctioneer.save();
            }

            if (highestBidder) {
              const bidder = await User.findById(highestBidder.bidder.id);

              // Normalize bidder fields if needed
              if (bidder && typeof bidder.moneySpent !== "number") {
                bidder.moneySpent = parseFloat(bidder.moneySpent) || 0;
                await bidder.save();
              }

              // Save winner on auction (safe; we already marked processed)
              await Auction.findByIdAndUpdate(auction._id, {
                $set: { highestBidder: highestBidder.bidder.id },
              });

              // Update bidder stats
              if (bidder) {
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
              if (auctioneer) {
                await User.findByIdAndUpdate(
                  auctioneer._id,
                  {
                    $inc: {
                      unpiadComission: commissionAmount,
                    },
                  },
                  { new: true }
                );
              }

              // Idempotent email: only send if not sent yet
              const sent = await Auction.findOneAndUpdate(
                { _id: auction._id, emailSent: { $ne: true } },
                { $set: { emailSent: true, emailSentAt: new Date() } },
                { new: true }
              );

              if (sent && bidder && auctioneer) {
                const subject = `Congratulations! You won the auction for ${auction.title}`;
                const message = `Dear ${bidder.userName}, 

Congratulations! You have won the auction for ${auction.title}.

Before proceeding for payment contact your auctioneer via your auctioneer email: ${auctioneer.email}

Please complete your payment using one of the following methods:

1) Bank Transfer
- Account Name: ${auctioneer.paymentMethods?.bankTransfer?.bankAccountName || "-"}
- Account Number: ${auctioneer.paymentMethods?.bankTransfer?.bankAccountNumber || "-"}
- Bank: ${auctioneer.paymentMethods?.bankTransfer?.bankName || "-"}

2) GooglePay: ${auctioneer.paymentMethods?.googlepay?.googlepay_upi_id || "-"}

3) PhonePe: ${auctioneer.paymentMethods?.phonepe?.phonepe_upi_id || "-"}

4) Cash on Delivery (COD)
- Pay 20% upfront via any method above.
- Remaining 80% on delivery.

If you want to see the condition of your auction item then email: ${auctioneer.email}

Best regards,
MAHIMA Auction Team`;

                console.log(`📧 Sending email to highest bidder: ${bidder.email}`);
                await sendEmail({ email: bidder.email, subject, message });
                console.log("✅ Email sent.");
              }
            }
          } catch (e) {
            console.error(`Error processing auction ${a._id}:`, e?.message || e);
          }
        }
      } catch (err) {
        console.error("Error fetching ended auctions:", err?.message || err);
      }
    },
    // optional: ensure consistent timezone
    { timezone: "Asia/Kolkata" }
  );
};
