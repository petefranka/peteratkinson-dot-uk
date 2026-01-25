import './Header.css';
import Logo from '@/assets/logo.svg?react';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo">
          <Logo className="header__logo-img" />
        </a>
      </div>
    </header>
  );
};

export default Header;
