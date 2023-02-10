import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from '../assets/back_icon.png';
import settingsIcon from '../assets/settings_icon.png';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <header className={styles.mainContainer}>
      <Link to="/"><img className={styles.back} src={backIcon} alt="back" /></Link>
      <h1 className={styles.title}>Sector performance</h1>
      <Link to="/"><img className={styles.settings} src={settingsIcon} alt="back" /></Link>
    </header>
  );
}
