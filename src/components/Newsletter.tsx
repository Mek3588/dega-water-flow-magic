
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Newsletter: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Subscribed!",
        description: "You've successfully joined the Dega Flow.",
      });
      setEmail('');
    }, 1000);
  };
  
  return (
    <section className="bg-dega-blue text-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-white opacity-10"></div>
        <div className="absolute -bottom-20 right-40 w-60 h-60 rounded-full bg-white opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-4">
            Join the Dega Flow
          </h2>
          <p className="text-dega-blue-light opacity-80 mb-8">
            Subscribe to our newsletter for exclusive offers, hydration tips, and first access to new releases.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mx-auto max-w-md">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 focus:ring-white"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-white hover:bg-white/90 text-dega-blue btn-ripple h-12 px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-xs mt-4 opacity-70">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Dega Water.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
