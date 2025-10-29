import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <>
      <section className="my-8 self-start w-full ">
       <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl ml-0">
  Auctions For Today
</h3>

<div className="flex flex-col items-start ml-0 flex-wrap gap-6">
  <div
    className="bg-[#161613] w-full p-3 rounded-md flex flex-col justify-center 
    lg:flex-1 lg:h-auto lg:p-3 2xl:flex-none 2xl:basis-auto 2xl:flex-grow 2xl:px-3 2xl:py-2"
  >
    <div className="flex flex-col justify-center items-start gap-2">
      <span className="rounded-full bg-[#fdba88] text-white w-fit p-3 mb-2">
        <RiAuctionFill />
      </span>

      <h3
        className="text-[#fdba88] text-xl font-semibold min-[480px]:text-xl 
        md:text-2xl lg:text-3xl leading-tight"
      >
        Auctions For <br />
        <span className="text-[#fff] inline-block mt-1">Today</span>
      </h3>
    </div>
  </div>
</div>

          <div className="flex flex-col  gap-6 w-full lg:flex-1 2xl:flex-none 2xl:basis-64 2xl:flex-grow">
            {auctionsStartingToday.slice(0, 2).map((element) => {
              return (
                <Link
                to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10"
                    />
                    <p className="font-extralight text-[#111] text-2xl">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-600 text-xl font-semibold">
                      Starting Bid:
                    </p>{" "}
                    <p className="text-[#fdba88 font-semibold]">
                      Rs. {element.startingBid}
                    </p>{" "}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-stone-600  text-xl font-semibold">Starting Time:</p>
                    <p className="text-black text-[16px]">{element.startTime}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
            {auctionsStartingToday.slice(2, 4).map((element) => {
              return (
                <Link  to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10"
                    />
                    <p className="font-extralight text-[#111] text-[12px]">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-600 font-semibold">
                      Starting Bid:
                    </p>{" "}
                    <p className="text-[#fdba88] font-medium text-[18px]">
  Rs. {element.startingBid}
</p>
{" "}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-stone-600 font-bold">Starting Time:</p>
                    <p className="text-black  text-[12px]">{element.startTime}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
            {auctionsStartingToday.slice(4, 6).map((element) => {
              return (
                <Link to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10"
                    />
                    <p className="font-extralight text-[#111] text-[12px]">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-600 font-semibold">
                      Starting Bid:
                    </p>{" "}
                    <p className="text-[#fdba88 font-semibold]">
                      Rs. {element.startingBid}
                    </p>{" "}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-stone-600 font-bold">Starting Time:</p>
                    <p className="text-black  text-[12px]">{element.startTime}</p>
                  </div>
                </Link>
              );
            })}
          </div>
       
      </section>
    </>
  );
};

export default UpcomingAuctions;