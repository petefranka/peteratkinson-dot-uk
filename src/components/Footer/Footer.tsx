import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer__container container">
        <p className="footer__copyright">
          © {currentYear} Pete. All rights reserved.
        </p>
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
