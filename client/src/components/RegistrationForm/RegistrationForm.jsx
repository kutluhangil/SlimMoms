import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/authOperations';
import Loader from '../Loader/Loader';
import styles from './RegistrationForm.module.css';

const validateName = (value) => {
  if (!value.trim()) return 'Name is required';
  if (value.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
};

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

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loader.isLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const handleBlur = (field) => {
    const validators = {
      name: () => validateName(name),
      email: () => validateEmail(email),
      password: () => validatePassword(password),
    };
    setErrors((prev) => ({ ...prev, [field]: validators[field]() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ name: nameError, email: emailError, password: passwordError });
    if (nameError || emailError || passwordError) return;

    const result = await dispatch(register({ name, email, password }));

    if (register.fulfilled.match(result)) {
      navigate('/diary');
    }
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className={styles.field}>
          <input
            id="name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            autoComplete="name"
          />
          {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
        </div>

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
            autoComplete="new-password"
          />
          {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button type="submit" className={styles.btnPrimary} disabled={isLoading}>
            Register
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate('/login')}
            disabled={isLoading}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;