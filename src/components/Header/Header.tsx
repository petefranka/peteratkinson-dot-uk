import './Header.css';
import avatar from '@/assets/avatar.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo">
          <img src={avatar} alt="Peter Atkinson" className="header__logo-img" />
        </a>
        <nav className="header__nav">
          <a href="#about-tabs" className="header__link">Projects</a>
          <a href="#about" className="header__link">About</a>
          <a href="#contact" className="header__link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
