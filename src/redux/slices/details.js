/*
eslint no-param-reassign: ["error", { "props": false }]
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  performances: [],
};

export const readPerformances = createAsyncThunk(
  'details/readPerformances',
  async () => {
    const res = await fetch('https://financialmodelingprep.com/api/v3/sector-performance?apikey=9fd8761c4aee5de1b22a36de1de6a6a9');
    const data = await res.json();
    return data;
  },
);

const detailsSlice = createSlice({
  name: 'detailsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readPerformances.fulfilled, (state, action) => {
      state.performances = action.payload;
    });
  },
});

export default detailsSlice.reducer;
