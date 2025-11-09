import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-5">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2">User ID</th>
              <th className="w-1/3 py-2">Status</th>
              <th className="w-1/3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 text-center">{element.userId}</td>
                    <td className="py-2 px-4 text-center">{element.status}</td>
                    <td className="flex items-center py-4 justify-center gap-3">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300"
                        onClick={() => handleFetchPaymentDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                        onClick={() => handlePaymentProofDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center text-xl text-sky-600 py-3">
                <td>No payment proofs are found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };
if (!openDrawer) return null; // ✅ Don't render drawer unless it's open

  return (
    <>
<section
      className={`fixed ${
        openDrawer && singlePaymentProof.userId ? "bottom-0" : "-bottom-full"
      } left-0 w-full h-full bg-black/60 flex items-end justify-center transition-all duration-300 z-50`}
    >
      <div
        className="
          bg-white w-[95%] sm:max-w-[640px] lg:w-[60vw] 
          lg:ml-[20vw] rounded-t-xl 
          flex flex-col justify-between 
          transition-all duration-300 
          shadow-[0_-8px_15px_-6px_rgba(0,0,0,0.2)]
          h-[85vh] lg:h-[70vh]
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="w-full px-4 py-3">
          <h3 className="text-[#D6482B] text-xl sm:text-2xl font-semibold text-center mb-1">
            Update Payment Proof
          </h3>
          <p className="text-stone-600 text-center text-sm sm:text-base">
            You can update payment status and amount.
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-1 w-full px-4 pb-2 overflow-y-auto">
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-stone-600">User ID</label>
              <input
                type="text"
                value={singlePaymentProof.userId || ""}
                disabled
                className="text-base px-2 py-1 border border-stone-500 rounded-md text-stone-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-stone-600">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-base px-2 py-1 border border-stone-500 rounded-md focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-stone-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-base px-2 py-1 border border-stone-500 rounded-md focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Settled">Settled</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-stone-600">Comment</label>
              <textarea
                rows={3}
                value={singlePaymentProof.comment || ""}
                disabled
                className="text-base px-2 py-1 border border-stone-500 rounded-md text-stone-600 focus:outline-none resize-none"
              />
            </div>

            <Link
              to={singlePaymentProof.proof?.url || ""}
              target="_blank"
              className="bg-[#D6482B] flex justify-center w-full py-2 rounded-md text-white font-medium text-base transition-all duration-300 hover:bg-[#b8381e]"
            >
              Payment Proof (SS)
            </Link>
          </form>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 p-3 bg-white border-t border-gray-200">
          <button
            type="button"
            className="bg-blue-500 w-full py-2 rounded-md text-white font-semibold text-base transition-all duration-300 hover:bg-blue-700"
            onClick={handlePaymentProofUpdate}
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            className="bg-yellow-500 w-full py-2 rounded-md text-white font-semibold text-base transition-all duration-300 hover:bg-yellow-700"
            onClick={() => setOpenDrawer(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>



    </>
  );
};


