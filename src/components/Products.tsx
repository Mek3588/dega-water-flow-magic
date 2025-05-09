
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  type: string;
  description: string;
  features: string[];
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Dega Pure',
    type: 'Still Water',
    description: 'Our signature still water, sourced from pristine alpine springs and naturally filtered through mineral-rich layers.',
    features: ['Ultra-pure filtration', 'Perfect mineral balance', 'Glass bottle'],
    price: '$3.99',
    image: 'https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 2,
    name: 'Dega Effervescent',
    type: 'Sparkling Water',
    description: 'Naturally carbonated mineral water with tiny, delicate bubbles that dance on the palate.',
    features: ['Natural carbonation', 'Refreshing taste', 'Zero additives'],
    price: '$4.29',
    image: 'https://images.unsplash.com/photo-1605761442941-807a550111d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 3,
    name: 'Dega Mineral Plus',
    type: 'Mineral-Enhanced',
    description: 'Enhanced with essential minerals to support hydration and overall wellbeing.',
    features: ['Magnesium enriched', 'Calcium fortified', 'Enhanced hydration'],
    price: '$4.99',
    image: 'https://images.unsplash.com/photo-1580424917967-a8867a6e676e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 4,
    name: 'Dega Essence',
    type: 'Infused Water',
    description: 'Subtly infused with natural essences for a hint of flavor without calories or sweeteners.',
    features: ['Natural botanicals', 'Delicate flavor', 'Zero calories'],
    price: '$5.29',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  return (
    <Card className="glass-card h-full flex flex-col transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <CardHeader>
        <div className="text-xs text-dega-blue font-semibold uppercase tracking-wider">{product.type}</div>
        <CardTitle className="font-montserrat">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <ul className="text-xs space-y-1">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-dega-blue rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="font-semibold text-dega-blue">{product.price}</span>
        <Button size="sm" variant="outline" className="border-dega-blue text-dega-blue hover:bg-dega-blue/10">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const Products: React.FC = () => {
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

  return (
    <section id="products" className="section-padding bg-gradient-to-b from-white to-dega-blue/5">
      <div ref={sectionRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-800 mb-4">
            Our <span className="font-semibold text-dega-blue">Products</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-600">
            Discover our collection of premium waters, each crafted to deliver a unique experience of purity and taste.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-1000 delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 0.15}s` 
              }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link to="/products">
            <Button 
              className="bg-dega-blue hover:bg-dega-blue/90 text-white btn-ripple"
              size="lg"
            >
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
