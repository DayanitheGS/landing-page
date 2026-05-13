import { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { trackInitiateCheckout, trackCTAClick, createSectionObserver } from '../utils/metaPixel';

const FinalCTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = createSectionObserver('Final CTA');
    if (observer && sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer?.disconnect();
  }, []);

  return (
  <section ref={sectionRef} id="cta" className="relative py-16 sm:py-20 bg-dark-900 overflow-hidden">
    {/* Background glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-whatsapp/10 rounded-full blur-3xl" />
    </div>

    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-5">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-sm font-semibold text-red-400">Limited slots available</span>
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
        Ready to Automate Your{' '}
        <span className="bg-gradient-to-r from-whatsapp to-brand-300 bg-clip-text text-transparent">
          WhatsApp Business?
        </span>
      </h2>

      {/* Sub */}
      <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl mx-auto">
        Start getting more leads and conversions today. Join thousands of businesses already growing with ChatIQ.
      </p>

      {/* CTA */}
      <div className="mt-10">
        <MagneticButton
          href="#"
          onClick={() => {
            trackInitiateCheckout('Purchase Now');
            trackCTAClick('Purchase Now', 'Final CTA');
          }}
          className="group inline-flex items-center gap-3 px-12 py-5 text-lg font-bold text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full shadow-2xl shadow-whatsapp/30 hover:shadow-whatsapp/50 hover:-translate-y-1 transition-all duration-300 animate-pulse-glow"
        >
          Purchase Now
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </MagneticButton>
      </div>

      {/* Trust */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-whatsapp" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          No credit card required
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-whatsapp" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Cancel anytime
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-whatsapp" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Setup in 5 minutes
        </span>
      </div>

      {/* Footer line */}
      <div className="mt-20 pt-8 border-t border-white/5">
        <p className="text-xs text-gray-600">© 2026 ChatIQ. All rights reserved.</p>
      </div>
    </div>
  </section>
);
};

export default FinalCTA;
