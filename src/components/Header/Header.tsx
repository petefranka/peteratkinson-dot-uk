'use client';

import './Header.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <img 
            src="/avatar.jpg"
            alt="Peter Atkinson" 
            className="header__logo-img" 
          />
        </Link>
        <nav className="header__nav">
          <a href="#about" className="header__link">About</a>
          <a href="#experience" className="header__link">Experience</a>
          <a href="#blog" className="header__link">Thoughts</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
