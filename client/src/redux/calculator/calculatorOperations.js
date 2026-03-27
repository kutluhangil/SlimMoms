import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { showLoader, hideLoader } from '../slices/loaderSlice';

export const calculateDailyCalories = createAsyncThunk(
  'calculator/calculate',
  async (formData, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post('/products/calories', formData);
      toast.success('Daily calories calculated');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Calculation failed');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);
