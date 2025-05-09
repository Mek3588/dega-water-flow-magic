
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactUs: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Create water drop animation on successful submit
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const droplet = document.createElement('div');
        droplet.className = 'absolute w-4 h-4 bg-dega-blue rounded-full';
        droplet.style.top = '50%';
        droplet.style.left = '50%';
        droplet.style.transform = 'translate(-50%, -50%)';
        contactSection.appendChild(droplet);
        
        // Animate the droplet
        setTimeout(() => {
          droplet.style.transition = 'all 1s ease-in';
          droplet.style.width = '200px';
          droplet.style.height = '200px';
          droplet.style.opacity = '0';
        }, 100);
        
        // Remove the droplet after animation
        setTimeout(() => {
          contactSection.removeChild(droplet);
        }, 1100);
      }
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pattern-dots opacity-5 text-dega-blue"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-dega-blue opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-dega-blue opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-800 mb-4">
              Contact <span className="font-semibold text-dega-blue">Us</span>
            </h2>
            <p className="text-gray-600">
              Have questions about Dega Water? We're here to help. Reach out to our team.
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md focus:ring-dega-blue focus:border-dega-blue"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md focus:ring-dega-blue focus:border-dega-blue"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring-dega-blue focus:border-dega-blue"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring-dega-blue focus:border-dega-blue"
                  required
                />
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-dega-blue hover:bg-dega-blue/90 text-white btn-ripple w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'Email',
                value: 'contact@degawater.com',
                icon: '✉️',
              },
              {
                title: 'Phone',
                value: '+1 (800) DEG-WATR',
                icon: '📞',
              },
              {
                title: 'Headquarters',
                value: 'Zurich, Switzerland',
                icon: '📍',
              },
            ].map((item, index) => (
              <div key={index} className="p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{item.title}</h3>
                <p className="text-dega-blue">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
