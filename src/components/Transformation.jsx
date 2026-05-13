const beforeItems = [
  'Manually replying to every message',
  'Losing leads due to late responses',
  'No idea which leads are hot or cold',
  'Spending hours on repetitive follow-ups',
  'Scattered conversations, zero tracking',
];

const afterItems = [
  'Instant automated replies 24/7',
  'Every lead captured and followed up',
  'Smart pipeline shows lead priority',
  'Automated sequences nurture for you',
  'One dashboard, full visibility',
];

const Transformation = () => (
  <section className="relative py-12 sm:py-16 bg-dark-900">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-whatsapp/10 border border-whatsapp/20 text-xs font-semibold text-whatsapp uppercase tracking-widest mb-4">
          Transformation
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          From <span className="text-red-400">Chaos</span> to <span className="text-whatsapp">Control</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="rounded-2xl border border-red-500/15 bg-red-500/5 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-xl">😓</span>
            </div>
            <h3 className="text-xl font-bold text-red-400">Before ChatIQ</h3>
          </div>
          <ul className="space-y-4">
            {beforeItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="rounded-2xl border border-whatsapp/20 bg-whatsapp/5 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-whatsapp/20 flex items-center justify-center">
              <span className="text-xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-whatsapp">After ChatIQ</h3>
          </div>
          <ul className="space-y-4">
            {afterItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-whatsapp flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Transformation;
