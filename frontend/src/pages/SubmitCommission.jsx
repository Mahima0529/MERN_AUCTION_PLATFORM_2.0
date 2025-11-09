import { postCommissionProof } from '@/store/slices/commissionSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SubmitCommission = () => {

const[proof, setProof]=useState("");
const[amount, setAmount]=useState("");
const[comment, setComment]=useState("");

const  proofHandler=(e)=>{
    const file= e.target.files[0];
    setProof(file);
};
const dispatch=useDispatch();
    const {loading}= useSelector((state)=>state.commission);
    const handlePaymentProof=(e)=>{
        e.preventDefault();
        const formData= new FormData();
        formData.append("proof",proof);
         formData.append("amount",amount);
          formData.append("comment",comment);
          dispatch(postCommissionProof(formData));
    };


  return (
   <>
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

    <h1
      className="
        text-xl sm:text-4xl lg:text-4xl font-extrabold text-[#D64838]
        drop-shadow-sm text-center mb-8
      "
    >
      Upload Payment Proof
    </h1>

    <form className="flex flex-col gap-6 w-full" onSubmit={handlePaymentProof}>
      <div className="flex flex-col ">
       <label className="text-xl md:text-2xl font-semibold text-[#111] tracking-wide mb-4 ">
               Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          className="
            text-[16px] sm:text-[16px] py-3 px-3 bg-white border-2 border-stone-300
            focus:outline-none focus:border-[#D64838] transition-all duration-200
            rounded-md w-full
          "
        />
      </div>

      <div className="flex flex-col ">
         <label className="text-xl md:text-2xl font-semibold text-[#111] tracking-wide mb-4 ">
               Upload Proof
        </label>
        <input
          type="file"
          onChange={proofHandler}
          className="
            py-3 px-4 bg-white border-2 border-stone-300 rounded-md
            focus:outline-none focus:border-[#D64838] transition-all duration-200
            w-full
          "
        />
      </div>

      <div className="flex flex-col ">
       <label className="text-xl md:text-2xl font-semibold text-[#111] tracking-wide mb-4 ">
               Comment (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="
            text-[16px] sm:text-[16px] py-2 px-2 bg-white border-2 border-stone-300 rounded-md
            focus:outline-none focus:border-[#D64838] transition-all duration-200
            resize-none w-full
          "
          rows={6}
        />
      </div>

      <button
        type="submit"
         className="mt-5 bg-gradient-to-r from-[#D64838] to-[#E65A50] text-white font-semibold 
             text-xl sm:text-xl py-2 px-4 sm:py-2   rounded-xl shadow-lg 
             hover:scale-105 hover:shadow-xl transition-all duration-300 
             w-[30vw]  xl:w-[20vw] md:w-2/3 lg:w-1/2 mx-auto my-4"
      >
        {loading ? "Uploading..." : "Upload Payment Proof"}
      </button>
    </form>
  </div>
</section>





   </>
  )
}

export default SubmitCommission