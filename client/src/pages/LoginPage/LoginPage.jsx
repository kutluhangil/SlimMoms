import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <main className={styles.page}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Log in
          </h1>
          <LoginForm />
        </div>
    </main>
  );
};

export default LoginPage;