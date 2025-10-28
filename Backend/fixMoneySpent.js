import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { User } from "./models/userSchema.js"; // adjust path if needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config/config.env") });

const fixMoneySpent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB");

    const users = await User.find({});
    let count = 0;

    for (const user of users) {
      if (typeof user.moneySpent === "string") {
        user.moneySpent = parseFloat(user.moneySpent) || 0;
        await user.save();
        count++;
      }
    }

    console.log(`✅ Fixed ${count} users' moneySpent fields`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixMoneySpent();
