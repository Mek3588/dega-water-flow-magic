
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 shadow-md backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Droplet className={`h-8 w-8 ${scrolled ? 'text-dega-blue' : 'text-white'}`} />
          <span className={`font-montserrat font-bold text-2xl ${scrolled ? 'text-dega-blue' : 'text-white'}`}>
            DEGA
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Products', 'Why Dega', 'Sustainability', 'Our Story', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`font-montserrat text-sm tracking-wide hover:text-dega-blue transition-colors ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {item}
            </a>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className={`btn-ripple ml-2 border-2 ${
              scrolled ? 'border-dega-blue text-dega-blue hover:bg-dega-blue/10' : 'border-white text-white hover:bg-white/10'
            }`}
          >
            Shop Now
          </Button>
        </nav>

        <button 
          className="md:hidden text-dega-blue"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md">
          <div className="flex justify-end p-4">
            <button onClick={() => setMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-dega-blue">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
            {['Home', 'Products', 'Why Dega', 'Sustainability', 'Our Story', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="font-montserrat text-xl text-dega-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="btn-ripple mt-4 bg-dega-blue text-white hover:bg-dega-blue/90">
              Shop Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
