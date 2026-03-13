
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRightIcon } from './icons';
import { supabase } from '../supabase';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  link_url?: string;
}

const FALLBACK_SLIDES: Slide[] = [
  {
    id: 999,
    title: "함께 여는 희망의 길",
    subtitle: "충북음성새터민협회는 여러분의 든든한 동반자가 되어드립니다.",
    image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070",
  }
];

const MainSlider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from('main_slides')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        
        if (data && data.length > 0) setSlides(data);
        else setSlides(FALLBACK_SLIDES);
      } catch (err) {
        setSlides(FALLBACK_SLIDES);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, slides.length]);

  const prevSlide = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  if (loading && slides.length === 0) return <div className="h-screen bg-brand-primary flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <section className="relative h-screen min-h-[700px] w-full bg-brand-primary overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === current ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slide.image_url}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
              <div className={`transition-all duration-1000 delay-300 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="inline-block px-4 py-1.5 bg-brand-secondary/80 backdrop-blur-md text-white rounded-full text-sm font-black tracking-widest uppercase mb-8">
                  Chungbuk Eumseong Support Center
                </span>
                <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-tight mb-8 drop-shadow-2xl">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto mb-12 drop-shadow-lg leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                   <button className="px-10 py-5 bg-brand-secondary hover:bg-green-700 text-white font-black text-xl rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                     협회 안내 <ArrowRightIcon className="w-6 h-6" />
                   </button>
                   <button className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white font-black text-xl rounded-full transition-all">
                     상담 신청하기
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-12 left-0 w-full z-30 px-6 lg:px-12 flex items-center justify-between">
            <div className="flex items-center space-x-4">
               {slides.map((_, i) => (
                 <button
                   key={i}
                   onClick={() => setCurrent(i)}
                   className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-brand-accent' : 'w-4 bg-white/30'}`}
                 />
               ))}
            </div>
            
            <div className="flex items-center space-x-4">
               <button onClick={prevSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-brand-primary transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
               </button>
               <button onClick={nextSlide} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-brand-primary transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
            <div key={current} className="h-full bg-brand-accent animate-[slider-progress_7s_linear_infinite]" style={{ width: '0%' }} />
          </div>
        </>
      )}

      <style>{`
        @keyframes slider-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default MainSlider;
