import { createSlice } from '@reduxjs/toolkit';
import { fetchDiary, addProduct, removeProduct } from '../diary/diaryOperations';

const today = new Date().toISOString().slice(0, 10);

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    products: [],
    date: today,
    summary: {
      totalCalories: 0,
      dailyRate: null,
      percentsOfDailyRate: null,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.summary = action.payload.summary;
      })
      .addCase(fetchDiary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.product);
        state.summary = action.payload.summary;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
        state.summary = action.payload.summary;
      });
  },
});

export const { setDate } = diarySlice.actions;
export default diarySlice.reducer;
