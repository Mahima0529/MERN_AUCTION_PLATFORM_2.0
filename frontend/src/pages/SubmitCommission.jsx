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
    min-h-screen flex flex-col justify-center items-center
    bg-gradient-to-br from-[#EAE7E1] via-[#EAE7E1] to-[#FAF8F6]
    px-6 py-10 overflow-y-auto overflow-x-hidden
    w-full
    lg:ml-[500px] lg:w-[calc(100%-500px)]
  "
>
  <div
    className="
      w-full max-w-[700px] bg-white/95 backdrop-blur-md shadow-xl
      rounded-2xl p-8 sm:p-10 flex flex-col gap-6
      border border-[#f3b8c7]/30
    "
  >
    <h1
      className="
        text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#D64838]
        drop-shadow-sm text-center mb-8
      "
    >
      Upload Payment Proof
    </h1>

    <form className="flex flex-col gap-6 w-full" onSubmit={handlePaymentProof}>
      <div className="flex flex-col gap-2">
        <label className="text-2xl sm:text-3xl text-gray-800 font-semibold">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          className="
            text-lg sm:text-xl py-3 px-4 bg-white border-2 border-stone-300
            focus:outline-none focus:border-[#D64838] transition-all duration-200
            rounded-md w-full
          "
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-2xl sm:text-3xl text-gray-800 font-semibold">
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

      <div className="flex flex-col gap-2">
        <label className="text-2xl sm:text-3xl text-gray-800 font-semibold">
          Comment (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="
            text-lg py-3 px-4 bg-white border-2 border-stone-300 rounded-md
            focus:outline-none focus:border-[#D64838] transition-all duration-200
            resize-none w-full
          "
          rows={6}
        />
      </div>

      <button
        type="submit"
        className="
          mt-6 bg-gradient-to-r from-[#D64838] to-[#E65A50] text-white font-bold
          text-2xl sm:text-3xl py-3 px-8 rounded-xl shadow-lg hover:scale-105
          hover:shadow-xl transition-all duration-300 w-fit mx-auto
        "
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