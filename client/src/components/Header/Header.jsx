import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserInfo from '../UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const { pathname } = useLocation();

  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleMouseDown = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    burgerRef.current?.focus();
  };

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
                <NavLink to="/login" className={getAuthClass} end>
                  LOG IN
                </NavLink>
                <NavLink to="/register" className={getAuthClass} end>
                  REGISTRATION
                </NavLink>
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
          ref={burgerRef}
          className={styles.burger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineTop : ''}`}
          />
          <span
            className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineMid : ''}`}
          />
          <span
            className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineBot : ''}`}
          />
        </button>
      </div>

      {/* Mobil dropdown */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className={styles.mobileMenu}
          ref={menuRef}
          aria-label="Mobile navigation"
          tabIndex="-1"
        >
          {isLoggedIn ? (
            <>
              <Navigation onLinkClick={closeMenu} />
              <UserInfo />
            </>
          ) : (
            <div className={styles.mobileAuthLinks}>
              <NavLink
                to="/login"
                className={styles.authLink}
                onClick={closeMenu}
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className={styles.authLink}
                onClick={closeMenu}
              >
                Registration
              </NavLink>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
