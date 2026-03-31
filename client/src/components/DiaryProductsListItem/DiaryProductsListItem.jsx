import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../redux/diary/diaryOperations';
import styles from './DiaryProductsListItem.module.css';

const DiaryProductsListItem = ({ id, title, weight, calories }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    dispatch(removeProduct(id))
      .unwrap()
      .catch(() => setIsRemoving(false));
  };

  return (
    <li className={styles.item}>
      <span className={styles.name}>{title}</span>
      <span className={styles.weight}>{weight} g</span>
      <span className={styles.calories}>{Math.round(calories)} kcal</span>
      <button
        className={styles.deleteBtn}
        onClick={handleRemove}
        disabled={isRemoving}
        aria-label="Remove product"
      >
        ✕
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
