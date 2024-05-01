import { createSlice } from "@reduxjs/toolkit";
// import { setStorageUser } from "../storage";

const signUpSlice = createSlice({
  name: "signup",
  initialState: [],
  reducers: {
    signUpR: (state, action) => {
      return [...state, action.payload.data];
    },
  },
});
export const { signUpR } = signUpSlice.actions;
export default signUpSlice.reducer;
