import Spinner from '@/custom-components/Spinner';
import { getAuctionDetail } from '@/store/slices/auctionSlice';
import React, { useEffect } from 'react'
import { FaGreaterThan } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auctionImg from "../images/auction.png";



const ViewAuctionDetails = () => {
     const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated ,user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();


 

  useEffect(() => {
    if (!isAuthenticated || user.role=== "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);
  return (
    
    <>
  <section
  className="
    flex flex-col justify-start items-center
    bg-gradient-to-br from-[#FFD8A8] via-[#FFDAB9] to-[#F8D4DD]
    px-6 py-10 space-y-5
    w-[100vw] ml-0
    md:w-[100vw] 
    lg:w-[80vw] lg:ml-[20vw]
    overflow-y-auto min-h-screen
    transition-all duration-300
  "
>
  {/* Breadcrumbs */}
  <div className="text-sm sm:text-base self-start flex flex-wrap gap-2 items-center ">
    <Link
      to="/"
      className="font-semibold text-[#333] transition-all duration-300 hover:text-[#D6482B]"
    >
      Home
    </Link>
    <FaGreaterThan className="text-stone-400" />
    <Link
      to="/view-my-auctions"
      className="font-semibold text-[#333] transition-all duration-300 hover:text-[#D6482B]"
    >
      My Auctions
    </Link>
    <FaGreaterThan className="text-stone-400" />
    <p className="text-stone-600 font-medium">{auctionDetail.title}</p>
  </div>

  {/* Loading Spinner */}
  {loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col ml-0 lg:flex-row gap-40 w-full">
      {/* Left: Image + Info */}
      <div className="flex-1 flex flex-col  ml-0 gap-4">
       <div className="bg-gradient-to-br from-[#FFF1E6] via-[#FFE5E0] to-[#FBE8D3] 
      rounded-2xl shadow-lg w-full flex justify-start items-center 
      overflow-hidden p-8">  <img
    src={auctionDetail.image?.url}
    alt={auctionDetail.title}
    className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] h-auto mx-auto max-w-[400px]
        object-contain rounded-xl transition-transform duration-300 hover:scale-105"
      />
</div>


        {/* Item Info */}
        
          <h3 className="text-[#111] text-xl md:text-3xl font-semibold">
            {auctionDetail.title}
          </h3>
          <p className="text-lg  font-semibold">
            Condition:{" "}
            <span className="text-[#D6482B]">{auctionDetail.condition}</span>
          </p>
          <p className="text-lg font-semibold">
            Minimum Bid:{" "}
            <span className="text-[#D6482B]">Rs.{auctionDetail.startingBid}</span>
          </p>
          <div className="pt-1">
            <p className="text-xl font-bold mb-2">Description</p>
            <hr className="border-t border-stone-400 mb-2" />
            <ul className="list-disc ml-5 space-y-2">
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((element, index) => (
                  <li key={index} className="text-[17px] leading-relaxed">
                    {element}
                  </li>
                ))}
            </ul>
          
        </div>
      </div>

      {/* Right: Bids Section */}
      <div className="flex-1 flex flex-col">
       <header className="bg-gradient-to-r from-[#D6482B] to-[#E65A50] py-2 text-center max-w-[400px] text-2xl font-semibold rounded-t-2xl text-white shadow-lg shadow-[#D6482B]/40">
  BIDS
</header>


        <div className="bg-gradient-to-br from-[#1E1E1E] via-[#2C2C2C] to-[#3D3D3D]
 px-6 py-6 rounded-b-xl shadow-md min-h-[500px] max-w-[400px]  flex flex-col justify-start">
          {auctionBidders &&
          new Date(auctionDetail.startTime) < Date.now() &&
          new Date(auctionDetail.endTime) > Date.now() ? (
            auctionBidders.length > 0 ? (
              auctionBidders.map((element, index) => (
                <div
                  key={index}
                  className=" flex p-1 items-center justify-between border-b border-stone-200"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <img
                      src={element.profileImage}
                      alt={element.userName}
                      className="w-10 h-10 rounded-full hidden md:block border-2 border-[#FFD700] shadow-md"
                    />
                    <p className="text-[18px] text-white font-medium">{element.userName}</p>
                  </div>
                  <p className='flex-1 text-white text-center'>
                    {element.amount}
                  </p>
                  <p
                    className={`text-[18px] font-semibold ${
                      index === 0
                        ? "text-green-600 flex-1 text-end"
                        : index === 1
                        ? "text-blue-600 flex-1 text-end"
                        : index === 2
                        ? "text-yellow-600 flex-1 text-end"
                        : "text-gray-600 flex-1 text-end"
                    }`}
                  >
                    {index + 1}
                    {index === 0
                      ? "st"
                      : index === 1
                      ? "nd"
                      : index === 2
                      ? "rd"
                      : "th"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-white py-4">
                No bids for this auction
              </p>
            )
          ) : Date.now() < new Date(auctionDetail.startTime) ? (
            <img
             src={auctionImg}
              alt="not-started"
              className="w-full max-h-[400px] object-contain"
            />
          ) : (
            <img
            
          src="data:image/png;base64,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"
              alt="ended"
              className="w-full max-h-[400px] object-contain"
            />
          )}
        </div>

        {/* Place Bid Section */}
      
      </div>
    </div>
  )}
</section>

    </>
  )
}

export default ViewAuctionDetails