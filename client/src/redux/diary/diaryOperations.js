import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { showLoader, hideLoader } from '../slices/loaderSlice';

export const fetchDiary = createAsyncThunk(
  'diary/fetchAll',
  async (date, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.get(`/diary?date=${date}`);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to load diary');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const addProduct = createAsyncThunk(
  'diary/addProduct',
  async (productData, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post('/diary', productData);
      toast.success('Product added');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to add product');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const removeProduct = createAsyncThunk(
  'diary/removeProduct',
  async (productId, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      await axiosInstance.delete(`/diary/${productId}`);
      toast.success('Product removed');
      return { id: productId };
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to remove product');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);
