import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logIn } from '../../redux/auth/authOperations';
import Loader from '../Loader/Loader';
import styles from './LoginForm.module.css';

const validateEmail = (value) => {
  if (!value.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
  return '';
};

const validatePassword = (value) => {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return '';
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loader.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleBlur = (field) => {
    const validators = {
      email: () => validateEmail(email),
      password: () => validatePassword(password),
    };
    setErrors((prev) => ({ ...prev, [field]: validators[field]() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    const result = await dispatch(logIn({ email, password }));

    if (logIn.fulfilled.match(result)) {
      navigate('/diary');
    }
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className={styles.field}>
          <input
            id="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            autoComplete="email"
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <input
            id="password"
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            autoComplete="current-password"
          />
          {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button type="submit" className={styles.btnPrimary} disabled={isLoading}>
            Log In
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate('/register')}
            disabled={isLoading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;