import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { calculateDailyCalories } from '../../redux/calculator/calculatorOperations';
import styles from './CalculatorCalorieForm.module.css';

const validate = ({ height, currentWeight, age, desiredWeight, bloodType }) => {
  const errors = {};
  if (!height) errors.height = 'Height is required';
  else if (isNaN(height) || +height < 100 || +height > 250)
    errors.height = 'Enter a valid height (100–250 cm)';
  if (!currentWeight) errors.currentWeight = 'Current weight is required';
  else if (isNaN(currentWeight) || +currentWeight < 20 || +currentWeight > 500)
    errors.currentWeight = 'Enter a valid current weight (20–500 kg)';
  if (!age) errors.age = 'Age is required';
  else if (isNaN(age) || +age < 10 || +age > 120)
    errors.age = 'Enter a valid age (10–120)';
  if (!desiredWeight) errors.desiredWeight = 'Desired weight is required';
  else if (isNaN(desiredWeight) || +desiredWeight < 20 || +desiredWeight > 500)
    errors.desiredWeight = 'Enter a valid desired weight';
  if (!bloodType) errors.bloodType = 'Blood type is required';
  return errors;
};

const BLOOD_TYPES = [1, 2, 3, 4];

const CalculatorCalorieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [fields, setFields] = useState({
    height: '',
    currentWeight: '',
    age: '',
    desiredWeight: '',
    bloodType: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate(fields);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    await dispatch(
      calculateDailyCalories({
        height: +fields.height,
        currentWeight: +fields.currentWeight,
        age: +fields.age,
        desiredWeight: +fields.desiredWeight,
        bloodType: +fields.bloodType,
      })
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.column}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="height">Height (cm) *</label>
          <input
            className={`${styles.input} ${errors.height ? styles.inputError : ''}`}
            type="number"
            id="height"
            name="height"
            value={fields.height}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.height && <span className={styles.error}>{errors.height}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="age">Age *</label>
          <input
            className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
            type="number"
            id="age"
            name="age"
            value={fields.age}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="currentWeight">Current weight (kg) *</label>
          <input
            className={`${styles.input} ${errors.currentWeight ? styles.inputError : ''}`}
            type="number"
            id="currentWeight"
            name="currentWeight"
            value={fields.currentWeight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.currentWeight && <span className={styles.error}>{errors.currentWeight}</span>}
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="desiredWeight">Desired weight (kg) *</label>
          <input
            className={`${styles.input} ${errors.desiredWeight ? styles.inputError : ''}`}
            type="number"
            id="desiredWeight"
            name="desiredWeight"
            value={fields.desiredWeight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.desiredWeight && <span className={styles.error}>{errors.desiredWeight}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <span className={`${styles.bloodTypeLabel} ${errors.bloodType ? styles.bloodTypeLabelError : ''}`}>
            Blood type *
          </span>
          <div className={styles.bloodTypeGroup}>
            {BLOOD_TYPES.map((type) => (
              <label key={type} className={styles.radioLabel}>
                <div className={styles.radioWrapper}>
                  <input
                    type="radio"
                    name="bloodType"
                    value={type}
                    checked={Number(fields.bloodType) === type}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  {type}
                </div>
              </label>
            ))}
          </div>
          {errors.bloodType && <span className={styles.error}>{errors.bloodType}</span>}
        </div>
      </div>

      <button type="submit" className={styles.btn} disabled={isLoading}>
        Start losing weight
      </button>
    </form>
  );
};

export default CalculatorCalorieForm;
