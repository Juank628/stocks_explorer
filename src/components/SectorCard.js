import React from 'react';
import PropTypes from 'prop-types';

const SectorCard = ({ sectorName, sectorCap }) => (
  <div>
    <h3>{sectorName}</h3>
    <p>{sectorCap}</p>
  </div>
);

SectorCard.propTypes = {
  sectorName: PropTypes.string.isRequired,
  sectorCap: PropTypes.number.isRequired,
};

export default SectorCard;
