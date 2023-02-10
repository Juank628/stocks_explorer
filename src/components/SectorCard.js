import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import trendIcon from '../assets/trend_icon.png';
import arrowIcon from '../assets/arrow_icon.png';
import styles from './SectorCard.module.scss';

const SectorCard = ({ sectorData }) => {
  const getLink = () => {
    const sectorName = sectorData.name.replace(/ /g, '-');
    return `/detail/${sectorName}`;
  };

  return (
    <li className={styles.mainContainer}>
      <Link to={getLink()} className={styles.linkContainer}>
        <div className={styles.arrowContainer}>
          <img className={styles.arrow} src={arrowIcon} alt="next" />
        </div>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={trendIcon} alt="trend icon" />
        </div>
        <div className={styles.infoContainer}>
          <h3 className={styles.name}>{sectorData.name.toUpperCase()}</h3>
          <p className={styles.marketCap}>{`${sectorData.marketCap}M`}</p>
        </div>
      </Link>
    </li>
  );
};

SectorCard.propTypes = {
  sectorData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    marketCap: PropTypes.number.isRequired,
  }).isRequired,
};

export default SectorCard;
