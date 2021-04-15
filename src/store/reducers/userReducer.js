import { createReducer } from "@reduxjs/toolkit";
import authUser from "../actions/index";

// const initialState = {
//   userId: undefined,
//   loading: true,
// };

// const userReducer = (state = initialState, action) => {
//   const { user } = action;
//   switch (action.type) {
//     case types.AUTH_USERID:
//       return {
//         userId: user,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

const userReducer = createReducer(
  {
    userId: undefined,
    loading: true,
  },
  (builder) => {
    builder.addCase(authUser, (state, action) => {
      // "mutate" the array by calling push()
      const newState = { ...state };
      newState.userId = action.payload;
      newState.loading = false;
      return newState;
    });
  }
);
export default userReducer;
