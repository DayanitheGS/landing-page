import { useState } from 'react';
import MagneticButton from './MagneticButton';
import { trackLead, trackCompleteRegistration, trackCTAClick } from '../utils/metaPixel';

const API_URL = '/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
        // ── Meta Pixel: Lead captured ──
        trackLead({ email: formData.email });
        trackCompleteRegistration('Contact Form');
      } else {
        setStatus({ type: 'error', message: data.errors?.join(', ') || data.message });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-dark-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-whatsapp/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-whatsapp/10 border border-whatsapp/20 mb-4">
            <span className="text-xs font-semibold text-whatsapp uppercase tracking-wider">Contact Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Get In{' '}
            <span className="bg-gradient-to-r from-whatsapp to-brand-300 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Have a question? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5 bg-dark-800/50 border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name *</label>
                <input
                  type="text" id="name" name="name" required
                  value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-whatsapp/50 focus:ring-1 focus:ring-whatsapp/30 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
                <input
                  type="email" id="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-whatsapp/50 focus:ring-1 focus:ring-whatsapp/30 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">Phone <span className="text-gray-500">(optional)</span></label>
              <input
                type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-whatsapp/50 focus:ring-1 focus:ring-whatsapp/30 transition-all"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message *</label>
              <textarea
                id="message" name="message" required rows={4}
                value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-whatsapp/50 focus:ring-1 focus:ring-whatsapp/30 transition-all resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>

            {/* Status message */}
            {status.message && (
              <div className={`px-4 py-3 rounded-xl text-sm font-medium ${status.type === 'success'
                ? 'bg-whatsapp/10 text-whatsapp border border-whatsapp/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                {status.message}
              </div>
            )}

            <MagneticButton
              type="submit"
              disabled={loading}
              onClick={() => trackCTAClick('Send Message', 'Contact Form')}
              className="w-full px-8 py-4 text-base font-semibold text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full shadow-lg shadow-whatsapp/20 hover:shadow-whatsapp/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
