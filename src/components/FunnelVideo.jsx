import { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { trackVideoPlay, trackCTAClick, trackInitiateCheckout, createSectionObserver } from '../utils/metaPixel';

const videos = [
  {
    url: 'https://www.youtube.com/embed/MEmYiGyGV2I',
    title: 'Complete WhatsApp CRM Overview',
  },
  {
    url: 'https://www.youtube.com/embed/_DOC234T4dM',
    title: 'Automate Conversations',
  },
  {
    url: 'https://www.youtube.com/embed/GCUoY1kiiEY',
    title: 'Boost Sales Faster',
  },
];

const FunnelVideo = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = createSectionObserver('Demo Videos');
    if (observer && sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer?.disconnect();
  }, []);

  return (
  <section ref={sectionRef} id="video" className="relative py-10 sm:py-14 bg-dark-900">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-whatsapp/5 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-whatsapp/10 border border-whatsapp/20 text-xs font-semibold text-whatsapp uppercase tracking-widest mb-3">
          See It In Action
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Watch How It <span className="text-whatsapp">Works</span>
        </h2>
        <p className="mt-3 text-base text-gray-400">
          Watch the video to learn about ChatIQ
        </p>
      </div>

      {/* 3 Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {videos.map((v) => (
          <div key={v.url} className="group rounded-2xl overflow-hidden border border-white/8 hover:border-whatsapp/25 bg-dark-800 shadow-lg hover:shadow-xl hover:shadow-whatsapp/10 transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-video" onClick={() => trackVideoPlay(v.title)}>
              <iframe
                src={v.url}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="px-5 py-4">
              <h3 className="text-base font-semibold text-white group-hover:text-whatsapp transition-colors">{v.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA below videos */}
      <div className="text-center mt-8">
        <p className="text-base text-gray-400 mb-5">
          See how businesses are automating WhatsApp and <span className="text-white font-semibold">increasing conversions by 3x</span>.
        </p>
        <MagneticButton
          href="#cta"
          onClick={() => {
            trackInitiateCheckout('Reserve Spot');
            trackCTAClick('Reserve Your Spot', 'Video Section');
          }}
          className="group inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full shadow-xl shadow-whatsapp/25 hover:shadow-whatsapp/40 hover:-translate-y-1 transition-all duration-300"
        >
          Reserve Your Spot
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </MagneticButton>
      </div>
    </div>
  </section>
  );
};

export default FunnelVideo;
