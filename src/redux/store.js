import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './slices/stocks';

const store = configureStore(
  {
    reducer: { stocksReducer },
  },
);

export default store;
