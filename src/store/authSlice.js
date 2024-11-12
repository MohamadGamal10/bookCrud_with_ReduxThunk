import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false , author: "gemy"},
    reducers: {
      logInOut: (state) => {
          state.isLoggedIn = !state.isLoggedIn
      }
    }
});

export const {logInOut} = authSlice.actions;
export default authSlice.reducer