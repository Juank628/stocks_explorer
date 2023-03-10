import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readStocks, getSectorsData } from '../redux/slices/stocks';
import SectorCard from '../components/SectorCard';
import nyseIcon from '../assets/nyse_icon.png';
import styles from './Home.module.scss';

export default function Home() {
  const [filteredSectors, setFilteredSectors] = useState([]);
  const { stocks, sectors } = useSelector((store) => store.stocksReducer);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const filterSectors = (e) => {
    const newSectors = sectors.filter((sector) => sector.name
      .toLowerCase()
      .includes(e.target.value.toLowerCase()));
    setFilteredSectors([...newSectors]);
  };

  useEffect(() => {
    setFilteredSectors([...sectors]);
  }, [sectors]);

  useEffect(() => {
    if (stocks.length === 0) {
      dispatch(readStocks());
    }
    dispatch(getSectorsData());
  }, [dispatch, stocks.length]);

  return (
    <section>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerLeft}>
          <img className={styles.bannerImg} src={nyseIcon} alt="NYSE" />
        </div>
        <div className={styles.bannerRight}>
          <p className={styles.bannerTitle}>NYSE</p>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Find sector" onChange={filterSectors} className={styles.filterInput} />
      </form>
      <ul className={styles.mainContainer}>
        {filteredSectors.map((sector) => (
          <SectorCard key={sector.name} sectorData={sector} />
        ))}
      </ul>
    </section>
  );
}
