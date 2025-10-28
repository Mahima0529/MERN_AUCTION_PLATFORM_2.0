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
    min-h-screen flex flex-col justify-start items-center
    bg-gradient-to-br from-[#FFE5C2] via-[#FFD6C2] to-[#FDE2E4]
    px-6 py-16 space-y-5
    lg:ml-[500px] lg:w-[calc(100%-500px)]
    w-full   overflow-y-auto
  "
>

  {/* Heading */}
  <h1 className="text-7xl font-extrabold text-[#D64838] drop-shadow-md tracking-wide text-center mt-20">
    Discover How PrimeBid Operates
  </h1>

  {/* Steps */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full ">
    {steps.map((element, index) => (
      <div
        key={index}
        className="bg-white/80 backdrop-blur-sm border border-[#ffd6c2] 
                   rounded-2xl p-6 flex flex-col items-center text-center 
                   transition-all duration-300 shadow-sm hover:shadow-xl 
                   hover:-translate-y-2 hover:bg-white mt-8"
      >
        <div
          className="bg-[#D64838] text-white text-4xl p-4 rounded-full 
                     mb-4 shadow-md transition-all duration-300 
                     group-hover:scale-110"
        >
          {element.icon}
        </div>
        <h2 className="text-3xl font-semibold text-[#D64838]">
          {element.title}
        </h2>
        <p className="text-gray-600 mt-2 text-xl leading-relaxed">
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