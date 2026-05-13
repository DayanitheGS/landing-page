const videos = [
  {
    id: 1,
    url: 'https://www.youtube.com/embed/MEmYiGyGV2I',
    title: 'Complete WhatsApp CRM Overview',
    description: 'Manage leads and automate chats easily',
  },
  {
    id: 2,
    url: 'https://www.youtube.com/embed/_DOC234T4dM',
    title: 'Automate Conversations',
    description: 'Engage customers 24/7',
  },
  {
    id: 3,
    url: 'https://www.youtube.com/embed/GCUoY1kiiEY',
    title: 'Boost Sales Faster',
    description: 'Increase conversions with campaigns',
  },
];

const VideoCard = ({ video }) => (
  <div className="group relative rounded-2xl overflow-hidden bg-dark-800 border border-white/5 hover:border-whatsapp/30 shadow-lg hover:shadow-2xl hover:shadow-whatsapp/10 transition-all duration-500 hover:-translate-y-2">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-whatsapp/0 to-brand-400/0 group-hover:from-whatsapp/20 group-hover:to-brand-400/20 rounded-2xl blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />
    <div className="relative">
      <div className="relative aspect-video overflow-hidden">
        <iframe src={video.url} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" loading="lazy" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-whatsapp transition-colors duration-300">{video.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{video.description}</p>
      </div>
    </div>
  </div>
);

const VideoShowcase = () => (
  <section id="videos" className="relative py-24 sm:py-32 bg-dark-900">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-whatsapp/5 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-whatsapp/10 border border-whatsapp/20 mb-4">
          <span className="text-xs font-semibold text-whatsapp uppercase tracking-wider">Video Tutorials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          See It In{' '}
          <span className="bg-gradient-to-r from-whatsapp to-brand-300 bg-clip-text text-transparent">Action</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Watch how businesses transform their WhatsApp communication with our powerful automation tools.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 stagger-children">
        {videos.map((v) => <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  </section>
);

export default VideoShowcase;
