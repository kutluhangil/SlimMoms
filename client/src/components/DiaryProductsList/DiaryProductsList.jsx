import { useSelector } from 'react-redux';
import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = () => {
  const products = useSelector((state) => state.diary.products);

  if (!products || products.length === 0) {
    return <p className={styles.empty}>No products added yet</p>;
  }

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <DiaryProductsListItem
          key={product._id}
          id={product._id}
          title={product.title}
          weight={product.weight}
          calories={product.calories}
        />
      ))}
    </ul>
  );
};

export default DiaryProductsList;
