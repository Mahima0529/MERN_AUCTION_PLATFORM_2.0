# 🏷️ Prime Bid Auction Platform

A dynamic, role-based online auction system built using the **MERN stack** (MongoDB, Express, React, Node.js).  
This platform supports multiple user roles — **Auctioneer**, **Bidder**, and **Super Admin** — each with clear, purpose-driven functionality.

---

## 📌 Project Overview

The **Prime Bid Auction Platform** enables seamless auction creation, bidding, and supervision with strong transparency and control.

### 👤 User Roles

- **👨‍⚖️ Auctioneer** – Creates and manages auctions.
- **🤝 Bidder** – Participates in auctions by placing bids.
- **🛡️ Super Admin** – Full oversight of auctions, user actions, and commission verification.

After a bidder wins an auction, a commission is marked as **unpaid** for the Auctioneer, who must send it to the Super Admin.  
The Super Admin manages verification and monitors entire system activity.

---

## 🚀 Features

### ✅ For Auctioneers
- Create and manage auctions  
- Monitor bidding activity  
- Receive commission alerts  
- View auction outcomes and real-time statuses  

### 🎯 For Bidders
- Browse all live auctions  
- Place bids in real time  
- View past auction results  
- Track personal bidding history  

### 🔐 For Super Admin
- Monitor and control all auctions  
- Manage users (Auctioneers & Bidders)  
- Receive unpaid commissions  
- Approve, reject, or archive auctions  

---

## 🧰 Tech Stack

### 🔧 Frontend
- React.js  
- Redux (State Management)  
- HTML, CSS, JavaScript  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🗃️ Database
- MongoDB  

---

## 🌐 Live Demo
🔗 **https://mern-auction-platform-new.netlify.app/**

---

## 🛠️ Installation & Setup

### ✅ Prerequisites
- Node.js & npm  
- MongoDB (Local or Atlas)  
- Git  

### 📦 Steps to Run the Project

```bash
# Clone the repository
git clone https://github.com/your-username/prime-bid-auction-platform.git

# Navigate into the project directory
cd prime-bid-auction-platform

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

