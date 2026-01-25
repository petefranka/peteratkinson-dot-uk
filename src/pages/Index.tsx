import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Blog from '@/components/Blog/Blog';
import Footer from '@/components/Footer/Footer';

const Index = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
