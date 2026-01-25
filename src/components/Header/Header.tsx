import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <a href="#about" className="header__link">About</a>
        <a href="#work" className="header__link">Work</a>
        <a href="#blog" className="header__link">Blog</a>
        <a href="mailto:hello@pete.com" className="header__link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
