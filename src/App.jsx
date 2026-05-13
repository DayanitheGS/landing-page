import { useEffect, useState } from 'react';
import FunnelHero from './components/FunnelHero';
import FunnelVideo from './components/FunnelVideo';
import ProblemSolution from './components/ProblemSolution';
import Transformation from './components/Transformation';
import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { initEngagementTracking } from './utils/metaPixel';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if current path is admin dashboard
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdmin(true);
      return;
    }
    // Initialize scroll depth + time-on-page tracking for main funnel
    const cleanup = initEngagementTracking();
    return cleanup;
  }, []);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans">
      <main>
        <FunnelHero />
        <FunnelVideo />
        <ProblemSolution />
        <Transformation />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
