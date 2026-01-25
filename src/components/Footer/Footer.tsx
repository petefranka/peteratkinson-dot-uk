import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__left">
            <div className="footer__contact">
              <span className="footer__label">Contact:</span>
              <a href="mailto:peter@peteratkinson.co.uk" className="footer__link">peter@peteratkinson.co.uk</a>
            </div>
            <div className="footer__socials">
              <span>
                Connect with me on{' '}
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                  LinkedIn →
                </a>
              </span>
              <span>
                Checkout my{' '}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                  Instagram →
                </a>
              </span>
            </div>
          </div>
          <div className="footer__right">
            <span className="footer__made-with">Made with ❤️ in Yorkshire</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
