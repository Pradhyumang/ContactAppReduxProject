import { createSlice } from "@reduxjs/toolkit";
// import { loginedUser } from "../storage";

const signInSlice = createSlice({
  name: "signin",
  initialState: [],
  reducers: {
    signInR: (state, action) => {
      // loginedUser(action.payload.userId, true);
      // console.log(action.payload);
      return [action.payload];
    },
    logout: (state) => {
      state = [];
      return state;
    },
  },
});
export const { signInR, logout } = signInSlice.actions;
export default signInSlice.reducer;
