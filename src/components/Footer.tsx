
import React from 'react';
import { Droplet } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and about */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="h-6 w-6 text-dega-blue" />
              <span className="font-montserrat font-bold text-xl text-white">DEGA</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium water sourced from pristine alpine springs, 
              delivered with a commitment to quality and sustainability.
            </p>
            <div className="mt-6 flex space-x-4">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-dega-blue transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'Why Dega', 'Sustainability', 'Our Story', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2">
              {['Dega Pure', 'Dega Effervescent', 'Dega Mineral Plus', 'Dega Essence', 'Limited Editions'].map((item) => (
                <li key={item}>
                  <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates on new products, special offers, and wellness tips.
            </p>
            <form className="mt-2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-dega-blue"
                />
                <button 
                  type="submit" 
                  className="bg-dega-blue hover:bg-dega-blue/90 text-white px-4 py-2 rounded-r-md"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <hr className="border-gray-800 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dega Water. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Floating logo watermark */}
      <div className="fixed bottom-6 right-6 opacity-30">
        <Droplet className="h-8 w-8 text-dega-blue" />
      </div>
    </footer>
  );
};

export default Footer;
