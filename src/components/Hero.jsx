import MagneticButton from './MagneticButton';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900 pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-whatsapp/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp/10 border border-whatsapp/20 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse" />
          <span className="text-sm font-medium text-whatsapp">Now with AI-powered automation</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          WhatsApp Automation
          <br />
          <span className="bg-gradient-to-r from-whatsapp via-brand-300 to-brand-400 bg-clip-text text-transparent animate-gradient">
            Made Simple
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Automate conversations, manage leads, and boost sales — all in one
          powerful CRM built for modern businesses.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <MagneticButton
            href="#"
            id="cta-start-trial"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-dark-900 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full shadow-xl shadow-whatsapp/25 hover:shadow-whatsapp/40 hover:-translate-y-1 transition-all duration-300 animate-pulse-glow"
          >
            Start Free Trial
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </MagneticButton>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-500 mb-4">Trusted by 2,000+ businesses worldwide</p>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-40">
            {['Startup Co', 'Scale Inc', 'Growth Ltd', 'Boost Corp'].map((name) => (
              <span key={name} className="text-lg font-bold text-gray-400 tracking-widest uppercase">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard Preview Card */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.75s' }}>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-whatsapp/20 via-brand-400/10 to-whatsapp/20 rounded-2xl blur-xl opacity-60" />
            <div className="relative bg-dark-800 rounded-2xl p-1">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-dark-700 rounded-t-xl">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-dark-600 rounded-md flex items-center px-3">
                    <span className="text-xs text-gray-500">app.intentphoto.com/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Dashboard mock */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Active Leads', value: '2,847', change: '+12%', color: 'text-whatsapp' },
                    { label: 'Messages Sent', value: '14.2K', change: '+8%', color: 'text-brand-400' },
                    { label: 'Conversions', value: '342', change: '+23%', color: 'text-brand-300' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-dark-700/50 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                      <p className="text-xs text-green-400 mt-1">{stat.change} this week</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-700/50 rounded-xl p-4 border border-white/5 h-32 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-whatsapp/60 to-whatsapp/20 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="bg-dark-700/50 rounded-xl p-4 border border-white/5 space-y-3">
                    {['Lead Qualification', 'Auto-Reply', 'Campaign Blast'].map((item, i) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-whatsapp/10 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-whatsapp/60" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-dark-600 rounded-full">
                            <div
                              className="h-2 bg-gradient-to-r from-whatsapp to-brand-400 rounded-full"
                              style={{ width: `${85 - i * 15}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
