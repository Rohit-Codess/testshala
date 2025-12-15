import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrendingSection from '../components/TrendingSection';
import PopularStateTests from '../components/PopularStateTests';
import PopularCentralExams from '../components/PopularCentralExams';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="pt-14 sm:pt-16"> 
        <HeroSection />
      </div>
      <TrendingSection />
      <PopularStateTests />
      <PopularCentralExams />
      <FAQ />
      <Footer />
    </>
  );
}

export default HomePage;