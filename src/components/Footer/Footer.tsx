import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <span className="footer__name">Pete</span>
          <span className="footer__copyright">© {new Date().getFullYear()}</span>
        </div>
        <div className="footer__links">
          <a href="mailto:hello@pete.com" className="footer__link">Email</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__link">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
