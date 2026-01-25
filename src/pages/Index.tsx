import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import WorkHistory from '@/components/WorkHistory/WorkHistory';
import Blog from '@/components/Blog/Blog';
import Footer from '@/components/Footer/Footer';

const Index = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <About />
        <WorkHistory />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
