import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <a href="/" className="header__name">Pete</a>
        <nav className="header__nav">
          <a href="#about" className="header__link">About</a>
          <a href="#work" className="header__link">Work</a>
          <a href="#blog" className="header__link">Blog</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
