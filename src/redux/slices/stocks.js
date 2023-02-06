/*
eslint no-param-reassign: ["error", { "props": false }]
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const readStocks = createAsyncThunk(
  'stocks/readStocks',
  async () => {
    const res = await fetch('https://financialmodelingprep.com/api/v3/stock-screener?limit=100&country=US&exchange=NYSE&apikey=9fd8761c4aee5de1b22a36de1de6a6a9');
    const data = await res.json();
    return data;
  },
);

const stocksSlice = createSlice({
  name: 'stockSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readStocks.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { setSample } = stocksSlice.actions;
export default stocksSlice.reducer;
