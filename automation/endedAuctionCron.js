import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";

export const endedAuctionCron=()=>{
    cron.schedule("*/1 * * * * ",async()=>{
        const now = new Date();
        console.log("Cron for ended auction running...");
    });
};