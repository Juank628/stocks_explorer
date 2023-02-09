import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Detail.module.scss';
import { readPerformances } from '../redux/slices/details';

export default function Detail() {
  const [sectorData, setSectorData] = useState({
    name: 'undefined',
    marketCap: 0,
    numberOfCompanies: 0,
  });
  const { sectors } = useSelector((store) => store.stocksReducer);
  const { performances } = useSelector((store) => store.detailsReducer);
  const { sector } = useParams();
  const dispatch = useDispatch();

  const getData = (sectorName, sectorsList) => {
    const formatedSector = sectorName.replace(/-/g, ' ');
    const selectedSector = sectorsList.find((item) => item.name === formatedSector);
    setSectorData(selectedSector);
  };

  const getPerformance = (sectorName, performancesObject) => {
    let formatedSector = sectorName.replace(/-/g, '');
    formatedSector = `${formatedSector[0]
      .toLowerCase() + formatedSector
      .substring(1)}ChangesPercentage`;
    if (performancesObject) return performance[formatedSector];
    return 0;
  };

  useEffect(() => {
    if (performances.length === 0) {
      dispatch(readPerformances());
    }
    getData(sector, sectors);
    getPerformance(sector, performances[0]);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h3>{sectorData?.name}</h3>
      <div className={styles.metricsContainer}>
        <div className={styles.box}>
          <p>Market cap.</p>
          <p>{`${sectorData?.marketCap}M`}</p>
        </div>
        <div className={styles.box}>
          <p>Companies</p>
          <p>{sectorData?.numberOfCompanies}</p>
        </div>
      </div>
      <p>Top 5 companies</p>
      <ul className={styles.companiesContainer}>
        { sectorData?.topCompanies?.map((company) => (
          <li key={company.symbol} className={styles.box}>
            <p>{company.companyName}</p>
            <p>{company.symbol}</p>
            <p>{`${Math.round(company.marketCap / 1000000, 0)}M`}</p>
          </li>
        )) }
      </ul>
      <p>Industries:</p>
      <ul className={styles.industriesContainer}>
        { sectorData?.industries?.map((sector) => (
          <li className={styles.box} key={sector}>{sector}</li>
        )) }
      </ul>
    </div>
  );
}
