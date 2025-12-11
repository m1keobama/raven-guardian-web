import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { content } = useContent();
  const slides = content.carousel;

  const next = () => setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900 group">
      {slides.map((slide: any, index: number) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms] scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className={`max-w-xl transition-all duration-1000 delay-300 ${index === current ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl text-slate-200 mb-8 font-light border-l-4 border-blue-500 pl-4">
                  {slide.subtitle}
                </p>
                <Link 
                  to={slide.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded text-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={prev} 
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors z-10 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={next} 
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors z-10 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_: any, idx: number) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-blue-500 w-8' : 'bg-white/50 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};