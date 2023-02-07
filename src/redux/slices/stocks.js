/*
eslint no-param-reassign: ["error", { "props": false }]
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  stocks: [
    {
      symbol: 'USB-PA',
      companyName: 'U.S. Bancorp PERP PFD SER A',
      marketCap: 1376831554441,
      sector: null,
      industry: null,
      beta: 0,
      price: 820.06,
      lastAnnualDividend: 0,
      volume: null,
      exchange: 'New York Stock Exchange',
      exchangeShortName: 'NYSE',
      country: null,
      isEtf: false,
      isActivelyTrading: null,
    },
    {
      symbol: 'DHR-PB',
      companyName: 'Danaher Corporation',
      marketCap: 975082506636,
      sector: 'Healthcare',
      industry: 'Diagnostics & Research',
      beta: 0.816532,
      price: 1341.75,
      lastAnnualDividend: 50,
      volume: 3217,
      exchange: 'New York Stock Exchange',
      exchangeShortName: 'NYSE',
      country: 'US',
      isEtf: false,
      isActivelyTrading: true,
    },
    {
      symbol: 'BRK-A',
      companyName: 'Berkshire Hathaway Inc.',
      marketCap: 689753402693,
      sector: 'Financial Services',
      industry: 'Insurance—Diversified',
      beta: 0.899197,
      price: 473257.5,
      lastAnnualDividend: 0,
      volume: 3393,
      exchange: 'New York Stock Exchange',
      exchangeShortName: 'NYSE',
      country: 'US',
      isEtf: false,
      isActivelyTrading: true,
    },
    {
      symbol: 'BRK-B',
      companyName: 'Berkshire Hathaway Inc.',
      marketCap: 689207767500,
      sector: 'Financial Services',
      industry: 'Insurance—Diversified',
      beta: 0.899197,
      price: 312.59,
      lastAnnualDividend: 0,
      volume: 3706213,
      exchange: 'New York Stock Exchange',
      exchangeShortName: 'NYSE',
      country: 'US',
      isEtf: false,
      isActivelyTrading: true,
    },
    {
      symbol: 'V',
      companyName: 'Visa Inc.',
      marketCap: 487285533368,
      sector: 'Financial Services',
      industry: 'Credit Services',
      beta: 0.940704,
      price: 230.11,
      lastAnnualDividend: 1.575,
      volume: 6786367,
      exchange: 'New York Stock Exchange',
      exchangeShortName: 'NYSE',
      country: 'US',
      isEtf: false,
      isActivelyTrading: true,
    },
  ],
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
