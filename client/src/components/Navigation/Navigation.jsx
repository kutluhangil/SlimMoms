import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ onLinkClick }) => {
  const getClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav className={styles.nav}>
      <NavLink to="/diary" className={getClass} onClick={onLinkClick} end>
        Diary
      </NavLink>
      <NavLink to="/calculator" className={getClass} onClick={onLinkClick} end>
        Calculator
      </NavLink>
    </nav>
  );
};

export default Navigation;
