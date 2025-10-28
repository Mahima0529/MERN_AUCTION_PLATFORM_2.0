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
  <aside className="hidden lg:block w-[500px] bg-[#f6f4f0] fixed left-0 top-0 bottom-0">
   
  </aside>

  {/* Login Section */}
  <section
  className="
    min-h-screen flex flex-col justify-center items-center
    bg-gradient-to-br from-[#FFD8A8] via-[#FFDAB9] to-[#F8D4DD]
    px-6 py-10 space-y-6
    w-full
    lg:ml-[500px] lg:w-[calc(100%-500px)]
    overflow-y-auto
  "
>


    <div
      className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl w-full 
                 max-w-[900px]  h-[500px]  p-10 flex flex-col items-center gap-8 
                 border border-[#f3b8c7]/30"
    >
      <h1 className="text-5xl font-extrabold text-[#D64838] drop-shadow-sm tracking-wide">
        Login
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-3xl text-gray-800 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-3xl py-3 bg-transparent border-b border-stone-500 
                       focus:outline-none focus:border-[#D64838] transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-3xl text-gray-800 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[18px] py-3 bg-transparent border-b border-stone-500 
                       focus:outline-none focus:border-[#D64838] transition-colors duration-200"
          />
        </div>

        <button
          type="submit"
         className="mt-6 bg-gradient-to-r from-[#D64838] to-[#E65A50] text-white font-bold 
             text-3xl py-4 px-8 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl 
             transition-all duration-300 w-auto mx-auto"
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