/*
eslint no-param-reassign: ["error", { "props": false }]
*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const stocksSlice = createSlice({
  name: 'stockSlice',
  initialState,
  reducers: {
    setSampleList: (state) => {
      state.list = ['sample1', 'sample2'];
    },
  },
});

export const { setSample } = stocksSlice.actions;
export default stocksSlice.reducer;
