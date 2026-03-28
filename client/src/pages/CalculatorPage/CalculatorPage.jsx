import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Sol: Form */}
          <section className={styles.formSection}>
            <h1 className={styles.title}>
              Calculate your daily <span className={styles.titleAccent}>calorie</span> intake
            </h1>
            <CalculatorCalorieForm />
          </section>

          {/* Sağ: Sidebar */}
          <aside className={styles.sidebarSection}>
            <RightSideBar />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;