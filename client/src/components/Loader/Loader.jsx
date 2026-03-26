import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';
import styles from './Loader.module.css';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Loader;
