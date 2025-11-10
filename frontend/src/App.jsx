import React, { useEffect ,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideDrawer from "./layout/SideDrawer";
import Home from "./pages/Home";
//import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import SubmitCommission from "./pages/SubmitCommission";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";

import { fetchLeaderboard, fetchUser } from "./store/slices/userSlice";
import { getAllAuctionItems } from "./store/slices/auctionSlice";
import Auctions from "./pages/Auctions";
import AuctionItem from "./pages/AuctionItem";
import CreateAuction from "./pages/CreateAuction";
import ViewMyAuctions from "./pages/ViewMyAuctions";
import ViewAuctionDetails from "./pages/ViewAuctionDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";

const App = () => {
  const dispatch = useDispatch();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Add this

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
      <Router>
      <div className="relative flex min-h-screen bg-[#fffdfa]">

        {/* Sidebar */}
        <SideDrawer
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <main
          className={`flex-1 w-full min-h-screen bg-[#fffdfa] overflow-x-hidden transition-all duration-300
            ${isSidebarOpen ? "blur-sm pointer-events-none" : ""}`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={< SignUp/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/submit-commission" element={<SubmitCommission />} />
            <Route path="/how-it-works-info" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/auction/item/:id" element={<AuctionItem />} />
            <Route path="/create-auction" element={<CreateAuction />} />
            <Route path="/view-my-auctions" element={<ViewMyAuctions />} />
            <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/me" element={<UserProfile />} />
          </Routes>
        </main>
      </div>

      {/* 🟣 Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="custom-toast"
        style={{
          maxWidth: "330px",
          width: "100%",
          top: "1rem",
          right: "1rem",
        }}
        bodyClassName="custom-toast-body"
      />
    </Router>
  );
};

// ✅ Inline CSS for Toast
const style = document.createElement("style");
style.innerHTML = `
  .custom-toast {
    background: #ffffff;
    color: #333;
    border-radius: 10px;
    padding: 10px 14px;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
    font-size: 0.9rem;
    line-height: 1.2rem;
    text-align: left;
    margin-top: 8px;
    word-wrap: break-word;
  }

  @media (max-width: 767px) {
    .Toastify__toast-container--top-right {
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
    }
    .custom-toast {
      max-width: none;
      width: 100%;
    }
  }
  
  @media (min-width: 768px) {
    .Toastify__toast-container--top-right {
      right: 1rem;
      left: auto;
    }
  }
`;
document.head.appendChild(style);

export default App;


