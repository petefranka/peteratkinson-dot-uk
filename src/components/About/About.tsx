import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <p>
            I currently work as a <strong>Senior Product Designer</strong>, focusing on 
            creating intuitive interfaces and delightful user experiences. Outside of work, 
            I'm passionate about photography, sustainable living, and the art of a perfectly 
            brewed cup of coffee.
          </p>
          <p>
            I specialize in product design for both web and mobile apps and thrive in 0 → 1 
            work. My expertise is in design leadership, visual design, user experience, and 
            design systems. I also have a background in Engineering, with a focus on React, 
            CSS architecture, and component systems.
          </p>
          <p>
            I'm currently available for full time and contract design roles for early stage 
            startups and creative projects. I believe the best work comes from genuine 
            curiosity and a willingness to question assumptions.
          </p>
        </div>
        
        <div className="about__buttons">
          <a href="#" className="about__button">View my resume</a>
          <a href="mailto:hello@pete.com" className="about__button">Email me - hello@pete.com</a>
        </div>
      </div>
    </section>
  );
};

export default About;
