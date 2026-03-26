import { createSlice } from '@reduxjs/toolkit';
import { calculateDailyCalories } from '../calculator/calculatorOperations';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    dailyCalories: null,
    notRecommendedProducts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearResult(state) {
      state.dailyCalories = null;
      state.notRecommendedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateDailyCalories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(calculateDailyCalories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyCalories = action.payload.dailyCalories;
        state.notRecommendedProducts = action.payload.notRecommended;
      })
      .addCase(calculateDailyCalories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResult } = calculatorSlice.actions;
export default calculatorSlice.reducer;
