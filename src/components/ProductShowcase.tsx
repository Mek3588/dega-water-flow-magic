
import React, { useRef, useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Droplets, CircleDashed, Star } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  tagline: string;
  description: string;
  source: string;
  mineralProfile: string;
  lifestyle: string;
  image: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  {
    id: 1,
    name: "Dega Still",
    tagline: "Pure Elegance",
    description: "Our signature still water, defined by its exceptional purity and silky smooth texture.",
    source: "Alpine Springs, Pristine Mountains",
    mineralProfile: "Perfectly balanced with essential minerals for optimal hydration",
    lifestyle: "Everyday luxury hydration for the discerning individual",
    image: "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    icon: <Droplets />,
  },
  {
    id: 2,
    name: "Dega Sparkle",
    tagline: "Effervescent Wonder",
    description: "Naturally carbonated water with fine, delicate bubbles that dance on the palate.",
    source: "Protected Artesian Wells",
    mineralProfile: "Rich in natural bicarbonates with a bright, clean finish",
    lifestyle: "For celebrations and moments that deserve elevation",
    image: "https://images.unsplash.com/photo-1605761442941-807a550111d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    icon: <CircleDashed />,
  },
  {
    id: 3,
    name: "Dega Vital",
    tagline: "Mineral Renaissance",
    description: "Enhanced with essential minerals to support vitality and wellbeing.",
    source: "Ancient Mineral Bedrock",
    mineralProfile: "Elevated levels of magnesium, calcium and potassium",
    lifestyle: "Active individuals seeking premium hydration and recovery",
    image: "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    icon: <Star />,
  },
  {
    id: 4,
    name: "Dega pH+",
    tagline: "Balanced Perfection",
    description: "Alkaline water with an optimal pH level to support your body's natural balance.",
    source: "Glacial Melt, Northern Territories",
    mineralProfile: "Naturally alkaline with a perfect 8.2 pH balance",
    lifestyle: "Health-conscious connoisseurs seeking premium alkaline hydration",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    icon: <Droplets />,
  },
];

const ProductShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-light text-gray-800 mb-4">
            Our <span className="font-semibold text-dega-blue">Collection</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each Dega Water variant is meticulously crafted to deliver a unique sensory experience, 
            celebrating the perfect harmony of nature and innovation.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            onSelect={(api) => {
              if (api) setActiveIndex(api.selectedScrollSnap());
            }}
          >
            <CarouselContent className="-ml-4">
              {products.map((product, index) => (
                <CarouselItem 
                  key={product.id} 
                  className="pl-4 sm:basis-2/3 md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className={cn(
                      "h-full transition-all duration-1000",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    )}
                    style={{ 
                      transitionDelay: `${index * 0.15}s`,
                    }}
                  >
                    <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-dega-blue/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Image Container */}
                      <div className="relative h-72 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 z-10 flex items-center">
                          <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white mr-2">
                            {product.icon}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-xl">{product.name}</h3>
                            <p className="text-white/80 text-sm">{product.tagline}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5 flex-grow flex flex-col">
                        <p className="text-gray-700 mb-4 flex-grow">{product.description}</p>
                        
                        <div className="space-y-2 mt-auto">
                          <HoverCard openDelay={100} closeDelay={100}>
                            <HoverCardTrigger asChild>
                              <div className="flex items-center text-sm text-dega-blue cursor-pointer hover:underline">
                                <Star size={14} className="mr-1" />
                                <span>Source</span>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-dega-blue/95 text-white border-none shadow-xl">
                              <p>{product.source}</p>
                            </HoverCardContent>
                          </HoverCard>
                          
                          <HoverCard openDelay={100} closeDelay={100}>
                            <HoverCardTrigger asChild>
                              <div className="flex items-center text-sm text-dega-blue cursor-pointer hover:underline">
                                <CircleDashed size={14} className="mr-1" />
                                <span>Mineral Profile</span>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-dega-blue/95 text-white border-none shadow-xl">
                              <p>{product.mineralProfile}</p>
                            </HoverCardContent>
                          </HoverCard>
                          
                          <HoverCard openDelay={100} closeDelay={100}>
                            <HoverCardTrigger asChild>
                              <div className="flex items-center text-sm text-dega-blue cursor-pointer hover:underline">
                                <Droplets size={14} className="mr-1" />
                                <span>Lifestyle</span>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-dega-blue/95 text-white border-none shadow-xl">
                              <p>{product.lifestyle}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-6 bg-white border-dega-blue/20 text-dega-blue hover:bg-dega-blue hover:text-white" />
            <CarouselNext className="hidden sm:flex -right-4 lg:-right-6 bg-white border-dega-blue/20 text-dega-blue hover:bg-dega-blue hover:text-white" />
          </Carousel>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index ? "bg-dega-blue scale-125" : "bg-dega-blue/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
