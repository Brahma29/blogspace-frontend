import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../apiConfig/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const registerUser = createAsyncThunk('registerUser', async (user) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/users`, {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
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

//Login Function
export const loginUser = createAsyncThunk('loginuser', async (user) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/users/login`, user)
      .then((res) => {
        let data = res.data;
        localStorage.setItem('token', data.doc.token);

        resolve(data);
      })
      .catch((error) => {
        const data = error.response.data;
        console.log(data);
        reject(data);
      });
  });
});

//Logout User

export const logOutUser = createAsyncThunk('logout', () => {
  localStorage.removeItem('token');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    success: false,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.success = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.success = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.success = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
