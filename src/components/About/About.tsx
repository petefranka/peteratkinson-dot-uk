import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <h2 className="about__title">About</h2>
        <div className="about__content">
          <p>
            I've always been drawn to the intersection of creativity and 
            technology. There's something magical about taking an idea from 
            a rough sketch to a fully realized product that people actually 
            use and enjoy.
          </p>
          <p>
            My approach is simple: listen carefully, think deeply, and build 
            with intention. I believe the best work comes from genuine curiosity 
            and a willingness to question assumptions.
          </p>
          <p>
            Outside of work, I'm passionate about photography, sustainable living, 
            and the art of a perfectly brewed cup of coffee. I believe in slowing 
            down and finding joy in everyday moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
