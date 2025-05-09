
import React, { useEffect, useState, useRef } from 'react';
import { Circle } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Ultra-Pure Process',
    description: 'Our proprietary 9-step filtration system preserves essential minerals while removing impurities down to the molecular level.',
    icon: (
      <div className="w-14 h-14 rounded-full bg-dega-blue/20 flex items-center justify-center">
        <Circle className="h-6 w-6 text-dega-blue" />
      </div>
    ),
  },
  {
    id: 2,
    title: 'Eco-Friendly Packaging',
    description: 'Our bottles are crafted from sustainable materials, designed to minimize environmental impact without compromising quality.',
    icon: (
      <div className="w-14 h-14 rounded-full bg-dega-blue/20 flex items-center justify-center">
        <Circle className="h-6 w-6 text-dega-blue" />
      </div>
    ),
  },
  {
    id: 3,
    title: 'Balanced Minerals',
    description: 'Each bottle contains the perfect balance of natural minerals that enhance hydration and contribute to overall wellbeing.',
    icon: (
      <div className="w-14 h-14 rounded-full bg-dega-blue/20 flex items-center justify-center">
        <Circle className="h-6 w-6 text-dega-blue" />
      </div>
    ),
  },
];

const WhyDega: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
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
      id="why-dega" 
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(9,137,221,0.05) 0%, rgba(51,195,240,0.1) 100%)"
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -left-10 top-40 w-40 h-40 rounded-full bg-dega-blue opacity-10 blur-3xl"></div>
      <div className="absolute -right-20 bottom-40 w-80 h-80 rounded-full bg-dega-blue opacity-5 blur-3xl"></div>
      
      <div ref={sectionRef} className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-800 mb-4">
            Why <span className="font-semibold text-dega-blue">Dega</span>?
          </h2>
          <p className="max-w-xl mx-auto text-gray-600">
            Beyond ordinary hydration, Dega Water represents a commitment to excellence in every drop.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 transform transition-transform duration-500 hover:rotate-12 hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div 
          className={`mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { label: 'Natural pH Level', value: '7.8' },
            { label: 'Years of Perfection', value: '25+' },
            { label: 'Satisfied Customers', value: 'Millions' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-light text-dega-blue mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDega;
