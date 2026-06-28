import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroBanner({ title, subtitle, image, cta, slides }) {
  const heroSlides = slides?.length ? slides : [{ title, subtitle, image, cta }];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length < 2) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, heroSlides.length]);

  const activeSlide = heroSlides[activeIndex % heroSlides.length];

  return (
    <section className="container-custom py-8">
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.6s ease-out; }`}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div key={activeSlide.title} className="animate-fadeIn">
          <p className="uppercase text-sm text-[#f59e0b] font-bold">Smart shopping, elevated</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{activeSlide.title}</h1>
          <p className="mt-2 text-gray-300">{activeSlide.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/products" className="primary-cta">{activeSlide.cta}</Link>
            <Link to="/products" className="px-4 py-2 rounded-full bg-[#111111] text-sm text-gray-200 border border-[#2a2a2a]">Explore offers</Link>
          </div>
          {heroSlides.length > 1 ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={`${slide.title}-${index}`}
                    aria-label={`Show slide ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-[#f59e0b]' : 'w-2.5 bg-[#3a2d32]'}`}
                  />
                ))}
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500">0{activeIndex + 1}/0{heroSlides.length}</span>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-xl">
            <div key={`${activeSlide.title}-${activeSlide.image}`} className="animate-fadeIn">
              <img src={activeSlide.image} alt="Hero showcase" className="w-full h-72 md:h-80 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
