import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import AboutTabs from '@/components/AboutTabs/AboutTabs';
import Blog from '@/components/Blog/Blog';
import Footer from '@/components/Footer/Footer';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <AboutTabs />
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <Blog />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
