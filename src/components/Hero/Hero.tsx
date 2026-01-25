import './Hero.css';
import petePortrait from '@/assets/pete-portrait.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__coords">36.1627° N, 86.7816° W</p>
        <p className="hero__tagline">DESIGN / PHOTO / CODE / MUSIC</p>
        
        <div className="hero__name-image">
          <h1 className="hero__name">
            <span className="hero__name-line">PETE</span>
          </h1>
          <div className="hero__image-container">
            <img 
              src={petePortrait} 
              alt="Pete" 
              className="hero__image"
            />
          </div>
        </div>
      </div>
      
      {/* Scrolling Marquee */}
      <div className="hero__marquee-section">
        <div className="hero__marquee hero__marquee--ltr">
          <div className="hero__marquee-content">
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
          </div>
        </div>
        <div className="hero__marquee hero__marquee--rtl">
          <div className="hero__marquee-content hero__marquee-content--reverse">
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
          </div>
        </div>
        <div className="hero__marquee hero__marquee--ltr">
          <div className="hero__marquee-content">
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
            <span>DESIGN / PHOTO / MUSIC / HELLO@PETE.COM / </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
