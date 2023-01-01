import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    saveBlogs(state, action) {
      state.data = action.payload;
    },
  },
});

export const { saveBlogs } = blogSlice.actions;

export default blogSlice.reducer;
