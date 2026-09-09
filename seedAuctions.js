import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Auction } from "./models/auctionSchema.js";
import { User } from "./models/userSchema.js";

dotenv.config({ path: "./config/config.env" });
dotenv.config(); // fallback

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auction_platform";

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB at:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Ensure Demo Auctioneer exists
    let auctioneer = await User.findOne({ email: "auctioneer@primebid.com" });
    if (!auctioneer) {
      auctioneer = await User.create({
        userName: "Sarah Jenkins",
        email: "auctioneer@primebid.com",
        password: "password123",
        phone: "9876543210",
        address: "742 Evergreen Terrace, Springfield",
        role: "Auctioneer",
        profileImage: {
          public_id: "demo_auctioneer_avatar",
          url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        },
        paymentMethods: {
          bankTransfer: {
            bankAccountNumber: "98765432109876",
            bankAccountName: "Sarah Jenkins",
            bankName: "Chase Bank",
          },
          googlepay: { googlepay_upi_id: "sarah@okhdfcbank" },
          phonepe: { phonepe_upi_id: "sarah@ybl" },
        },
      });
      console.log("👤 Created Demo Auctioneer: auctioneer@primebid.com / password123");
    } else {
      console.log("👤 Found existing Demo Auctioneer:", auctioneer.email);
    }

    // 2. Ensure Demo Bidder exists
    let bidder = await User.findOne({ email: "bidder@primebid.com" });
    if (!bidder) {
      bidder = await User.create({
        userName: "Alex Rivera",
        email: "bidder@primebid.com",
        password: "password123",
        phone: "9876543211",
        address: "123 Broadway St, New York, NY",
        role: "Bidder",
        profileImage: {
          public_id: "demo_bidder_avatar",
          url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
        },
      });
      console.log("👤 Created Demo Bidder: bidder@primebid.com / password123");
    } else {
      console.log("👤 Found existing Demo Bidder:", bidder.email);
    }

    // 3. Define curated live auctions
    const now = Date.now();
    const auctions = [
      {
        title: "Canon AE-1 Program 35mm SLR Camera with 50mm f/1.4 Lens",
        description: "Classic vintage 35mm film SLR in mint condition. Shutter works at all speeds, light meter tested and accurate. Includes 50mm f/1.4 prime lens and original neck strap.",
        category: "Cameras",
        condition: "Used",
        startingBid: 120,
        currentBid: 165,
        startTime: new Date(now - 3600 * 1000 * 6), // started 6 hours ago
        endTime: new Date(now + 3600 * 1000 * 24 * 4), // ends in 4 days
        image: {
          public_id: "canon_ae1_camera",
          url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        },
        createdBy: auctioneer._id,
        bids: [
          {
            userId: bidder._id,
            userName: bidder.userName,
            profileImage: bidder.profileImage.url,
            amount: 165,
          },
        ],
        highestBidder: bidder._id,
      },
      {
        title: "Omega Speedmaster Professional Moonwatch Chronograph",
        description: "Legendary manual-wind Moonwatch with black dial, hesalite crystal, and stainless steel bracelet. Complete with presentation box, extra NATO strap, and guarantee card.",
        category: "Watches",
        condition: "Used",
        startingBid: 2500,
        currentBid: 3200,
        startTime: new Date(now - 3600 * 1000 * 12),
        endTime: new Date(now + 3600 * 1000 * 24 * 5),
        image: {
          public_id: "omega_speedmaster_watch",
          url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
        },
        createdBy: auctioneer._id,
        bids: [
          {
            userId: bidder._id,
            userName: bidder.userName,
            profileImage: bidder.profileImage.url,
            amount: 3200,
          },
        ],
        highestBidder: bidder._id,
      },
      {
        title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
        description: "Brand new sealed in factory packaging with 1-year AppleCare warranty. Unlocked for all worldwide GSM and CDMA carriers. Includes braided USB-C charge cable.",
        category: "Electronics",
        condition: "New",
        startingBid: 700,
        currentBid: 890,
        startTime: new Date(now - 3600 * 1000 * 2),
        endTime: new Date(now + 3600 * 1000 * 24 * 3),
        image: {
          public_id: "iphone_15_pro_max",
          url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        },
        createdBy: auctioneer._id,
        bids: [
          {
            userId: bidder._id,
            userName: bidder.userName,
            profileImage: bidder.profileImage.url,
            amount: 890,
          },
        ],
        highestBidder: bidder._id,
      },
      {
        title: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
        description: "Industry-leading active noise cancellation with 8 microphones and Auto NC Optimizer. Brand new in sealed box, 30-hour battery life, touch controls, black colorway.",
        category: "Electronics",
        condition: "New",
        startingBid: 180,
        currentBid: 240,
        startTime: new Date(now - 3600 * 1000 * 8),
        endTime: new Date(now + 3600 * 1000 * 24 * 2),
        image: {
          public_id: "sony_xm5_headphones",
          url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
        },
        createdBy: auctioneer._id,
        bids: [
          {
            userId: bidder._id,
            userName: bidder.userName,
            profileImage: bidder.profileImage.url,
            amount: 240,
          },
        ],
        highestBidder: bidder._id,
      },
      {
        title: "Seiko Prospex SRP777 'Turtle' Automatic 200m Diver",
        description: "Classic cushion-case automatic diver with 4R36 movement. 200m water resistance, Lumibrite hands and markers, durable silicone dive strap. Box and papers included.",
        category: "Watches",
        condition: "Used",
        startingBid: 150,
        currentBid: 210,
        startTime: new Date(now - 3600 * 1000 * 14),
        endTime: new Date(now + 3600 * 1000 * 24 * 6),
        image: {
          public_id: "seiko_turtle_watch",
          url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
        },
        createdBy: auctioneer._id,
        bids: [
          {
            userId: bidder._id,
            userName: bidder.userName,
            profileImage: bidder.profileImage.url,
            amount: 210,
          },
        ],
        highestBidder: bidder._id,
      },
      {
        title: "Charizard 1st Edition Base Set Holo PSA 8 NM-MT",
        description: "Iconic 1999 Pokémon Base Set shadowless holographic Charizard card. Authenticated and graded PSA 8 Near Mint - Mint. Encased in tamper-evident protective PSA holder.",
        category: "Collectibles",
        condition: "Used",
        startingBid: 1500,
        currentBid: 2350,
        startTime: new Date(now - 3600 * 1000 * 24),
        endTime: new Date(now + 3600 * 1000 * 24 * 7),
        image: {
          public_id: "charizard_psa_card",
          url: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=80",
        },
        createdBy: auctioneer._id,
        bids: [
          {
            userId: bidder._id,
            userName: bidder.userName,
            profileImage: bidder.profileImage.url,
            amount: 2350,
          },
        ],
        highestBidder: bidder._id,
      },
    ];

    // Remove older demo items with same titles to prevent duplicate flooding
    const titles = auctions.map((a) => a.title);
    await Auction.deleteMany({ title: { $in: titles } });

    const inserted = await Auction.insertMany(auctions);
    console.log(`🎉 Successfully created ${inserted.length} live auctions in the database!`);

    console.log("\n📋 Sample Live Auctions Added:");
    inserted.forEach((item, idx) => {
      console.log(` ${idx + 1}. [${item.category}] ${item.title} - Highest Bid: $${item.currentBid}`);
    });

    console.log("\n🔑 Demo Login Credentials for Testing:");
    console.log(" • Auctioneer: auctioneer@primebid.com / password123");
    console.log(" • Bidder    : bidder@primebid.com / password123\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder Error:", err);
    process.exit(1);
  }
};

seedData();
