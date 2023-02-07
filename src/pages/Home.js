import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readStocks, getSectorsData } from '../redux/slices/stocks';

export default function Home() {
  const { stocks, sectors } = useSelector((store) => store.stocksReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stocks.length === 0) {
      dispatch(readStocks());
    }
    dispatch(getSectorsData());
  }, [dispatch, stocks.length]);

  return (
    <section>
      <ul>
        {sectors.map((sector) => (
          <li key={sector.name}>
            <h3>{sector.name}</h3>
            <p>{`${sector.marketCap}M`}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
