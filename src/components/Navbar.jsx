import { useState } from 'react';
import MagneticButton from './MagneticButton';
import { trackInitiateCheckout, trackCTAClick } from '../utils/metaPixel';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Videos', href: '#videos' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-whatsapp to-brand-400 flex items-center justify-center shadow-lg shadow-whatsapp/20 group-hover:shadow-whatsapp/40 transition-shadow duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.287 0-4.4-.77-6.088-2.064l-.424-.334-2.63.882.882-2.63-.334-.424A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Chat<span className="text-whatsapp">IQ</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-whatsapp rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton
              href="#"
              onClick={() => {
                trackInitiateCheckout('Free Trial');
                trackCTAClick('Start Free Trial', 'Navbar');
              }}
              className="px-5 py-2.5 text-sm font-semibold text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full hover:shadow-lg hover:shadow-whatsapp/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Free Trial
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-whatsapp transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100 pb-6' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-whatsapp hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
            <MagneticButton
              href="#"
              onClick={() => {
                trackInitiateCheckout('Free Trial');
                trackCTAClick('Start Free Trial', 'Navbar Mobile');
              }}
              className="mt-2 mx-4 px-5 py-3 text-sm font-semibold text-center text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full hover:shadow-lg hover:shadow-whatsapp/30 transition-all duration-300"
            >
              Start Free Trial
            </MagneticButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
