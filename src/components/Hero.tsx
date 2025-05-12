
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Droplet } from "lucide-react";

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Set loaded state after component mounts with a small delay for animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    // Attempt to play video if available
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlayingVideo(true))
          .catch(error => {
            // Auto-play was prevented, provide a fallback
            console.log("Video autoplay was prevented:", error);
          });
      }
    }
    
    return () => clearTimeout(timer);
  }, []);
  
  // Create water ripples at random positions
  const ripples = Array.from({ length: 6 }).map((_, index) => {
    const size = Math.floor(Math.random() * 300) + 200;
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
      {/* Video background with fallback image */}
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: playingVideo ? 0.8 : 0 }}
        >
          <source src="https://cdn.gpteng.co/videos/flowing-water.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback background image */}
        <div 
          className={`absolute inset-0 bg-water-pattern bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${playingVideo ? 'opacity-0' : 'opacity-100'}`}
          style={{ filter: 'brightness(0.7)' }}
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
      
      {/* Water ripple animations */}
      {ripples}
      
      {/* Content */}
      <div className="container relative z-10 px-6 text-center">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          {/* Logo with shimmer effect */}
          <div className="flex items-center justify-center mb-6 relative">
            <div className="relative">
              <Droplet className="h-16 w-16 text-white" />
              <div className="absolute inset-0 rounded-full bg-dega-blue/30 animate-ping" style={{ animationDuration: '3s' }}></div>
              
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" 
                style={{
                  transform: 'rotate(-35deg) translateX(-100%)',
                  animation: 'shimmer 3s infinite',
                  animationDelay: '1s'
                }}
              />
            </div>
          </div>
          
          {/* Brand name */}
          <h1 className="font-montserrat font-bold text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white mb-4">
            <span className="relative">
              DEGA
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></span>
            </span>{' '}
            <span className="text-dega-blue">WATER</span>
          </h1>
          
          {/* Tagline with staggered animation */}
          <div className="mb-8">
            <p className="font-montserrat text-xl md:text-2xl text-white/90 tracking-wider mb-2">
              <span className={`inline-block transition-all duration-1000 delay-300 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>Water,</span>{' '}
              <span className={`inline-block transition-all duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>Reimagined.</span>
            </p>
            <p className={`transition-all duration-1000 delay-700 font-light text-white/70 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              The purest expression of nature's elegance
            </p>
          </div>
          
          {/* CTA Button */}
          <div className={`transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button 
              size="lg" 
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white py-6 px-8 rounded-full btn-ripple font-montserrat tracking-wide text-md"
              onClick={() => {
                const firstSection = document.getElementById('our-essence');
                if (firstSection) {
                  window.scrollTo({
                    top: firstSection.offsetTop - 80,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Dive In
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay texture */}
      <div className="absolute inset-0 bg-[url('https://cdn.gpteng.co/textures/noise.png')] opacity-5 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
