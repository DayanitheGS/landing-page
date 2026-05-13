import { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { trackInitiateCheckout, trackCTAClick, createSectionObserver } from '../utils/metaPixel';

const FunnelHero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = createSectionObserver('Funnel Hero');
    if (observer && sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-dark-900">
    {/* Background */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-whatsapp/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-14">
      {/* Urgency Badge */}

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Automate Your WhatsApp Business &{' '}
        <span className="bg-gradient-to-r from-whatsapp via-brand-300 to-brand-400 bg-clip-text text-transparent animate-gradient">
          Close More Leads Faster
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        Stop losing customers to slow replies and manual follow-ups. Let automation do the heavy lifting while you focus on growing your business.
      </p>

      {/* CTA - Magnetic Button */}
      <div className="mt-7 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <MagneticButton
          href="#cta"
          onClick={() => {
            trackInitiateCheckout('Free Trial');
            trackCTAClick('Purchase Now', 'Funnel Hero');
          }}
          className="group inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full shadow-2xl shadow-whatsapp/30 hover:shadow-whatsapp/50 hover:-translate-y-1 transition-all duration-300 animate-pulse-glow"
        >
          Purchase Now
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </MagneticButton>
        <p className="mt-4 text-sm text-gray-500">🔒 No credit card required · Free setup</p>
      </div>

      {/* Scroll indicator */}
      <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <a href="#video" className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-whatsapp transition-colors">
          <span className="text-xs uppercase tracking-widest">Watch the demo video </span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);
};

export default FunnelHero;
