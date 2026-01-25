import './Header.css';
import logo from '@/assets/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo">
          <img src={logo} alt="Logo" className="header__logo-img" />
        </a>
      </div>
    </header>
  );
};

export default Header;
