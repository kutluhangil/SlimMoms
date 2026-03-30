import { useSelector } from 'react-redux';
import styles from './RightSideBar.module.css';
import { selectCalculatorResult } from '../../redux/calculator/calculatorSelectors';

const RightSideBar = () => {
  const summary = useSelector((state) => state.diary.summary);
  const { notRecommended } = useSelector(selectCalculatorResult);

  const hasSummary = summary?.dailyRate != null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.decorTablet} aria-hidden="true" />

      {!hasSummary ? (
        <p className={styles.placeholder}>Your diet will be displayed here</p>
      ) : (
        <>
          <ul className={styles.summaryList}>
            <li className={styles.summaryItem}>
              <span className={styles.label}>Daily rate</span>
              <span className={styles.value}>
                {summary?.dailyRate ? `${Math.round(summary.dailyRate)} kcal` : '—'}
              </span>
            </li>

            <li className={styles.summaryItem}>
              <span className={styles.label}>Consumed</span>
              <span className={styles.value}>
                {Math.round(summary?.totalCalories ?? 0)} kcal
              </span>
            </li>

            <li className={styles.summaryItem}>
              <span className={styles.label}>Left</span>
              <span className={styles.value}>
                {summary?.dailyRate
                  ? `${Math.round(summary.dailyRate - (summary?.totalCalories ?? 0))} kcal`
                  : '—'}
              </span>
            </li>

            <li className={styles.summaryItem}>
              <span className={styles.label}>% of normal</span>
              <span className={styles.value}>
                {summary?.percentsOfDailyRate != null
                  ? `${Math.round(summary.percentsOfDailyRate)}%`
                  : '—'}
              </span>
            </li>
          </ul>

          {notRecommended.length > 0 && (
            <div className={styles.notRecommended}>
              <h3 className={styles.notRecommendedTitle}>Food not recommended</h3>
              <ul className={styles.notRecommendedList}>
                {notRecommended.map((product, index) => (
                  <li key={index} className={styles.notRecommendedItem}>
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </aside>
  );
};

export default RightSideBar;
