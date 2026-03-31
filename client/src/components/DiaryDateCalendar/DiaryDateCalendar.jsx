import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setDate } from '../../redux/diary/diarySlice';
import styles from './DiaryDateCalendar.module.css';

const DiaryDateCalendar = () => {
  const dispatch = useDispatch();
  const dateStr = useSelector((state) => state.diary.date);
  const [isOpen, setIsOpen] = useState(false);

  const selected = dateStr ? new Date(dateStr) : new Date();

  const handleChange = (date) => {
    const formatted = date.toISOString().slice(0, 10);
    dispatch(setDate(formatted));
    setIsOpen(false);
  };

  const formatted = selected.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.relative}>
        <input
          className={styles.input}
          type="text"
          readOnly
          value={formatted}
          onClick={() => setIsOpen((v) => !v)}
        />
        {isOpen && (
          <div className={styles.pickerWrapper}>
            <DatePicker
              selected={selected}
              onChange={handleChange}
              maxDate={new Date()}
              inline
            />
          </div>
        )}
      </div>
      <svg
        className={styles.icon}
        onClick={() => setIsOpen((v) => !v)}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default DiaryDateCalendar;
