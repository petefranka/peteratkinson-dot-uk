import './Hero.css';
import petePortrait from '@/assets/pete-portrait.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container container">
        <div className="hero__image-wrapper">
          <img 
            src={petePortrait} 
            alt="Pete - Portrait" 
            className="hero__image"
          />
        </div>
        <div className="hero__content">
          <h1 className="hero__title">
            I'm Pete, a creative who loves building things that matter.
          </h1>
          <p className="hero__intro">
            Welcome to my corner of the internet. I spend my days crafting digital 
            experiences, exploring new ideas, and connecting with people who share 
            a passion for thoughtful work. When I'm not at my desk, you'll find me 
            with a good book, on a trail somewhere, or experimenting in the kitchen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
