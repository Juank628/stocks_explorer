import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './slices/stocks';
import detailsReducer from './slices/details';

const store = configureStore(
  {
    reducer: { stocksReducer, detailsReducer },
  },
);

export default store;
