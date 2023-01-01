import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../apiConfig/axiosInstance';

export const likePost = createAsyncThunk('likePost', async (postId) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/posts/like/${postId}`)
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((error) => {
        const data = error.response.data;
        reject(data);
      });
  });
});

const likePostSlice = createSlice({
  name: 'likePostSlice',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = '';
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default likePostSlice.reducer;
