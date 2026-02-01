import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import AboutTabs from '@/components/AboutTabs/AboutTabs';
import Blog from '@/components/Blog/Blog';
import Footer from '@/components/Footer/Footer';

const Index = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <AboutTabs />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
