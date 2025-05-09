
import React, { useEffect, useRef } from 'react';

const OurEssence: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Create floating bubbles
  const bubbles = Array.from({ length: 15 }).map((_, index) => {
    const size = Math.floor(Math.random() * 60) + 20;
    const positionX = Math.floor(Math.random() * 100);
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    
    return (
      <div 
        key={index}
        className="absolute rounded-full bg-dega-blue/10 backdrop-blur-sm"
        style={{
          width: size,
          height: size,
          left: `${positionX}%`,
          bottom: '-20%',
          animation: `float ${duration}s infinite ease-in-out ${delay}s`,
        }}
      />
    );
  });
  
  return (
    <section 
      id="our-essence" 
      className="relative section-padding bg-gradient-to-b from-dega-blue/5 to-white overflow-hidden"
    >
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles}
      </div>
      
      <div 
        ref={sectionRef}
        className="container mx-auto transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-800 mb-8">
            Our <span className="font-semibold text-dega-blue">Essence</span>
          </h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              At the heart of Dega Water lies a profound belief: water is not merely a necessity, but an experience—a moment of connection with nature's purest creation.
            </p>
            
            <p className="text-lg">
              Born from ancient glaciers and filtered through pristine minerals, our water carries the essence of Earth's most untouched landscapes. Each droplet holds a journey thousands of years in the making.
            </p>
            
            <p className="text-lg">
              We don't simply bottle water—we capture moments of perfect balance, creating harmony between body and nature with every sip.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 relative">
                <div className="absolute inset-0 rounded-full bg-dega-blue/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-dega-blue text-xl font-light">
                  DEGA
                </div>
              </div>
            </div>
            <p className="mt-4 italic text-sm text-gray-500">Purity. Balance. Vitality.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurEssence;
