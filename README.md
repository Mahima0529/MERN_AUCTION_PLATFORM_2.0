🏷️ Prime Bid Auction Platform
A dynamic, role-based auction platform built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to create, manage, and participate in Prime Bid auctions with distinct roles: Auctioneer, Bidder, and Super Admin.

📌 Project Overview
The Prime Bid Auction Platform provides a seamless experience for managing online auctions with added control and transparency. The system revolves around three core user roles:

👨‍⚖️ Auctioneer – Creates and manages auctions.
🤝 Bidder – Participates in auctions by placing bids.
🛡️ Super Admin – Has full oversight of all auctions, user actions, and commission verification.
Once a bidder wins an auction, a commission is marked as unpaid on the auctioneer's side, and they are required to send it to the Super Admin. The Super Admin oversees all auction activities and user interactions.

🚀 Features
👤 For Auctioneers:
Create and manage auctions
Monitor bidding activity
Receive commission alerts after winning bids
View auction results and statuses
🎯 For Bidders:
Browse live auctions
Place bids on ongoing auctions
View past auction outcomes
Track bid history
🔐 For Super Admin:
View and control all auctions
Manage users (Auctioneers and Bidders)
Receive unpaid commissions from auctioneers
Approve, reject, or archive auctions
🧰 Tech Stack
🔧 Frontend:
React.js
Redux – For state management
HTML, CSS, JavaScript
⚙️ Backend:
Node.js
Express.js
🗃️ Database:
MongoDB
🌐 Live Demo
Link:- https://mern-auction-platform-new.netlify.app/
🛠️ Installation & Setup
✅ Prerequisites:
Node.js and npm
MongoDB (local or Atlas cloud)
Git
📦 Steps to Run:
# Clone the repository
git clone https://github.com/your-username/prime-bid-auction-platform.git

# Navigate into the project
cd prime-bid-auction-platform

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
