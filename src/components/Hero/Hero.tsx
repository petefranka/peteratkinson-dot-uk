'use client';

import './Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__top">
          <h1 className="hero__title">
            Engineer from Yorkshire, building reliable systems and web experiences.
          </h1>
          
          <div className="hero__images">
            <img 
              src="/hero-image.jpg"
              alt="Peter Atkinson" 
              className="hero__image"
            />
            <img 
              src="/hero-image2.jpg"
              alt="Peter Atkinson" 
              className="hero__image"
            />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div id="about" className="hero__about">
            <p>
              I currently work as a <strong>Staff Engineer</strong>, building a SaaS platform with a focus on reliability and long-term maintainability. Outside of work, I'm into fashion, motorsports, mixed martial arts, and ice hockey, and occasionally trying to brew the perfect cup of coffee.
            </p>
            <p>
              I specialize in modern web technologies and software design, with a strong emphasis on quality and robustness. My background spans software engineering, reliable system design, and building scalable cloud-based applications. I care deeply about how systems behave in the real world, not just how they look on paper, and about how teams work together to make that happen.
            </p>
            <p>
              I believe the best software comes from clear thinking, strong fundamentals, and a willingness to question assumptions early. I take a deliberate approach to software quality, focusing on simplicity, thoughtful trade-offs, and building systems and teams that remain dependable as they grow.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
