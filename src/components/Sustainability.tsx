
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Sustainability: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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

  return (
    <section 
      id="sustainability" 
      className="relative overflow-hidden"
    >
      {/* Parallax background */}
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-bg"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
          filter: 'brightness(0.7)',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
      
      <div className="relative z-10 section-padding">
        <div 
          ref={sectionRef}
          className="container mx-auto"
        >
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-light text-white mb-4">
              Our <span className="font-semibold">Sustainability</span> Promise
            </h2>
            <p className="text-gray-200">
              At Dega, our commitment extends beyond exceptional water. We're dedicated to preserving the very sources that make our product possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Source Protection',
                description: 'We maintain and protect over 5,000 acres of watershed lands, ensuring the purity of our water sources for generations to come.',
              },
              {
                title: 'Packaging Innovation',
                description: 'By 2026, all Dega bottles will be made from 100% recycled or renewable materials, reducing our plastic footprint by 75%.',
              },
              {
                title: 'Carbon Neutrality',
                description: 'Our operations are on track to become carbon neutral by 2024, with investments in renewable energy and carbon offset projects.',
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`glass-card p-8 transition-all duration-1000 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-xl font-montserrat font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-200">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div 
            className={`mt-16 text-center transition-all duration-1000 delay-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button 
              className="bg-white hover:bg-white/90 text-dega-blue btn-ripple"
              size="lg"
            >
              Learn More About Our Efforts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
