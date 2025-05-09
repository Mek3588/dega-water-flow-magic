
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Droplet } from "lucide-react";

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded state after component mounts with a small delay for animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Create water ripples at random positions
  const ripples = Array.from({ length: 5 }).map((_, index) => {
    const size = Math.floor(Math.random() * 200) + 200;
    const top = Math.floor(Math.random() * 80) + 10;
    const left = Math.floor(Math.random() * 80) + 10;
    const delay = Math.random() * 5;
    
    return (
      <div 
        key={index}
        className="water-ripple"
        style={{
          width: size,
          height: size,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-water-pattern bg-cover bg-center bg-no-repeat"
        style={{ filter: 'brightness(0.8)' }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
      
      {/* Water ripple animations */}
      {ripples}
      
      {/* Content */}
      <div className="container relative z-10 px-6 text-center">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Droplet className="h-16 w-16 text-white" />
              <div className="absolute inset-0 rounded-full bg-dega-blue/30 animate-ping" style={{ animationDuration: '3s' }}></div>
            </div>
          </div>
          
          {/* Brand name */}
          <h1 className="font-montserrat font-bold text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white mb-4">
            DEGA WATER
          </h1>
          
          {/* Tagline with staggered animation */}
          <p className="font-montserrat text-xl md:text-2xl text-white/90 mb-8 tracking-wider">
            <span className={`inline-block transition-all duration-1000 delay-300 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>Water,</span>{' '}
            <span className={`inline-block transition-all duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>Reimagined.</span>
          </p>
          
          {/* CTA Button */}
          <div className={`transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button 
              size="lg" 
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white py-6 px-8 rounded-full btn-ripple font-montserrat tracking-wide text-md"
            >
              Discover Purity
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/70 text-sm font-light mb-2">Scroll</span>
        <div className="w-0.5 h-12 bg-white/30 relative">
          <div className="absolute top-0 w-full h-1/3 bg-white animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
