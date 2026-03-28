import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateDailyCalories } from '../../redux/calculator/calculatorOperations';
import Loader from '../Loader/Loader';
import styles from './CalculatorCalorieForm.module.css';

const validate = ({ height, weight, age, desiredWeight, bloodType }) => {
  const errors = {};

  if (!height) errors.height = 'Height is required';
  else if (isNaN(height) || +height < 100 || +height > 250)
    errors.height = 'Enter a valid height (100–250 cm)';

  if (!weight) errors.weight = 'Weight is required';
  else if (isNaN(weight) || +weight < 20 || +weight > 500)
    errors.weight = 'Enter a valid weight (20–500 kg)';

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
  const isLoading = useSelector((state) => state.loader.isLoading);

  const [fields, setFields] = useState({
    height: '',
    weight: '',
    age: '',
    desiredWeight: '',
    bloodType: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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

    dispatch(
      calculateDailyCalories({
        height: +fields.height,
        weight: +fields.weight,
        age: +fields.age,
        desiredWeight: +fields.desiredWeight,
        bloodType: +fields.bloodType,
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>
          {/* Height */}
          <div className={styles.field}>
            <input
              type="number"
              name="height"
              className={`${styles.input} ${errors.height ? styles.inputError : ''}`}
              placeholder="Height (cm) *"
              value={fields.height}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.height && <span className={styles.errorMsg}>{errors.height}</span>}
          </div>

          {/* Desired weight */}
          <div className={styles.field}>
            <input
              type="number"
              name="desiredWeight"
              className={`${styles.input} ${errors.desiredWeight ? styles.inputError : ''}`}
              placeholder="Desired weight (kg) *"
              value={fields.desiredWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.desiredWeight && (
              <span className={styles.errorMsg}>{errors.desiredWeight}</span>
            )}
          </div>

          {/* Age */}
          <div className={styles.field}>
            <input
              type="number"
              name="age"
              className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
              placeholder="Age *"
              value={fields.age}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.age && <span className={styles.errorMsg}>{errors.age}</span>}
          </div>

          {/* Blood type */}
          <div className={styles.field}>
            <p className={styles.bloodLabel}>Blood type *</p>
            <div className={styles.radioGroup}>
              {BLOOD_TYPES.map((type) => (
                <label key={type} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="bloodType"
                    value={type}
                    checked={fields.bloodType === String(type)}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom} />
                  {type}
                </label>
              ))}
            </div>
            {errors.bloodType && (
              <span className={styles.errorMsg}>{errors.bloodType}</span>
            )}
          </div>

          {/* Weight */}
          <div className={styles.field}>
            <input
              type="number"
              name="weight"
              className={`${styles.input} ${errors.weight ? styles.inputError : ''}`}
              placeholder="Weight (kg) *"
              value={fields.weight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.weight && <span className={styles.errorMsg}>{errors.weight}</span>}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          Start losing weight
        </button>
      </form>
    </div>
  );
};

export default CalculatorCalorieForm;