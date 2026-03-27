import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { showLoader, hideLoader } from '../slices/loaderSlice';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post('/auth/register', credentials);
      toast.success('Registration successful');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Registration failed');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post('/auth/login', credentials);
      toast.success('Login successful');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Invalid email or password');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  thunkAPI.dispatch(showLoader());
  try {
    await axiosInstance.post('/auth/logout');
    toast.success('Logged out successfully');
  } catch (error) {
    toast.error(error.response?.data?.message ?? 'Logout failed');
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});
