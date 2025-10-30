import React from 'react'
import { FaUser,FaGavel, FaEnvelope, FaDollarSign,FaFileInvoice,FaRedo } from 'react-icons/fa'
const HowItWorks = () => {

const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Proof of Payment",
      description:
        "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
    },
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
    },
  ];


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


  {/* Heading */}
  <h1 className="text-5xl font-extrabold text-[#D64838] drop-shadow-md tracking-wide text-center ">
    Discover How PrimeBid Operates
  </h1>

  {/* Steps */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full ">
    {steps.map((element, index) => (
      <div
        key={index}
        className="bg-white/80 backdrop-blur-sm border border-[#ffd6c2] 
                   rounded-2xl px-1 py-1.5 flex flex-col items-center text-center 
                   transition-all duration-300 shadow-sm hover:shadow-xl 
                   hover:-translate-y-2 hover:bg-white mt-8"
      >
        <div
          className="bg-[#D64838] text-white text-[17px] p-4 rounded-full 
                     mb-4 shadow-md transition-all duration-300 
                     group-hover:scale-110"
        >
          {element.icon}
        </div>
        <h2 className="text-[17px] font-semibold text-[#D64838]">
          {element.title}
        </h2>
        <p className="text-gray-600 mt-2 text-[17px] leading-relaxed">
          {element.description}
        </p>
      </div>
    ))}
  </div>
</section>

   
   </>
  )
}

export default HowItWorks