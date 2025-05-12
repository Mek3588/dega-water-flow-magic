import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const ProductShowcase = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Product data
  const products = [
    {
      id: 1,
      name: "Dega Pure",
      image: "https://images.unsplash.com/photo-1638439430466-b9f5b41e6cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Our signature pure water, sourced from pristine mountain springs."
    },
    {
      id: 2,
      name: "Dega Sparkling",
      image: "https://images.unsplash.com/photo-1598343175492-9e7dc0e63cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Delicate carbonation for a refined sparkling experience."
    },
    {
      id: 3,
      name: "Dega Mineral+",
      image: "https://images.unsplash.com/photo-1606355775047-6eb363b6f81d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Enriched with essential minerals for optimal hydration."
    }
  ];

  return (
    <div className="relative py-16 bg-gradient-to-b from-white to-dega-blue/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-montserrat font-light text-center mb-12">
          Our <span className="font-semibold text-dega-blue">Collection</span>
        </h2>
        
        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {products.map((product) => (
                <div key={product.id} className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
                    <div className="relative h-80">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-montserrat font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dega-blue rounded-full p-2 shadow-md z-10"
            onClick={scrollPrev}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dega-blue rounded-full p-2 shadow-md z-10"
            onClick={scrollNext}
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Dots */}
        <div className="flex justify-center mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                index === selectedIndex ? 'bg-dega-blue scale-125' : 'bg-dega-blue/30'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
