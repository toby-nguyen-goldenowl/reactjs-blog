import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logOut } from "../../services/firebaseService";

const initialState = { userId: undefined };

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action) => {
      // "mutate" the array by calling push()
      const newState = { ...state };
      newState.userId = action.payload;
      newState.loading = false;
      return newState;
    },
  },
});

export const { authUser } = userReducer.actions;

export const handleLogOut = createAsyncThunk(
  "blogs/logOut",
  async (params, thunkAPI) => {
    await logOut();
    thunkAPI.dispatch(authUser(params));
  }
);
export default userReducer.reducer;
