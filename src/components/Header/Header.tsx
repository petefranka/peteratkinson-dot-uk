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
          <a href="#about-tabs" className="header__link">Projects</a>
          <a href="#about" className="header__link">About</a>
          <Link href="/blog" className="header__link">Blog</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
