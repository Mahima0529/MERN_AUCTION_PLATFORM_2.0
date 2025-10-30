import{login} from "@/store/slices/userSlice";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const[email,setEmail]=useState("");
const[password, setPassword]=useState("");

const {loading, isAuthenticated}= useSelector((state)=> state.user);

const navigateTo=useNavigate();
const dispatch=useDispatch();

const handleLogin=(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append("email",email);
    formData.append("password",password);
    dispatch( login (formData));
};
useEffect(()=>{
    if(isAuthenticated){
        navigateTo("/");
    }
},[dispatch,isAuthenticated,loading]);




  return (
    <>
 <div className="flex min-h-screen">
  {/* Sidebar — only visible on large screens */}


  {/* Login Section */}
   <section
  className="
    min-h-screen 
    flex flex-col justify-center items-center
    bg-gradient-to-br from-[#FFD8A8] via-[#FFDAB9] to-[#F8D4DD]
    px-6 py-10 space-y-6
    h-[100vh]
    w-[100vw] ml-0
    md:w-[100vw] 
    lg:w-[80vw] lg:ml-[20vw]
    overflow-y-auto
    transition-all duration-300
  "
>

    <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-2 items-center py-4 justify-center rounded-md sm:w-[500px] sm:h-[370px]">
        
      <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-5xl xl:text-4xl 2xl:text-4xl`}
          >
            Login
          </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-[16px]  text-gray-800 ">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-[16px] py-2 bg-transparent border-b border-stone-500 
                       focus:outline-none focus:border-[#D64838] transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[16px] text-gray-800 ">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[16px] py-2 bg-transparent border-b border-stone-500 
                       focus:outline-none focus:border-[#D64838] transition-colors duration-200"
          />
        </div>

        <button
          type="submit"
         className="mt-6 bg-gradient-to-r from-[#D64838] to-[#E65A50] text-white font-semibold 
             text-xl py-2 px-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl 
             transition-all duration-300 my-4 mx-auto"
        >
         {loading? "Logging In...":"Login"}
        </button>
      </form>
    </div>
  </section>
</div>




    </>
    
  )
}

export default Login;