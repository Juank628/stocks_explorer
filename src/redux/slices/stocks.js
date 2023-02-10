/*
eslint no-param-reassign: ["error", { "props": false }]
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],
  sectors: [],
};

export const readStocks = createAsyncThunk(
  'stocks/readStocks',
  async () => {
    const res = await fetch('https://financialmodelingprep.com/api/v3/stock-screener?limit=1000&exchange=NASDAQ&apikey=9fd8761c4aee5de1b22a36de1de6a6a9');
    const data = await res.json();
    return data;
  },
);

const stocksSlice = createSlice({
  name: 'stockSlice',
  initialState,
  reducers: {
    getSectorsData: (state) => {
      const sectorsList = [];
      const sectorsData = [];
      state.stocks.forEach((stock) => {
        if (!sectorsList.includes(stock.sector) && stock.sector !== '' && stock.sector !== null) {
          sectorsList.push(stock.sector);
        }
      });
      sectorsList.forEach((sector) => {
        const stocksBySector = state.stocks
          .filter((stock) => stock.sector === sector)
          .sort((a, b) => b.marketCap - a.marketCap);
        const industries = stocksBySector.map((stock) => {
          if (stock.industry !== '' && stock.industry !== null) return stock.industry;
          return 'Other';
        });
        const marketCap = stocksBySector.reduce(
          (acc, stock) => acc + (stock.marketCap / 1000000), 0,
        );
        sectorsData.push({
          name: sector,
          numberOfCompanies: stocksBySector.length,
          industries: [...new Set(industries)],
          marketCap: Math.round(marketCap, 0),
          topCompanies: stocksBySector.slice(0, 5),
        });
      });
      state.sectors = sectorsData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readStocks.fulfilled, (state, action) => {
      state.stocks = action.payload;
    });
  },
});

export const { getSectorsData } = stocksSlice.actions;
export default stocksSlice.reducer;
