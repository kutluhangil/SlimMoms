// DiaryAddProductForm.jsx
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/diary/diaryOperations'; // ✅ Operations'tan import
import { showLoader, hideLoader } from '../../redux/loader/loaderSlice';
import styles from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [grams, setGrams] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  const handleProductChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        fetch(`/api/products?search=${value}`)
          .then((res) => res.json())
          .then((data) => setSuggestions(data))
          .catch(() => setSuggestions([]));
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSelectSuggestion = (item) => {
    setProductName(item.title);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!productName || !grams || grams <= 0) {
      setError('Please enter valid product name and grams');
      return;
    }

    try {
      dispatch(showLoader());
      await dispatch(addProduct({ productName, grams: Number(grams) })).unwrap();

      setProductName('');
      setGrams('');
      setSuggestions([]);
    } catch {
      setError('Failed to add product');
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={inputRef}>
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          className={styles.input}
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={handleProductChange}
          onFocus={() => setShowDropdown(true)}
        />
        {showDropdown && suggestions.length > 0 && (
          <div className={styles.dropdown}>
            {suggestions.map((item) => (
              <div
                key={item.id}
                className={styles.dropdownItem}
                onClick={() => handleSelectSuggestion(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        className={styles.inputSmall}
        type="number"
        placeholder="Grams"
        value={grams}
        min="1"
        onChange={(e) => setGrams(e.target.value)}
      />

      <button className={styles.btn} type="submit">
        +
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default DiaryAddProductForm;
