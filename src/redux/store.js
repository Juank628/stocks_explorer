import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './slices/stocks/stocks';

const store = configureStore(
  {
    reducer: { stocksReducer },
  },
);

export default store;
