import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserInfo from '../UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { pathname } = useLocation();

  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

   const getAuthClass = ({ isActive }) =>
    isActive ? `${styles.authLink} ${styles.authLinkActive}` : styles.authLink;

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* Sol grup: Logo + divider + auth links (logout) */}
        <div className={styles.leftGroup}>
          <Logo isLoggedIn={isLoggedIn} />

          {!isLoggedIn && (
            <>
              <div className={styles.divider} />
              <nav className={styles.authLinks}>
                <NavLink to="/login" className={getAuthClass} end>LOG IN</NavLink>
                <NavLink to="/register" className={getAuthClass} end>REGISTRATION</NavLink>
              </nav>
            </>
          )}
        </div>

        {/* Sağ: Desktop nav (login) */}
        {isLoggedIn && (
          <div className={styles.desktopNav}>
            <Navigation onLinkClick={closeMenu} />
            <div className={styles.divider} />
            <UserInfo />
          </div>
        )}

        {/* Hamburger (her durumda mobilde görünür) */}
        <button
          className={styles.burger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineTop : ''}`} />
          <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineMid : ''}`} />
          <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineBot : ''}`} />
        </button>
      </div>

      {/* Mobil dropdown */}
      {isMenuOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          {isLoggedIn ? (
            <>
              <Navigation onLinkClick={closeMenu} />
              <UserInfo />
            </>
          ) : (
            <nav className={styles.mobileAuthLinks}>
              <NavLink to="/login" className={styles.authLink} onClick={closeMenu}>Log In</NavLink>
              <NavLink to="/register" className={styles.authLink} onClick={closeMenu}>Registration</NavLink>
            </nav>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;