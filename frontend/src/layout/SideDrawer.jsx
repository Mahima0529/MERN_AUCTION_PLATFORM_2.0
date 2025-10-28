// import React, { useState } from 'react'
// import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
// import { MdLeaderboard, MdDashboard } from "react-icons/md";
// import { SiGooglesearchconsole } from "react-icons/si";
// import { BsFillInfoSquareFill } from "react-icons/bs";
// import { FaFacebook, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '@/store/slices/userSlice';
// import {Link} from "react-router-dom";


// const SideDrawer = () => {
// const [show, setShow]= useState(false);

// const { isAuthenticated, user}= useSelector(state=> state.user);
// const dispatch = useDispatch();
// const handleLogout =()=>{
//   dispatch(logout());
// };

//   return (
//    <>
//    <div
//   onClick={() => setShow(!show)}
//   className="fixed right-5 top-5 bg-[#D64828] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden"
// >

//   <GiHamburgerMenu/>

// </div>

// <div className={`w-[100%] lg:w-[900px] bg-[#f6f4f0] h-full fixed top-0 ${show ? "left-0": "left-[-100%]" } transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-[ipx]
//    border-r-stone-500`}>
//   <div className='related'>
//     <Link to={"/"}> 
//     <h4 className='text-6xl font-semibold mb-4'>
//       Prime <span className='text-[#D6482b]'>Bid</span>
//       </h4>
//       </Link>
//       <ul  className='flex flex-col gap-3'>
//         <li>
//         <Link
//   to="/auctions"
//   className="flex items-center gap-2 text-3xl font-semibold text-gray-700
//    hover:text-[#D6482B] transition-all duration-200 hover:translate-x-1"
// >
//   <RiAuctionFill className="text-[#D6482B]" />
//   <span>Auctions</span>
// </Link>

//         </li>

//        <li>
//          <Link
//   to="/leaderboard"
//   className="flex items-center gap-2 text-3xl font-semibold 
//   text-gray-700 hover:text-[#D6482B] transition-all duration-200 hover:translate-x-1"
// >
//   <MdLeaderboard className="text-[#D6482B]" />
//   <span>Leaderboard</span>
// </Link>

//         </li>

//          {
//           isAuthenticated&& user && user.role==="Auctioneer"&&(
//             <>
//              <li>
//           <Link to={"/submit-commission"}
//           className='flex text-xl font-semibold gap-2 items-center 
//           hover:text-[#D6482b]
//           hover:transition-all hover:duration-150'
//           > <FaFileInvoiceDollar/>Submit Commission</Link>
//         </li>

//          <li>
//           <Link to={"/create-auction"}
//           className='flex text-xl font-semibold gap-2 items-center 
//           hover:text-[#D6482b] hover:transition-all hover:duration-150'
//           > <IoIosCreate/>Create Auction</Link>
//         </li>

//            <li>
//           <Link to={"/view-my-auctions"}
//           className='flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b] hover:transition-all hover:duration-150'
//           > <FaEye/>View My Auctions</Link>
//         </li>


//             </>
//           )
//          }

//          {
//           isAuthenticated && user && user.role==="Super Admin"&&(
//               <li>
//          <Link
//   to="/dashboard"
//   className="flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-[#D6482B] transition-all duration-200 hover:translate-x-1"
// >
//   <MdDashboard className="text-[#D6482B]" />
//   <span>Dashboard</span>
// </Link>

//         </li>
//           )

//          }



//       </ul>


//       {
//         !isAuthenticated ?(
//           <>
//           <div className='my-4 flex gap-2'>
//              <Link
//   to="/sign-up"
//   className="bg-[#D64838] text-white font-semibold text-2xl px-6 py-2 rounded-full
//              hover:bg-[#BE342B] hover:scale-105 
//              transition-all duration-200 shadow-md hover:shadow-lg"
// >
//   Sign Up
// </Link>
//  <Link
//   to="/login"
//   className="bg-[#D64838] text-white font-semibold text-2xl px-6 py-2 rounded-full
//              hover:bg-[#BE342B] hover:scale-105 
//              transition-all duration-200 shadow-md hover:shadow-lg"
// >
//   Login
// </Link>

//           </div>
//           </>
//         ):(
//           <>

//           <div className='my-4 flex gap-4 w-fit' onClick={handleLogout}>
//             <button   className="bg-[#D64838] text-white font-semibold text-xl px-6 py-2 rounded-full
//              hover:bg-[#BE342B] hover:scale-105 
//              transition-all duration-200 shadow-md hover:shadow-lg">Logout</button>

//           </div>
//           </>
//         )
//       }

// <hr className='mb-4 border-t-[#d5646b]'/>
// <ul className='flex flex-col gap-3'>
//  <li>
//          <Link
//   to="/how-it-works-info"
//   className="flex items-center gap-2 text-3xl font-semibold text-gray-700 hover:text-[#D6482B] transition-all duration-200 hover:translate-x-1"
// >
//   <SiGooglesearchconsole className="text-[#D6482B]" />
//   <span>How it works</span>
// </Link>

//         </li>

//          <li>
//          <Link
//   to="/about"
//   className="flex items-center gap-2 text-3xl font-semibold text-gray-700 hover:text-[#D6482B] transition-all duration-200 hover:translate-x-1"
// >
//   <BsFillInfoSquareFill className="text-[#D6482B]" />
//   <span>About Us</span>
// </Link>

//         </li>

// </ul>
//   <IoMdCloseCircleOutline onClick={()=>setShow(!show)} 
//   className='absolute top-0 right-4 text-[28px] sm:hidden'/>

//   </div>
           
// <div>

//   <div className='flex gap-2 items-centre mb-2'>
//  <Link
//   to="/"
//   className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 text-3xl rounded-full shadow-md
//              hover:scale-110 active:scale-110 transition-transform duration-200"
// >
//   <FaFacebook />
// </Link>




//      <Link to="/" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 text-3xl rounded-full shadow-md hover:scale-110 transition-transform duration-200">
//     <RiInstagramFill/>
//     </Link>

    


//   </div>
//  <Link
//   to="/contact"
//   className="flex items-center gap-2 text-3xl font-semibold text-gray-700 hover:text-[#7358B5] transition-all duration-200 hover:translate-x-1"
// >
//   <span>Contact Us</span>
// </Link>

// <footer className="bg-gradient-to-r from-[#D6482B] to-[#d6834b] text-white py-4 px-6 rounded-t-xl 
// shadow-inner mt-3 w-fit">
//   <p className="text-2xl opacity-90 text-left">&copy; 2025 PrimeBid, LLC.</p>
//   <p className="text-2xl text-left mt-1">
//     Designed by{" "}
//     <Link
//       to="/"
//       className="font-semibold underline decoration-white/40 hover:decoration-white transition-all duration-200"
//     >
//       CodeWithMahima
//     </Link>
//   </p>
// </footer>
// </div>
// </div>
   
//   </>
//   )
// }

// export default SideDrawer


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
        className="fixed right-5 top-5   bg-[#D64828] text-white text-3xl p-2 rounded-md 
                   hover:bg-[#b8381e] z-50 cursor-pointer shadow-lg lg:hidden">
        <GiHamburgerMenu />
      </div>

      {/* 🟢 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-[#f6f4f0] p-6 flex flex-col justify-between 
          transition-transform duration-300 z-40 w-64 min-h-screen border-r border-gray-600
          w-72 sm:w-80 md:w-96 lg:w-[350px] xl:w-[400px]
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0  /* Always visible on large screens */
        `}>
        {/* Header */}
        <div>
          <Link to="/">
            <h4 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Prime <span className="text-[#D6482b]">Bid</span>
            </h4>
          </Link>

          {/* Links */}
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/auctions"
                className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
              >
                <RiAuctionFill className="text-[#D6482B]" />
                Auctions
              </Link>
            </li>

            <li>
              <Link
                to="/leaderboard"
                className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
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
                    className="flex items-center gap-3 text-2xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-auction"
                    className="flex items-center gap-3 text-2xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-my-auctions"
                    className="flex items-center gap-3 text-2xl font-semibold hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
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
                  className="flex items-center gap-3 text-2xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
                >
                  <MdDashboard className="text-[#D6482B]" />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/sign-up"
                className="bg-[#D64838] text-white font-semibold text-xl sm:text-2xl px-6 py-3 rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-[#D64838] text-white font-semibold text-xl sm:text-2xl px-6 py-3 rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="bg-[#D64838] text-white font-semibold text-xl sm:text-2xl px-6 py-2 rounded-full hover:bg-[#BE342B] hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg inline-flex"
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
                className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
              >
                <SiGooglesearchconsole className="text-[#D6482B]" />
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-gray-700 hover:text-[#D6482B] hover:translate-x-2 transition-transform duration-200"
              >
                <BsFillInfoSquareFill className="text-[#D6482B]" />
                About Us
              </Link>
            </li>
          </ul>

          {/* ❌ Close Button (only visible on small screens) */}
          <IoMdCloseCircleOutline
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-3xl cursor-pointer lg:hidden"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 text-3xl rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 text-3xl rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            >
              <RiInstagramFill />
            </Link>
          </div>

          <Link
            to="/contact"
            className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-gray-700 hover:text-[#7358B5] hover:translate-x-2 transition-transform duration-200"
          >
            Contact Us
          </Link>

          <footer className="bg-gradient-to-r from-[#D6482B] to-[#d6834b] text-white py-6 px-6 rounded-t-xl shadow-inner w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-2xl opacity-90 text-center md:text-left">
                &copy; 2025 PrimeBid, LLC.
              </p>
              <p className="text-2xl text-center md:text-right">
                Designed by{" "}
                <Link
                  to="/"
                  className="font-semibold underline text-black decoration-white/40 hover:decoration-white transition-all duration-200"
                >
                  CodeWithMahima
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
