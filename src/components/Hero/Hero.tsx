import './Hero.css';
import petePortrait from '@/assets/pete-portrait.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__tagline">CREATIVE / DESIGN / CODE</p>
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
      <p className="hero__intro">
        Welcome to my corner of the internet. I'm a creative who loves 
        building things that matter — crafting digital experiences, 
        exploring ideas, and connecting with people who share a passion 
        for thoughtful work.
      </p>
    </section>
  );
};

export default Hero;
