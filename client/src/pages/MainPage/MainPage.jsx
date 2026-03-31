import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import DailyCalorieIntake from '../../components/DailyCalorieIntake/DailyCalorieIntake';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className={styles.page}>
      <div className={styles.layer4} aria-hidden="true" />
      <div className={styles.layer1} aria-hidden="true" />
      <div className={styles.layer2} aria-hidden="true" />
      <div className={styles.layer3} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
        <DailyCaloriesForm onSuccess={handleOpenModal} />
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <DailyCalorieIntake onClose={handleCloseModal} />
        </Modal>
      )}
    </main>
  );
};

export default MainPage;
