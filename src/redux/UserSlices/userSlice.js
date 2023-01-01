import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.data = action.payload;
    },
    logOut(state, action) {
      state.data = null;
      localStorage.removeItem("access_token");
    },
  },
});

export const { saveUserInfo, logOut } = userSlice.actions;

export default userSlice.reducer;
