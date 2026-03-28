import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { showLoader, hideLoader } from '../loader/loaderSlice';

export const calculateDailyCalories = createAsyncThunk(
  'calculator/calculateDailyCalories',
  async (formData, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post('/products/private', formData);
      toast.success('Daily calories calculated');
      return data; // fulfilled → extraReducers'da state'e yazılır
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Calculation failed');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);