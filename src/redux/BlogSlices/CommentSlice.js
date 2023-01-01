import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../apiConfig/axiosInstance';

export const addComment = createAsyncThunk(
  'createBlog',
  async ({ comment, blogId }) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/posts/comment/${blogId}`, { comment })
        .then((res) => {
          let data = res.data;
          resolve(data);
        })
        .catch((error) => {
          const data = error.response.data;
          console.log(data);
          reject(data);
        });
    });
  }
);

const commmentSlice = createSlice({
  name: 'commentSlice',
  initialState: {
    loading: false,
    success: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = '';
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default commmentSlice.reducer;
