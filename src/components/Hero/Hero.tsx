import './Hero.css';
import heroImage from '@/assets/hero-image.jpg';
import heroImage2 from '@/assets/hero-image2.jpg';
import heroImage3 from '@/assets/hero-image3.jpg';

const Hero = () => {
  return (
    <section id="about" className="hero">
      <div className="hero__container">
        <div className="hero__image-wrapper">
          <div className="hero__collage">
            <img 
              src={heroImage} 
              alt="Hero image" 
              className="hero__image hero__image--1"
            />
            <img 
              src={heroImage2} 
              alt="Hero image 2" 
              className="hero__image hero__image--2"
            />
            <img 
              src={heroImage3} 
              alt="Hero image 3" 
              className="hero__image hero__image--3"
            />
          </div>
        </div>
        
        <div className="hero__about">
          <p>
            I currently work as a <strong>Staff Engineer</strong>, building a SaaS platform with a focus on reliability and long-term maintainability. Outside of work, I'm into fashion, motorsports, mixed martial arts, and ice hockey, and occasionally trying to brew the perfect cup of coffee.
          </p>
          <p>
            I specialize in modern web technologies and software design, with a strong emphasis on quality and robustness. My background spans software engineering, reliable system design, and building scalable cloud-based applications. I care deeply about how systems behave in the real world, not just how they look on paper, and about how teams work together to make that happen.
          </p>
          <p>
            I believe the best software comes from clear thinking, strong fundamentals, and a willingness to question assumptions early. I take a deliberate approach to software quality, focusing on simplicity, thoughtful trade-offs, and building systems and teams that remain dependable as they grow.
          </p>
          <div className="hero__buttons">
            <a href="#" className="hero__button">View my resume</a>
            <a href="mailto:hello@pete.com" className="hero__button hero__button--secondary">Email me - hello@pete.com</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
