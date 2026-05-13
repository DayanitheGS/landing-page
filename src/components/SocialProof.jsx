import { useEffect, useRef, useState } from 'react';
import { createSectionObserver } from '../utils/metaPixel';

const testimonials = [
  {
    name: 'Rahul Mehta',
    role: 'Founder, ScaleUp Agency',
    text: 'We went from replying manually to 200+ leads per day to fully automated conversations. Our conversion rate jumped 47% in the first month.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop',
    initials: 'RM',
  },
  {
    name: 'Priya Sharma',
    role: 'E-Commerce Owner',
    text: 'ChatIQ changed everything. My abandoned cart recovery through WhatsApp brings in an extra ₹2L every month — on autopilot.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
    initials: 'PS',
  },
  {
    name: 'Arjun Patel',
    role: 'Real Estate Consultant',
    text: 'I used to lose 60% of my leads because I couldn\'t reply fast enough. Now every lead gets an instant response and proper follow-up.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop',
    initials: 'AP',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Fitness Studio Owner',
    text: 'Booking confirmations, class reminders, and re-engagement — all handled via WhatsApp now. My no-show rate dropped by 35% in just 3 weeks.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop',
    initials: 'SK',
  },
  {
    name: 'Vikram Singh',
    role: 'SaaS Founder, DevFlow',
    text: 'Our onboarding flow on WhatsApp converts 3x better than email. ChatIQ made it ridiculously easy to set up and the analytics are top-notch.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop',
    initials: 'VS',
  },
  {
    name: 'Neha Gupta',
    role: 'Travel Agency Director',
    text: 'We handle 500+ travel inquiries a week without breaking a sweat. Automated itinerary sharing and instant replies have transformed our business.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop',
    initials: 'NG',
  },
];

const TestimonialAvatar = ({ src, name, initials }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-whatsapp/20 bg-gradient-to-br from-whatsapp to-brand-400 flex items-center justify-center text-sm font-bold text-dark-900 shadow-inner">
      {!imageError && src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

const SocialProof = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = createSectionObserver('Social Proof / Testimonials');
    if (observer && sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-whatsapp/10 border border-whatsapp/20 text-xs font-semibold text-whatsapp uppercase tracking-widest mb-4">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Trusted by <span className="text-whatsapp">2,000+</span> Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-dark-800/60 border border-white/5 p-7 sm:p-8 hover:border-whatsapp/15 shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Quote */}
              <p className="text-base text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <TestimonialAvatar src={t.avatar} name={t.name} initials={t.initials} />
                <div>
                  <p className="text-base font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
