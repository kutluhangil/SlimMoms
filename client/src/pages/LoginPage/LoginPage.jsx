import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';
import fruits from '../MainPage/MainPage.module.css';

const LoginPage = () => {
  return (
    <main className={styles.page}>
      <div className={fruits.layer4} aria-hidden="true" />
      <div className={fruits.layer1} aria-hidden="true" />
      <div className={fruits.layer2} aria-hidden="true" />
      <div className={fruits.layer3} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>Log in</h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
