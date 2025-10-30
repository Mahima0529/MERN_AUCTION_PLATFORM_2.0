import React, { useEffect ,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideDrawer from "./layout/SideDrawer";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import SubmitCommission from "./pages/SubmitCommission";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";

import { fetchLeaderboard, fetchUser } from "./store/slices/userSlice";
import { getAllAuctionItems } from "./store/slices/auctionSlice";

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
        {/* 🟤 Sidebar — fixed width 20vw */}
          <SideDrawer
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      

        {/* 🟢 Main Content — occupies 80vw */}
         <main
          className={`flex-1 w-full min-h-screen bg-[#fffdfa] overflow-x-hidden transition-all duration-300
            ${isSidebarOpen ? "blur-sm pointer-events-none" : ""}  // optional for overlay effect
          `}
        >  <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submit-commission" element={<SubmitCommission />} />
            <Route path="/how-it-works-info" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>

      {/* 🟣 Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "text-2xl px-6 py-4 rounded-xl shadow-lg font-medium min-w-[320px] bg-white text-gray-800"
        }
        bodyClassName={() => "font-semibold"}
      />
    </Router>
  );
};

export default App;
