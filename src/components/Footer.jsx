import MagneticButton from './MagneticButton';
import { trackInitiateCheckout, trackContact, trackCTAClick } from '../utils/metaPixel';

const Footer = () => (
  <footer className="relative bg-dark-900 border-t border-white/5">
    {/* CTA Banner */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative -mt-0 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-800 via-brand-700 to-brand-800 p-8 sm:p-12 text-center border border-whatsapp/10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-whatsapp/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-brand-200 max-w-xl mx-auto mb-8">
              Join 2,000+ businesses already using IntenPhoto to automate their WhatsApp communication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="#"
                onClick={() => {
                  trackInitiateCheckout('Free Trial');
                  trackCTAClick('Start Free Trial', 'Footer Banner');
                }}
                className="px-8 py-4 text-base font-semibold text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full shadow-xl shadow-whatsapp/25 hover:shadow-whatsapp/40 hover:-translate-y-1 transition-all duration-300"
              >
                Start Free Trial →
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Links */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-whatsapp to-brand-400 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">Chat<span className="text-whatsapp">IQ</span></span>
          </div>
          <p className="text-sm text-gray-400">Automate WhatsApp. Grow your business. Simple.</p>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'API Docs'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-whatsapp transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-gray-500">© 2026 ChatIQ. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
