
import React, { useEffect, useState } from 'react';
import { Droplet } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [rippleState, setRippleState] = useState<'initial' | 'expanding' | 'fading'>('initial');
  const [logoOpacity, setLogoOpacity] = useState(0);
  
  useEffect(() => {
    // Start the loading sequence
    const sequence = async () => {
      // Start with ripple expansion
      setRippleState('expanding');
      
      // After a small delay, fade in the logo
      setTimeout(() => {
        setLogoOpacity(1);
      }, 500);

      // After animation duration, begin exit transition
      setTimeout(() => {
        setRippleState('fading');
        setTimeout(() => {
          onLoadingComplete();
        }, 1000); // Fade out duration
      }, 3000); // Total animation duration before fade out begins
    };
    
    sequence();
    
    // Optional: Play water sound effect
    const audioElement = new Audio('/water-drop.mp3');
    audioElement.volume = 0.2;
    audioElement.loop = true;
    
    // Only play if browser settings allow autoplay
    const playPromise = audioElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented, silent fail
      });
    }
    
    return () => {
      // Clean up audio on unmount
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, [onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-dega-blue transition-opacity duration-1000 ${
        rippleState === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Multiple ripple layers */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className={`absolute rounded-full border border-white/30 transition-all duration-3000 ease-out ${
              rippleState === 'initial' ? 'scale-0 opacity-0' : 
              rippleState === 'expanding' ? 'scale-100 opacity-20' : 
              'scale-110 opacity-0'
            }`}
            style={{
              width: `${index * 40}vmin`,
              height: `${index * 40}vmin`,
              transitionDelay: `${index * 200}ms`,
              borderWidth: index === 3 ? '3px' : '1px'
            }}
          />
        ))}
      </div>

      {/* Glowing center point */}
      <div 
        className={`absolute w-16 h-16 rounded-full bg-white/10 transition-all duration-2000 ${
          rippleState === 'expanding' ? 'scale-100 blur-md' : 'scale-0 blur-none'
        }`}
      />

      {/* Logo */}
      <div 
        className="relative flex flex-col items-center transition-all duration-2000"
        style={{ opacity: logoOpacity }}
      >
        <Droplet className="h-16 w-16 text-white" />
        <div className="mt-4 font-montserrat text-2xl tracking-widest text-white">DEGA WATER</div>
      </div>

      {/* Subtle shimmering particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/30 rounded-full animate-pulse"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;
