const problems = [
  { icon: '😰', title: 'Missing Leads on WhatsApp', text: 'Potential customers message you but never get a reply in time.' },
  { icon: '🐢', title: 'Slow Replies', text: "Hours pass before you respond — and by then, they've moved on." },
  { icon: '😩', title: 'Manual Follow-ups', text: "You're copy-pasting the same messages to hundreds of contacts." },
  { icon: '💸', title: 'Lost Sales Opportunities', text: 'Without a system, deals slip through the cracks every single day.' },
];

const solutions = [
  { icon: '⚡', title: 'Instant Auto-Replies', text: 'Respond to every message within seconds — automatically.' },
  { icon: '🤖', title: 'Smart Automation', text: 'Set up flows that nurture leads while you sleep.' },
  { icon: '📊', title: 'Lead Tracking', text: 'Know exactly where every lead is in your pipeline.' },
  { icon: '🚀', title: 'Higher Conversions', text: 'Convert more leads into paying customers consistently.' },
];

const ProblemSolution = () => (
  <section className="relative py-12 sm:py-16 bg-dark-800/30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Problem */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">
          The Problem
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Sound <span className="text-red-400">Familiar</span>?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
        {problems.map((p) => (
          <div key={p.title} className="flex items-start gap-4 p-5 rounded-2xl bg-dark-800/60 border border-red-500/10 hover:border-red-500/20 transition-colors duration-300">
            <span className="text-2xl flex-shrink-0 mt-0.5">{p.icon}</span>
            <div>
              <h3 className="font-semibold text-white text-base">{p.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{p.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider arrow */}
      <div className="flex justify-center mb-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-whatsapp to-brand-400 flex items-center justify-center shadow-lg shadow-whatsapp/30">
          <svg className="w-7 h-7 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Solution */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-whatsapp/10 border border-whatsapp/20 text-xs font-semibold text-whatsapp uppercase tracking-widest mb-4">
          The Solution
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          ChatIQ Makes It <span className="text-whatsapp">Effortless</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {solutions.map((s) => (
          <div key={s.title} className="flex items-start gap-4 p-5 rounded-2xl bg-dark-800/60 border border-whatsapp/10 hover:border-whatsapp/25 transition-colors duration-300">
            <span className="text-2xl flex-shrink-0 mt-0.5">{s.icon}</span>
            <div>
              <h3 className="font-semibold text-white text-base">{s.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSolution;
