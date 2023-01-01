import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../apiConfig/axiosInstance';

export const addNewBlog = createAsyncThunk('createBlog', async (blog) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/posts/`, blog, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
});

export const updateBlog = createAsyncThunk(
  'updateBlog',
  async ({ postId, blog }) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`/posts/${postId}`, blog, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
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

const blogUpdateSlice = createSlice({
  name: 'blogUpdate',
  initialState: {
    loading: false,
    error: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.error = '';
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.error = '';
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default blogUpdateSlice.reducer;
