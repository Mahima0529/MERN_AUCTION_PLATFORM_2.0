import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userSchema.js";

dotenv.config({ path: "./config/config.env" });
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auction_platform";

const fixPasswords = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");

    const emails = ["auctioneer@primebid.com", "bidder@primebid.com"];
    for (const email of emails) {
      let user = await User.findOne({ email });
      if (user) {
        // Assign plain text - the pre("save") hook will hash it once!
        user.password = "password123";
        await user.save();
        
        // Verify comparison works
        const testUser = await User.findOne({ email }).select("+password");
        const matches = await testUser.comparePassword("password123");
        console.log(`Password reset for ${email}: match test = ${matches ? "✅ SUCCESS" : "❌ FAILED"}`);
      } else {
        console.log(`User ${email} not found`);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error("Error fixing passwords:", err);
    process.exit(1);
  }
};

fixPasswords();
