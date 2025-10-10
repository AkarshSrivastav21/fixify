import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdminSlider = () => {
  const slides = [
    {
      id: 1,
      title: 'Welcome to ServiceHub',
      description: 'Manage your platform efficiently with our powerful admin tools',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 2,
      title: 'Plumbing Services',
      description: 'Top-rated plumbers ready to serve your customers',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop',
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 3,
      title: 'Electrical Services',
      description: 'Certified electricians for all your electrical needs',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=400&fit=crop',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 4,
      title: 'Home Cleaning',
      description: 'Professional cleaning services for spotless homes',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=400&fit=crop',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl mb-8">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-60`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
                <p className="text-lg opacity-90">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSlider;
