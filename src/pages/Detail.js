import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Detail.module.scss';
import { readPerformances } from '../redux/slices/details';

export default function Detail() {
  const [sectorData, setSectorData] = useState({});
  const { sectors } = useSelector((store) => store.stocksReducer);
  const { performances } = useSelector((store) => store.detailsReducer);
  const { sector } = useParams();
  const dispatch = useDispatch();

  const getData = () => {
    const formatedSector = sector.replace(/-/g, ' ');
    const selectedSector = sectors.find((item) => item.name === formatedSector);
    setSectorData(selectedSector);
  };

  const getPerformance = () => {
    const performance = performances[0];
    let formatedSector = sector.replace(/-/g, '');
    formatedSector = `${formatedSector[0]
      .toLowerCase() + formatedSector
      .substring(1)}ChangesPercentage`;
    if (performance) return performance[formatedSector];
    return 0;
  };

  useEffect(() => {
    if (performances.length === 0) {
      // dispatch(readPerformances());
    }
    getData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h3>{sectorData.name}</h3>
      <p>{`Market cap: ${sectorData.marketCap}M`}</p>
      <p>{`Number of companies: ${sectorData.numberOfCompanies}`}</p>
      <p>{`performance: ${getPerformance()}`}</p>
      <p>Industries:</p>
      <ul>
        { sectorData.industries?.map((sector) => (
          <li key={sector}>{sector}</li>
        )) }
      </ul>
      <p>Top 5 companies</p>
      <table className={styles.companiesTable}>
        <tbody>
          <tr>
            <th>company</th>
            <th>symbol</th>
            <th>value</th>
          </tr>
        </tbody>
        <tbody>
          { sectorData.topCompanies?.map((company) => (
            <tr key={company.symbol}>
              <td>{company.companyName}</td>
              <td className={styles.textCenter}>{company.symbol}</td>
              <td className={styles.textCenter}>{Math.round(company.marketCap / 1000000, 0)}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
