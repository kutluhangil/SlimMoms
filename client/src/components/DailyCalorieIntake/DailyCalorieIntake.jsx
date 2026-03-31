import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectCalculatorResult } from '../../redux/calculator/calculatorSelectors';
import styles from './DailyCalorieIntake.module.css';

const DailyCalorieIntake = ({ onClose }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { dailyCalories, notRecommended } = useSelector(selectCalculatorResult);

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/register');
    } else {
      onClose();
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Your recommended daily calorie intake is</p>
      <p className={styles.calories}>
        {dailyCalories ?? '—'}{' '}
        <span className={styles.unit}>kcal</span>
      </p>

      {notRecommended?.length > 0 && (
        <div className={styles.notRecommended}>
          <p className={styles.subtitle}>Foods you should not eat</p>
          <ul className={styles.list}>
            {notRecommended.map((product, index) => (
              <li key={index} className={styles.item}>
                {product}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className={styles.btn} onClick={handleClick}>
        Start losing weight
      </button>
    </div>
  );
};

export default DailyCalorieIntake;
