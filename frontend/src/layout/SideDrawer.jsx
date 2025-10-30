


import React from "react";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* 🟢 Hamburger Button (Visible only on small screens) */}
     <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed right-5 top-5 bg-[#D64828] text-white text-3xl p-2 rounded-md 
                   hover:bg-[#b8381e] z-50 cursor-pointer shadow-lg lg:hidden
                   transition-opacity duration-300"
      > <GiHamburgerMenu />
      </div>

      {/* 🟢 Sidebar */}
     <div
        className={`
          fixed top-0 left-0 h-full min-h-screen
          bg-[#f3ebe3] 
          p-6 flex flex-col justify-between
          transition-transform duration-300 z-40
          border-r border-[#e0d5ca]
          w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[20vw] 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Header */}
        <div>
          <Link to="/">
            <h4 className="text-2xl px-5 sm:text-2xl md:text-2xl font-bold mb-6">
              Prime <span className="text-[#D6482b]">Bid</span>
            </h4>
          </Link>

          {/* Links */}
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/auctions"
                className="flex items-center px-5 gap-2 text-xl sm:text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
              >
                <RiAuctionFill className="text-[#D6482B]" />
                Auctions
              </Link>
            </li>

            <li>
              <Link
                to="/leaderboard"
                className="flex items-center px-5 gap-2 text-xl sm:text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
              >
                <MdLeaderboard className="text-[#D6482B]" />
                Leaderboard
              </Link>
            </li>

            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to="/submit-commission"
                    className="flex items-center px-5 gap-2 text-xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-auction"
                    className="flex items-center px-5 gap-2 text-xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-my-auctions"
                    className="flex items-center px-5 gap-2 text-xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && user?.role === "Super Admin" && (
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center px-5 gap-2 text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
                >
                  <MdDashboard className="text-[#D6482B]" />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <div className="mt-4 ml-4 flex  flex-col sm:flex-row gap-4">
              <Link
                to="/sign-up"
                className="bg-[#D64838]  text-white font-semibold text-[16px] pl-2 pt-0.5 sm:text-[16px] h-[30px] w-[75px] rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-[#D64838] px-5 text-white font-semibold text-[16px] pl-3.5 pt-0.5 sm:text-[16px] h-[30px] w-[75px] rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="bg-[#D64838] px-5 text-white font-semibold text-xl sm:text-2xl px-6 py-2 rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg inline-flex"
              >
                Logout
              </button>
            </div>
          )}

          <hr className="my-6 border-t-[#d5646b]" />

          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/how-it-works-info"
                className="flex items-center px-5 gap-2 text-xl sm:text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
              >
                <SiGooglesearchconsole className="text-[#D6482B]" />
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center px-5 gap-2 text-xl sm:text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
              >
                <BsFillInfoSquareFill className="text-[#D6482B]" />
                About Us
              </Link>
            </li>
          </ul>

          {/* ❌ Close Button (only visible on small screens) */}
          <IoMdCloseCircleOutline
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-3xl cursor-pointer xl:hidden"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex gap-4 px-5 items-center">
            <Link
              to="/"
              className="bg-gradient-to-r  from-blue-600 to-blue-800 text-white p-3 text-xl rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 text-xl rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            >
              <RiInstagramFill />
            </Link>
          </div>

          <Link
            to="/contact"
            className="flex items-center px-5 gap-2 text-xl sm:text-xl font-semibold text-gray-700 hover:text-[#7358B5] hover:translate-x-2 transition-transform duration-200"
          >
            Contact Us
          </Link>

          <footer className="bg-gradient-to-r from-[#D6482B] to-[#d6834b] text-white py-2 px-2 rounded-t-xl shadow-inner w-full">
            <div className=" w-full flex    justify-between items-center ">
              <p className="text-[16px] w-[50%] opacity-90 text-center md:text-left">
                &copy; 2025 Prime <br/>Bid, LLC.
              </p>
              <p className="text-[16px] w-[50%] text-center md:text-right">
                Designed by{" "}
                <Link
                  to="/"
                  className="font-semibold underline text-black decoration-white/40 hover:decoration-white transition-all duration-200"
                >
                  Mahima
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
