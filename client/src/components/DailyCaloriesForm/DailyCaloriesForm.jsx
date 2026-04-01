import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateDailyCalories } from '../../redux/calculator/calculatorOperations';
import { setLocalResult } from '../../redux/calculator/calculatorSlice';
import { showLoader, hideLoader } from '../../redux/loader/loaderSlice';
import styles from './DailyCaloriesForm.module.css';

const initialState = {
  height: '',
  desiredWeight: '',
  age: '',
  weight: '',
  bloodType: '',
};

const DailyCaloriesForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const fields = ['height', 'desiredWeight', 'age', 'weight', 'bloodType'];

    fields.forEach((field) => {
      const value = form[field];
      if (!value && value !== 0) {
        newErrors[field] = 'This field is required';
        return;
      }
      if (field !== 'bloodType') {
        const num = Number(value);
        if (isNaN(num) || num <= 0) {
          newErrors[field] = 'Must be a positive number';
        }
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = {
      height: Number(form.height),
      desiredWeight: Number(form.desiredWeight),
      age: Number(form.age),
      weight: Number(form.weight),
      bloodType: Number(form.bloodType),
    };

    if (!isLoggedIn) {
      const dailyCalories =
        10 * formData.weight +
        6.25 * formData.height -
        5 * formData.age -
        161 -
        10 * (formData.weight - formData.desiredWeight);

      dispatch(
        setLocalResult({
          dailyCalories: Math.round(dailyCalories),
          notRecommended: [],
        })
      );

      onSuccess();
      return;
    }

    dispatch(showLoader());

    try {
      await dispatch(calculateDailyCalories(formData)).unwrap();
      onSuccess();
    } catch (error) {
      console.error('Error calculating daily calories', error);
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.column}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="height">
            Height (cm) *
          </label>
          <input
            className={`${styles.input} ${errors.height ? styles.inputError : ''}`}
            type="number"
            id="height"
            name="height"
            value={form.height}
            onChange={handleChange}
          />
          {errors.height && (
            <span className={styles.error}>{errors.height}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="age">
            Age *
          </label>
          <input
            className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
            type="number"
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="weight">
            Current weight (kg) *
          </label>
          <input
            className={`${styles.input} ${errors.weight ? styles.inputError : ''}`}
            type="number"
            id="weight"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
          {errors.weight && (
            <span className={styles.error}>{errors.weight}</span>
          )}
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="desiredWeight">
            Desired weight (kg) *
          </label>
          <input
            className={`${styles.input} ${errors.desiredWeight ? styles.inputError : ''}`}
            type="number"
            id="desiredWeight"
            name="desiredWeight"
            value={form.desiredWeight}
            onChange={handleChange}
          />
          {errors.desiredWeight && (
            <span className={styles.error}>{errors.desiredWeight}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <span
            className={`${styles.bloodTypeLabel} ${errors.bloodType ? styles.bloodTypeLabelError : ''}`}
          >
            Blood type *
          </span>
          <div className={styles.bloodTypeGroup}>
            {[1, 2, 3, 4].map((type) => (
              <label key={type} className={styles.radioLabel}>
                <div className={styles.radioWrapper}>
                  <input
                    type="radio"
                    name="bloodType"
                    value={type}
                    checked={Number(form.bloodType) === type}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                {type}
                </div>
              </label>
            ))}
          </div>
          {errors.bloodType && (
            <span className={styles.error}>{errors.bloodType}</span>
          )}
        </div>
      </div>

      <button type="submit" className={styles.btn}>
        Start losing weight
      </button>
    </form>
  );
};

export default DailyCaloriesForm;
