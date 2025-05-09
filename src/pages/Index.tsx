
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurEssence from '@/components/OurEssence';
import Products from '@/components/Products';
import WhyDega from '@/components/WhyDega';
import Sustainability from '@/components/Sustainability';
import ContactUs from '@/components/ContactUs';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorLinkClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorLinkClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <OurEssence />
      <Products />
      <WhyDega />
      <Sustainability />
      <ContactUs />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
