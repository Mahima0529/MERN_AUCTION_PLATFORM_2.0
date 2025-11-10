// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";


// const commissionSlice= createSlice({
//     name:"commission",
//     initialState:{
//         loading:false,
//     },
//     reducers:{
//         postCommissionProofRequest(state,action){
//             state.loading=true;
//         },
//         postCommissionProofSuccess(state,action){
//             state.loading=false;
//         },
//         postCommissionProofFailed(state,action){
//             state.loading=false;
//         },
//     },
// });
// export const postCommissionProof=(data)=>async(dispatch)=>{
//      dispatch(commissionSlice.actions.postCommissionProofRequest());
//     try{
//         const response= await axios.post("https://mern-auction-backend-xk9l.onrender.com/api/v1/commission/proof",
//             data,
//             {
//                 withCredentials:true,
//                 headers:{"Content-Type": "multipart/form-data"},
//             }
//         );
//         dispatch(commissionSlice.actions.postCommissionProofSuccess());
//         toast.success(response.data.success);
       
//     }catch(error){
//         dispatch(commissionSlice.actions.postCommissionProofFailed());
//         toast.error(error.response.data.message);
//            }

// };
// export default commissionSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearCommissionState(state) {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await axios.post(
      "https://mern-auction-backend-xk9l.onrender.com/api/v1/commission/proof",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(commissionSlice.actions.postCommissionProofSuccess());
    toast.success(response.data.message || "Proof uploaded successfully!");
  } catch (error) {
    
      
    dispatch(commissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
  }
};


export default commissionSlice.reducer; 
