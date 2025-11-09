


import { register } from '@/store/slices/userSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userName, setUserName]= useState("");
  const [email, setEmail]=useState("");
  const [phone, setPhone]=useState("");
  const [address, setAddress]=useState("");
  const [role, setRole]= useState("");
  const [password,setPassword]=useState("");
  const [bankAccountName, setBankAccountName]=useState("");
  const [bankAccountNumber,setBankAccountNumber]=useState("");
  const [bankName, setBankName]=useState("");
  const [phonepeId, setPhonepeId]=useState("");
  const [googlepayId, setGooglepayId]= useState("");
  const [profileImage, setProfileImage]= useState("");
  const [profileImagePreview, setProfileImagePreview]=useState("");

  const {loading, isAuthenticated}= useSelector(state=> state.user)
  const navigateTo= useNavigate();
  const dispatch= useDispatch();
console.log("✅ handleRegister triggered");

  const handleRegister=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);    
    formData.append("profileImage", profileImage);
    if (role==="Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("phonepe_upi_id", phonepeId);
      formData.append("googlepay_upi_id", googlepayId);
    }
    
    dispatch(register(formData));
  };

  useEffect(()=>{
    if(isAuthenticated){
      navigateTo("/");
    }
  },[dispatch ,loading, isAuthenticated]);

  const imageHandler=(e)=>{
    const file= e.target.files[0];
    const reader= new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      {/* The section now fills the full screen except sidebar */}
   <section
  className="
    min-h-screen 
    flex flex-col justify-center items-center
    bg-gradient-to-br from-[#FFD8A8] via-[#FFDAB9] to-[#F8D4DD]
    px-6 py-10 space-y-6
    w-[100vw] ml-0
    md:w-[100vw] 
    lg:w-[80vw] lg:ml-[20vw]
    overflow-y-auto
    transition-all duration-300
  "
>



        <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-[900px] p-10 flex 
        flex-col items-center gap-8 border border-[#f3b8c7]/30">

          <h1 className="text-xl md:text-6xl xl:text-4xl 2xl:text-4xl mb-2 min-[480px]:text-4xl font-bold text-[#D64838] drop-shadow-sm tracking-wide">
            Register
          </h1>

          <p className=" text-gray-600 text-center max-w-2xl leading-relaxed">
            Join <span className="text-[#D64838] font-semibold">PrimeBid</span> today and start your auction journey.<br />
            Create your account to explore, bid, and sell easily!
          </p>

          {/* ---------------- Form ---------------- */}
          <form
            className="flex flex-col  w-full bg-white/70 backdrop-blur-md shadow-lg rounded-2xl border border-[#f0d5cf] p-10"
            onSubmit={handleRegister}
          >
            {/* Title */}
            <h2 className="text-xl md:text-2xl font-semibold text-[#D64838] tracking-wide mb-4 text-center">
              Personal Details
            </h2>

            {/* --- Personal Info --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[16px]] text-gray-700 ">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-[16px] text-gray-700 ">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-[16px] text-gray-700 ">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-[16px] text-gray-700 ">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full text-text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-[16px] text-gray-700 ">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                >
                  <option value="">Select Role</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>
              <div>
                <label className="text-[16px] text-gray-700 ">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* --- Profile Image --- */}
            <div className="flex flex-col md:flex-row items-center gap-7 py-3">
              {/* <label className="text-[16px] text-gray-700  w-full md:w-1/3">
                Profile Image
              </label> */}
              <div className="flex items-center gap-3">
                <img
                  src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"}
                  alt="Profile"
                  className="w-14 h-14 rounded-full  border-2 border-[#D64838] object-cover shadow-sm"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                  className="text-sm text-gray-700"
                />
              </div>
            </div>

            {/* --- Payment Section --- */}
            <div className="mt-8">
              <label className="font-bold text-xl md:2xl text-[#D64834] flex flex-col mb-2">
                Payment Method Details
                <span className="text-sm text-gray-500 font-normal">
                  (Only for Auctioneers)
                </span>
              </label>

              {/* Bank Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  disabled={role === "Bidder"}
                  className="text-[16px] sm:text-[16px] py-4 px-4 bg-transparent border-b-2 border-gray-300 focus:border-[#D3748B] focus:outline-none transition-all duration-200"
                >
                  <option value="">Select Bank</option>
                  <option value="Union Bank">Union Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="Canara Bank">Canara Bank</option>
                  <option value="UCO Bank">UCO Bank</option>
                </select>

                <input
                  type="text"
                  value={bankAccountNumber}
                  placeholder="Account Number"
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  disabled={role === "Bidder"}
                  className="text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D3748B] focus:outline-none transition-all duration-200"
                />

                <input
                  type="text"
                  value={bankAccountName}
                  placeholder="Account Holder Name"
                  onChange={(e) => setBankAccountName(e.target.value)}
                  disabled={role === "Bidder"}
                  className="text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D3748B] focus:outline-none transition-all duration-200"
                />
              </div>

              {/* UPI Details */}
              <div className="mt-5">
              <label className="text-[16px] text-gray-700 ">UPI IDs</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <input
                  type="text"
                  value={phonepeId}
                  placeholder="PhonePe UPI ID"
                  onChange={(e) => setPhonepeId(e.target.value)}
                  disabled={role === "Bidder"}
                  className="text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                />
                <input
                  type="text"
                  value={googlepayId}
                  placeholder="Google Pay UPI ID"
                  onChange={(e) => setGooglepayId(e.target.value)}
                  disabled={role === "Bidder"}
                  className="text-[16px] sm:text-[16px] py-3 px-3 bg-transparent border-b-2 border-gray-300 focus:border-[#D64838] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>
            </div>

            {/* --- Submit Button --- */}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 bg-gradient-to-r from-[#D64838] to-[#E65A50] text-white font-semibold 
             text-xl sm:text-xl py-2 px-4 sm:py-2   rounded-xl shadow-lg 
             hover:scale-105 hover:shadow-xl transition-all duration-300 
             w-[30vw]  xl:w-[20vw] md:w-2/3 lg:w-1/2 mx-auto my-4"
>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;


