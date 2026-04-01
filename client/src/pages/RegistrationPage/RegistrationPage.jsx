import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';
import fruits from '../MainPage/MainPage.module.css';

const RegistrationPage = () => {
  return (
    <main className={styles.page}>
      <div className={fruits.layer4} aria-hidden="true" />
      <div className={fruits.layer1} aria-hidden="true" />
      <div className={fruits.layer2} aria-hidden="true" />
      <div className={fruits.layer3} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>Register</h1>
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
