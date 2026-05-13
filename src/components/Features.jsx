const features = [
  {
    title: 'Smart Auto-Reply',
    description: 'Set up intelligent automated responses that handle customer queries 24/7 without missing a beat.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: 'Lead Management',
    description: 'Capture, organize, and nurture leads directly from WhatsApp conversations with smart tagging.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Broadcast Campaigns',
    description: 'Send personalized bulk messages to segmented audiences with scheduling and analytics built in.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track message delivery, read rates, and conversion metrics with beautiful real-time dashboards.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Multi-Agent Support',
    description: 'Assign conversations to team members, transfer chats, and collaborate seamlessly in real time.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'API Integration',
    description: 'Connect with your favorite tools — Shopify, HubSpot, Zapier, and more via our robust API.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const FeatureCard = ({ feature, index }) => (
  <div
    className="group relative p-6 rounded-2xl bg-dark-800/50 border border-white/5 hover:border-whatsapp/20 hover:bg-dark-800 transition-all duration-500 hover:-translate-y-1 opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-whatsapp/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-whatsapp/10 border border-whatsapp/20 flex items-center justify-center text-whatsapp group-hover:bg-whatsapp group-hover:text-dark-900 transition-all duration-300 mb-4">
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-whatsapp transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
    </div>
  </div>
);

const Features = () => (
  <section id="features" className="relative py-24 sm:py-32 bg-dark-900">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-whatsapp/10 border border-whatsapp/20 mb-4">
          <span className="text-xs font-semibold text-whatsapp uppercase tracking-wider">Features</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Everything You{' '}
          <span className="bg-gradient-to-r from-whatsapp to-brand-300 bg-clip-text text-transparent">Need</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Powerful features designed to supercharge your WhatsApp business communication.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
      </div>
    </div>
  </section>
);

export default Features;
