import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
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

    const { isAuthenticated } = useSelector((state) => state.user);

  return (
   <>
    <section
  className="
    min-h-screen flex flex-col justify-center items-center
    bg-gradient-to-br from-[#f6f4f0] via-[#f6f4f0] to-[#F8D4DD]
    px-6 py-10 space-y-6
    w-full
    lg:ml-[500px] lg:w-[calc(100%-500px)]
    overflow-y-auto
  ">
<div>
  <p className=' text-[#deccbe] font-bold text-xl mb-8'> Transparency Leads to Your Victory</p>
 <h1 className="text-7xl font-extrabold text-[#111] drop-shadow-sm tracking-wide">
      Transparent Auctions
      </h1>
       <h1 className="text-7xl font-extrabold text-[#d6482b] drop-shadow-sm tracking-wide mt-4">
      Be The Winner
      </h1>
      <div className='flex gap-4 my-8'>
        {
          !isAuthenticated &&(
            <>
            <Link to="/sign-up" className='bg-[#dr482b] font-semibold hover:bg-[#b8381e]'> Sign Up</Link>
            <Link></Link>
            </>
          )
        }
      </div>
</div>





  </section>
   </>
  )
}

export default Home