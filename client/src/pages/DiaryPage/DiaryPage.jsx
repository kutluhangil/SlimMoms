import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiary } from '../../redux/diary/diaryOperations';
import { setDate } from '../../redux/diary/diarySlice';
import DiaryDateCalendar from '../../components/DiaryDateCalendar/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import Loader from '../../components/Loader/Loader';
import styles from './DiaryPage.module.css';

const DiaryPage = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.diary.date);
  const isLoading = useSelector((state) => state.diary.isLoading);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    dispatch(setDate(today));
  }, [dispatch]);

  useEffect(() => {
    if (date) {
      dispatch(fetchDiary(date));
    }
  }, [date, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.decorDesktop} aria-hidden="true" />
      <div className={styles.main}>
        <DiaryDateCalendar />
        <DiaryAddProductForm />
        <DiaryProductsList />
      </div>
      <RightSideBar />
    </div>
  );
};

export default DiaryPage;
