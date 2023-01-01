import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../apiConfig/axiosInstance';

export const getBlogById = createAsyncThunk('getSingleBlog', async (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/posts/${id}`)
      .then((res) => {
        let data = res.data;
        resolve(data);
      })
      .catch((error) => {
        const data = error.response.data;
        reject(data);
      });
  });
});

const singleBlogSlice = createSlice({
  name: 'singleBlog',
  initialState: {
    loading: true,
    blog: {},
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogById.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.doc;
        state.error = '';
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.blog = {};
        state.error = action.error.message;
      });
  },
});

export default singleBlogSlice.reducer;
