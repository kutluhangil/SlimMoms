import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store, persistor } from './redux/store';

import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';

const AppContent = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Loader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={<PublicRoute component={LoginPage} />}
        />
        <Route
          path="/register"
          element={<PublicRoute component={RegistrationPage} />}
        />
        <Route
          path="/diary"
          element={<PrivateRoute component={DiaryPage} />}
        />
        <Route
          path="/calculator"
          element={<PrivateRoute component={CalculatorPage} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
