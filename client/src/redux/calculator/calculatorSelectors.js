export const selectCalculatorResult = (state) => ({
  dailyCalories: state.calculator.dailyCalories,
  notRecommended: state.calculator.notRecommendedProducts,
});
export const selectCalculatorIsLoading = (state) => state.calculator.isLoading;
