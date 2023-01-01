import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../apiConfig/axiosInstance';

const initialState = {
  loading: true,
  blogs: [],
  success: false,
  error: '',
};

export const listAllBlogs = createAsyncThunk(
  'listAllBlogs',
  async (keyword, limit, page) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(`/posts`, {
          params: {
            keyword,
            limit,
            page,
          },
        })
        .then((res) => {
          let data = res.data;
          resolve(data);
        })
        .catch((error) => {
          const data = error.response.data;
          reject(data);
        });
    });
  }
);

export const listUserBlogs = createAsyncThunk('listUserBlogs', async () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/posts/user/articles`)
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

const blogsListSlice = createSlice({
  name: 'blogListSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAllBlogs.pending, (state) => {
        state.loading = true;
        state.blogs = [];
        state.error = '';
      })
      .addCase(listAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.doc.posts;
        state.success = action.payload.success;
        state.error = '';
      })
      .addCase(listAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.blogs = [];
        state.success = action.payload.success;
        state.error = action.error.message;
      })
      .addCase(listUserBlogs.pending, (state) => {
        state.loading = true;
        state.blogs = [];
        state.error = '';
      })
      .addCase(listUserBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.docs;
        state.success = action.payload.success;
        state.error = '';
      })
      .addCase(listUserBlogs.rejected, (state, action) => {
        state.loading = false;
        state.blogs = [];
        state.success = action.payload.success;
        state.error = action.error.message;
      });
  },
});

export default blogsListSlice.reducer;
