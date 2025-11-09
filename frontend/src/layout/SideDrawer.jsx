import React from "react";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import {
  FaFacebook,
  FaFileInvoiceDollar,
  FaEye,
  FaUserCircle,
} from "react-icons/fa";
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
      {/* Hamburger Icon */}
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed right-5 top-5 bg-[#D64828] text-white text-3xl p-2 rounded-md 
                   hover:bg-[#b8381e] z-50 cursor-pointer shadow-lg lg:hidden
                   transition-opacity duration-300"
      >
        <GiHamburgerMenu />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#f3ebe3]
          flex flex-col justify-between
          transition-transform duration-300 z-40
          border-r border-[#e0d5ca]
          w-[50vw] sm:w-[30vw] md:w-[30vw] lg:w-[20vw] p-4
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* =================== HEADER WITH TITLE + CLOSE BUTTON =================== */}
        <div className="flex items-center justify-between px-2 mb-6">
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>
            <h4 className="text-2xl font-bold">
              Prime <span className="text-[#D6482B]">Bid</span>
            </h4>
          </Link>

          <IoMdCloseCircleOutline
            onClick={() => setIsSidebarOpen(false)}
            className="text-3xl cursor-pointer lg:hidden flex-shrink-0"
          />
        </div>
        {/* ======================================================================== */}

        {/* Scrollable section */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-6">

          {/* Main Links */}
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/auctions"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center px-5 gap-2 text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200"
              >
                <RiAuctionFill className="text-[#D6482B]" /> Auctions
              </Link>
            </li>

            <li>
              <Link
                to="/leaderboard"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center px-5 gap-2 text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200"
              >
                <MdLeaderboard className="text-[#D6482B]" /> Leaderboard
              </Link>
            </li>

            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to="/submit-commission"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center px-5 gap-2 text-xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-auction"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center px-5 gap-2 text-xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-my-auctions"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center px-5 gap-2 text-xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200"
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
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center px-5 gap-2 text-xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200"
                >
                  <MdDashboard className="text-[#D6482B]" /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <div className="mt-4 ml-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/sign-up"
                onClick={() => setIsSidebarOpen(false)}
                className="bg-[#D64838] text-white font-semibold text-[16px] px-3 py-1.5 rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md text-center"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setIsSidebarOpen(false)}
                className="bg-[#D64838] text-white font-semibold text-[16px] px-3 py-1.5 rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md text-center"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="bg-[#D64838] text-white font-semibold text-[16px] px-3 py-1.5 rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md ml-5"
              >
                Logout
              </button>
            </div>
          )}

          <hr className="my-6 border-t-[#d5646b]" />

          {/* Secondary Links */}
          <ul className="flex flex-col gap-4">
            {isAuthenticated && (
              <li>
                <Link
                  to="/me"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex flex-nowrap items-center px-5 gap-2 text-xl font-semibold text-gray-700
                    hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200 whitespace-nowrap"
                >
                  <FaUserCircle className="text-[#D6482B] flex-shrink-0" />
                  <span className="flex-shrink-0">My Profile</span>
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/how-it-works-info"
                onClick={() => setIsSidebarOpen(false)}
                className="flex flex-nowrap items-center px-5 gap-2 text-xl font-semibold text-gray-700 
                  hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200 whitespace-nowrap"
              >
                <SiGooglesearchconsole className="text-[#D6482B] flex-shrink-0" />
                <span className="flex-shrink-0">How it works</span>
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={() => setIsSidebarOpen(false)}
                className="flex flex-nowrap items-center px-5 gap-2 text-xl font-semibold text-gray-700 
                  hover:text-[#D6482B] hover:translate-x-2 transition-all duration-200 whitespace-nowrap"
              >
                <BsFillInfoSquareFill className="text-[#D6482B] flex-shrink-0" />
                <span className="flex-shrink-0">About Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-4 px-5 items-center justify-center sm:justify-start">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 text-xl rounded-full shadow-md hover:scale-110 transition-transform duration-200"
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
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-5 gap-2 text-xl font-semibold text-gray-700 hover:text-[#7358B5] hover:translate-x-2 transition-transform duration-200"
          >
            Contact Us
          </Link>

          <footer className="bg-gradient-to-r from-[#D6482B] to-[#d6834b] text-white py-2 px-2 rounded-t-xl shadow-inner w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <p className="text-[15px] opacity-90">&copy; 2025 Prime Bid, LLC.</p>
              <p className="text-[15px]">
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

      {/* Hide scrollbar utility */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </>
  );
};

export default SideDrawer;
