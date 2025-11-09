
import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import  FeaturedAuctions  from './home-sub-components/FeaturedAuctions';
import  UpcomingAuctions  from './home-sub-components/UpcomingAuctions';
import  Leaderboard  from './home-sub-components/Leaderboard';
import Spinner from '@/custom-components/Spinner';
const Home = () => {

 const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];
// eslint-disable-next-line no-unused-vars
    const { isAuthenticated } = useSelector((state) => state.user);

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

<div className='flex flex-col items-start w-full p-0 m-0'>
  <p className=' text-[#DA70D6] font-bold text-xl  mb-8'> Transparency Leads to Your Victory</p>
   <h1
            className={`text-[#111] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-5xl 2xl:text-4xl`}
          >
            Transparent Auctions
          </h1>
       <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-5xl 2xl:text-4xl`}
          >
            Be The Winner
          </h1>
      {/* <div className='flex gap-4 my-8'>
        {
          !isAuthenticated &&(
            <>
         <Link to="/sign-up"
            className="bg-gradient-to-r from-[#D64838] to-[#BE342B] text-white font-semibold 
            text-xl sm:text-2xl px-6 py-3 rounded-full 
            hover:bg-[#BE342B] hover:scale-105 transition-all
             duration-200 shadow-md">
              Sign Up
         </Link>
        <Link to="/login"
              className="bg-[#D64838] text-white font-semibold 
              text-xl sm:text-2xl px-6 py-3 rounded-full 
              hover:bg-[#BE342B] hover:scale-105 transition-all
               duration-200 shadow-md" >
                Login
         </Link>
            </>
          )
        }
      </div> */}
</div>

<div className='flex flex-col items-start w-full p-0 m-0 gap-6'>
   <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">How it works</h3>
       
  <div className='flex flex-col gap-4 md:flex-row 
  md:flex-wrap w-full'>
{
  howItWorks.map(element=>{
    return(
      <div key={element.title} 
      className='bg-white flex flex-col gap-2 p-2 
      rounded-md h-[96px] justify-center md:w-[48%]
      lg:w-[47%] 2xl:w-[24%] hover:shadow-md transition-all duration-300'>
        <h5 className='font-bold '>{element.title}

        </h5>
        <p >{element.description}</p>
      </div>
    )
  })
}

  </div>

</div>

<FeaturedAuctions/>
<UpcomingAuctions/>
<Leaderboard/>







  </section>
   </>
  )
}

export default Home