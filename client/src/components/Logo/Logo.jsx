import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isLoggedIn ? '/diary' : '/');
  };

  return (
    <div className={styles.logo} onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label="SlimMom - Go to home"
    >
      {/* SVG Icon */}
     <svg className={styles.icon}>
      <use href='/slim-moms.svg'></use>
     </svg>

      {/* Text — hidden on mobile, visible on tablet+ */}
      <span className={styles.text}>
        <span className={styles.slim}>Slim</span>
        <span className={styles.mom}>Mom</span>
      </span>
    </div>
  );
};

export default Logo;