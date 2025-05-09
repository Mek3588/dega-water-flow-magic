
import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductShowcase from '@/components/ProductShowcase';
import ProductDeepDive from '@/components/ProductDeepDive';
import { Droplet, Waves } from 'lucide-react';

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Add ripple effect on load
    const createRipple = () => {
      if (!introRef.current) return;
      const ripple = document.createElement('div');
      ripple.classList.add('water-ripple', 'w-full', 'h-full', 'opacity-0');
      introRef.current.appendChild(ripple);
      
      setTimeout(() => {
        ripple.classList.remove('opacity-0');
        ripple.classList.add('opacity-100', 'scale-100');
        
        setTimeout(() => {
          ripple.classList.add('opacity-0');
          setTimeout(() => ripple.remove(), 1000);
        }, 1500);
      }, 100);
    };
    
    setTimeout(createRipple, 300);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Intro Section with animated water background */}
      <section 
        ref={introRef}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-dega-blue/30 to-dega-blue/5"
      >
        {/* Animated water background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full bg-white/10 backdrop-blur-sm floating`}
            style={{
              width: `${Math.random() * 6 + 2}rem`,
              height: `${Math.random() * 6 + 2}rem`,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 70 + 5}%`,
              animationDuration: `${Math.random() * 8 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
        
        <div className="container mx-auto px-4 relative z-10">
          <div 
            className={`text-center max-w-3xl mx-auto transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <Droplet className="text-dega-blue mr-3" size={32} />
              <Waves className="text-dega-blue/70" size={40} />
              <Droplet className="text-dega-blue ml-3" size={32} />
            </div>
            <h1 className="font-montserrat text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6">
              Our <span className="font-semibold text-dega-blue">Essence</span>, Bottled
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore the purity and elegance of each Dega Water variant, crafted to elevate 
              your hydration experience through uncompromising quality and design.
            </p>
          </div>
        </div>
      </section>
      
      {/* Product Showcase - Horizontal Carousel */}
      <ProductShowcase />
      
      {/* Deep Dive Section */}
      <ProductDeepDive />
      
      {/* Quote Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-water-pattern bg-fixed bg-cover bg-center">
        <div className="absolute inset-0 bg-dega-blue/40 backdrop-blur-sm"></div>
        
        <div 
          className="container mx-auto px-4 relative z-10 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out',
            transitionDelay: '0.3s'
          }}
        >
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-white font-montserrat italic max-w-4xl mx-auto leading-tight">
            "Not all water is created equal.
            <span className="block mt-2 not-italic font-semibold">Dega is water, redefined."</span>
          </blockquote>
        </div>
      </section>
      
      {/* Navigation Callout */}
      <section className="py-20 bg-gradient-to-b from-white to-dega-blue/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a 
              href="/essence" 
              className="group relative px-8 py-4 bg-transparent border border-dega-blue text-dega-blue rounded-md overflow-hidden transition-all hover:text-white"
            >
              <span className="absolute inset-0 w-0 bg-dega-blue transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative font-medium">Learn About Our Story</span>
            </a>
            
            <a 
              href="/process" 
              className="group relative px-8 py-4 bg-transparent border border-dega-blue text-dega-blue rounded-md overflow-hidden transition-all hover:text-white"
            >
              <span className="absolute inset-0 w-0 bg-dega-blue transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative font-medium">Discover Our Process</span>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
