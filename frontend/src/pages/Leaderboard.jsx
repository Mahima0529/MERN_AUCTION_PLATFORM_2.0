import React from "react";
import { useSelector } from "react-redux";
import Spinner from "@/custom-components/Spinner";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
 <section
  className="
    min-h-screen 
    flex flex-col justify-start items-center
    bg-gradient-to-br from-[#FFD8A8] via-[#FFDAB9] to-[#F8D4DD]
    px-6 py-10 space-y-6
    w-[100vw] ml-0
    md:w-[100vw] 
    lg:w-[80vw] lg:ml-[20vw]
    overflow-y-auto
    transition-all duration-300
  "
>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Heading */}
          <h1 className="text-[#D6482B] text-3xl self-start sm:text-5xl md:text-4xl  2xl:text-4xl font-bold text-center ">
            Bidders Leaderboard
          </h1>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm  rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-1 px-4 text-left  text-gray-700">#</th>
                  <th className="py-1 px-4 text-left  text-gray-700">Profile Pic</th>
                  <th className="py-1 px-4 text-left  text-gray-700">Username</th>
                  <th className="py-1 px-4 text-left  text-gray-700">Bid Expenditure</th>
                  <th className="py-1 px-4 text-left  text-gray-700">Auctions Won</th>
                </tr>
              </thead>

              <tbody className="text-gray-800">
                {leaderboard.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-3 text-gray-500 font-medium"
                    >
                      No bidders found
                    </td>
                  </tr>
                ) : (
                  leaderboard.slice(0, 100).map((element, index) => (
                    <tr
                      key={element._id || index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                       <td className="flex gap-2 items-center  px-3">
                      <span className="text-stone-400 font-semibold text-xl w-7 ">
                            {index + 1}
                          </span>
                      </td>
                      <td className="py-2 px-4">
                        <img
                          src={element.profileImage?.url}
                          alt={element.userName}
                          className="h-8 w-8 object-cover rounded-full border border-gray-300"
                        />
                      </td>
                      {/* </td> */}
                      <td className="py-2 px-4">{element.userName}</td>
                      <td className="py-2 px-4 ">
                        {element.moneySpent}
                      </td>
                      <td className="py-2 px-4 ">
                        {element.auctionsWon}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
