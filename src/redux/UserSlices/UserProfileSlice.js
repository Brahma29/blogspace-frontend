import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../apiConfig/axiosInstance';

export const getUserProfile = createAsyncThunk('userProfile', async () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/users/me`)
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

export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async ({ userId, user }) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(`/users/${userId}`, user, {
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

const userProfileSlice = createSlice({
  name: 'userProfileSlice',
  initialState: {
    loading: true,
    userDetails: {},
    success: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload.doc;
        state.error = '';
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.userDetails = {};
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = '';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default userProfileSlice.reducer;
