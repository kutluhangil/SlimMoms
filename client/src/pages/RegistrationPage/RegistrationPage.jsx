import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <main className={styles.page}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Register
          </h1>
          <RegistrationForm />
        </div>
    </main>
  );
};

export default RegistrationPage;