
import React, { useRef, useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Droplet, Waves, GlassWater } from "lucide-react";

const ProductDeepDive: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(33);
  const [activeSection, setActiveSection] = useState<'source' | 'process' | 'sustainability'>('source');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  useEffect(() => {
    if (sliderValue <= 33) {
      setActiveSection('source');
    } else if (sliderValue <= 66) {
      setActiveSection('process');
    } else {
      setActiveSection('sustainability');
    }
  }, [sliderValue]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  const sectionContent = {
    source: {
      title: "The Source",
      description: "Nestled within protected natural reserves, Dega Water originates from pristine alpine springs fed by ancient glaciers. The water flows naturally through layers of mineral-rich bedrock, acquiring its distinctive character and purity.",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      icon: <Droplet size={24} />,
      stats: [
        { label: "Depth", value: "320m" },
        { label: "Protected Area", value: "12,400 hectares" },
        { label: "Age", value: "8,200+ years" },
      ]
    },
    process: {
      title: "Our Process",
      description: "Our proprietary hydro-harmonization process enhances the molecular structure of water without disturbing its natural state. Each bottle undergoes a 9-stage purification that maintains the perfect balance between mineral content and pristine taste.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      icon: <GlassWater size={24} />,
      stats: [
        { label: "Filtration Stages", value: "9" },
        { label: "Quality Tests", value: "137" },
        { label: "Purity Level", value: "99.9%" },
      ]
    },
    sustainability: {
      title: "Sustainability",
      description: "Our bottles are crafted from 100% recycled glass, designed for multiple reuse cycles. For every liter produced, Dega Water conserves and protects 10 liters of natural water resources through our global partnership with water conservation initiatives.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      icon: <Waves size={24} />,
      stats: [
        { label: "Recycled Glass", value: "100%" },
        { label: "Carbon Neutral", value: "Since 2022" },
        { label: "Water Protected", value: "10L per 1L sold" },
      ]
    }
  };

  const content = sectionContent[activeSection];

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-dega-blue/5 to-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-montserrat font-light text-gray-800 mb-4">
            The <span className="font-semibold text-dega-blue">Dega</span> Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the journey behind every Dega bottle, from source to sustainability.
          </p>
          
          {/* Exploration Slider */}
          <div className="max-w-xl mx-auto mt-10">
            <Slider
              value={[sliderValue]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="py-4"
            />
            
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span className={activeSection === 'source' ? 'text-dega-blue font-semibold' : ''}>Source</span>
              <span className={activeSection === 'process' ? 'text-dega-blue font-semibold' : ''}>Process</span>
              <span className={activeSection === 'sustainability' ? 'text-dega-blue font-semibold' : ''}>Sustainability</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Section */}
          <div 
            className={`relative aspect-ratio overflow-hidden rounded-lg shadow-xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img 
              src={content.image} 
              alt={content.title} 
              className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105"
              style={{ height: "500px" }}
            />
            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md text-white py-2 px-4 rounded-full flex items-center z-20">
              {content.icon}
              <span className="ml-2 font-semibold">{content.title}</span>
            </div>
          </div>
          
          {/* Content Section */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="flex items-center mb-4">
              {content.icon}
              <h3 className="text-2xl md:text-3xl font-montserrat font-semibold text-dega-blue ml-2">
                {content.title}
              </h3>
            </div>
            
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {content.description}
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="bg-dega-blue/5 p-4 rounded-lg text-center">
                  <div className="text-2xl font-semibold text-dega-blue">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pl-4 border-l-4 border-dega-blue/20">
              <p className="text-gray-500 italic">
                {activeSection === 'source' && "Every drop carries the essence of its pristine origin."}
                {activeSection === 'process' && "A perfect balance of science and nature in every sip."}
                {activeSection === 'sustainability' && "Luxury with responsibility, for the planet and future generations."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDeepDive;
