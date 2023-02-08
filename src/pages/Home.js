import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readStocks, getSectorsData } from '../redux/slices/stocks';
import SectorCard from '../components/SectorCard';
import styles from './Home.module.scss';

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
      <ul className={styles.mainContainer}>
        {sectors.map((sector) => (
          <SectorCard key={sector.name} sectorData={sector} />
        ))}
      </ul>
    </section>
  );
}
