
import React, { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurEssence from '@/components/OurEssence';
import Products from '@/components/Products';
import WhyDega from '@/components/WhyDega';
import Sustainability from '@/components/Sustainability';
import ContactUs from '@/components/ContactUs';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  
  useEffect(() => {
    // Set initial visibility after a short delay
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    // Handle scrolling
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
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
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleAnchorLinkClick);
    
    // Initialize sections for intersection observer
    const sectionIds = ['our-essence', 'products', 'why-dega', 'sustainability', 'contact-us'];
    sectionsRef.current = sectionIds.map(id => document.getElementById(id));
    
    // Set up intersection observer for sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    sectionsRef.current.forEach(section => {
      if (section) {
        section.classList.add('opacity-0');
        sectionObserver.observe(section);
      }
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorLinkClick);
      sectionsRef.current.forEach(section => {
        if (section) sectionObserver.unobserve(section);
      });
    };
  }, []);
  
  // Handle scroll down from hero
  const scrollToNextSection = () => {
    const firstSection = document.getElementById('our-essence');
    if (firstSection) {
      window.scrollTo({
        top: firstSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      {/* Hero section with scroll indicator */}
      <Hero />
      <div 
        className={`absolute left-1/2 bottom-10 transform -translate-x-1/2 z-20 cursor-pointer transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2 font-light">Dive In</span>
          <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm animate-bounce">
            <ChevronDown className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
      
      {/* Parallax sections with water line transitions */}
      <div className="relative">
        {/* Water flowing line transition */}
        <div 
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-dega-blue to-transparent"
          style={{ 
            top: '0px',
            transform: `translateY(${Math.min(scrollY * 0.5, 100)}px)`,
            opacity: Math.min(scrollY * 0.005, 0.6),
            filter: 'blur(1px)'
          }}
        />
        
        <OurEssence />
        
        {/* Water flowing line transition */}
        <div 
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-dega-blue via-transparent to-dega-blue"
          style={{ 
            top: '50%',
            transform: `translateY(${Math.min(scrollY * 0.2, 50)}px) scaleX(${Math.min(1 + scrollY * 0.001, 1.2)})`,
            opacity: Math.min(scrollY * 0.002, 0.5),
            filter: 'blur(2px)'
          }}
        />
        
        <Products />
        <WhyDega />
        
        {/* Water flowing line transition */}
        <div 
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-dega-blue/50 to-transparent"
          style={{ 
            bottom: '30%',
            transform: `translateY(${Math.min(scrollY * 0.1, 30)}px) rotate(${Math.min(scrollY * 0.01, 3)}deg)`,
            opacity: Math.min(scrollY * 0.003, 0.7),
            filter: 'blur(1px)'
          }}
        />
        
        <Sustainability />
        <ContactUs />
        <Newsletter />
        <Footer />
      </div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-dega-blue/10 floating"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: 'blur(8px)'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Index;
