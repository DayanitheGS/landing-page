import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const initialProducts = [
  { id: 'p1', name: 'Starter Shoot Package', price: '$299', status: 'Active', features: '1 Hour, 15 Retouched Photos' },
  { id: 'p2', name: 'Premium Brand Bundle', price: '$599', status: 'Active', features: '3 Hours, Unlimited Captures' },
  { id: 'p3', name: 'VIP Cinematic Suite', price: '$1,299', status: 'Draft', features: 'Full Day, Drone Footage Included' },
];

const initialPhotos = [
  { id: 'img1', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop', title: 'Studio Session A', date: 'May 10, 2026' },
  { id: 'img2', url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop', title: 'Product Launch Lens', date: 'May 08, 2026' },
  { id: 'img3', url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=400&auto=format&fit=crop', title: 'Editorial Golden Hour', date: 'Apr 28, 2026' },
];

const AdminDashboard = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [demoMode, setDemoMode] = useState(false);

  // Dashboard Nav & Management State
  const [activeSection, setActiveSection] = useState('overview'); // overview, products, photos, users
  const [products, setProducts] = useState(initialProducts);
  const [photos, setPhotos] = useState(initialPhotos);
  const [crmLeads, setCrmLeads] = useState([]);
  const [crmContacts, setCrmContacts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // New item modal/form states
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductFeatures, setNewProductFeatures] = useState('');

  // Fetch real API leads & contacts for the users panel
  const fetchCrmData = async () => {
    setDataLoading(true);
    try {
      const baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:5000' : '';
      const [leadsRes, contactsRes] = await Promise.all([
        fetch(`${baseUrl}/api/lead`).then(res => res.json()).catch(() => ({ success: false })),
        fetch(`${baseUrl}/api/contact`).then(res => res.json()).catch(() => ({ success: false }))
      ]);

      if (leadsRes?.success) setCrmLeads(leadsRes.data || []);
      if (contactsRes?.success) setCrmContacts(contactsRes.data || []);
    } catch (err) {
      console.warn('Could not fetch real API records:', err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated || demoMode) {
      fetchCrmData();
    }
  }, [isAuthenticated, demoMode]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
        setIsAuthenticated(true);
        setDemoMode(false);
      } else {
        throw new Error('Firebase Connection unavailable');
      }
    } catch (err) {
      console.error('Auth failure:', err.message);
      setAuthError('Invalid administrator credentials or missing Firebase Config.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Demo Mode Bypass
  const handleDemoBypass = () => {
    setIsAuthenticated(true);
    setDemoMode(true);
  };

  // Handle Logout
  const handleLogout = async () => {
    if (auth && !demoMode) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn(e);
      }
    }
    setIsAuthenticated(false);
    setDemoMode(false);
  };

  // Create Product handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;
    const newItem = {
      id: `p-${Date.now()}`,
      name: newProductName,
      price: newProductPrice.startsWith('$') ? newProductPrice : `$${newProductPrice}`,
      status: 'Active',
      features: newProductFeatures || 'Standard tier options'
    };
    setProducts([newItem, ...products]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductFeatures('');
  };

  // Delete Product handler
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Simulated Photo Upload
  const handlePhotoUploadSimulated = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Create local object url to preview dynamically
    const fakeUrl = URL.createObjectURL(file);
    const newPic = {
      id: `img-${Date.now()}`,
      url: fakeUrl,
      title: file.name.replace(/\.[^/.]+$/, ""),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setPhotos([newPic, ...photos]);
  };

  // ─────────────────────────────────────────────────────────
  // SCREEN 1: LOGIN COMPONENT
  // ─────────────────────────────────────────────────────────
  if (!isAuthenticated && !demoMode) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden font-sans text-white">
        {/* Abstract animated glow background elements */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-whatsapp/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-dark-800/80 border border-gray-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <span className="px-3 py-1 bg-whatsapp/10 border border-whatsapp/20 text-whatsapp text-xs font-bold rounded-full uppercase tracking-wider">
              Protected Area
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-4">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-whatsapp to-brand-300">Authentication</span>
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              Connect via Firebase Authentication to secure your portal.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center animate-shake">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@intenphoto.com"
                className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-whatsapp focus:ring-1 focus:ring-whatsapp transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-whatsapp focus:ring-1 focus:ring-whatsapp transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-dark-900 font-bold transition-all duration-200 text-sm shadow-lg shadow-whatsapp/10 mt-2 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <span className="animate-spin inline-block">🔄</span> Authenticating...
                </>
              ) : (
                'Secure Login'
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-dark-800 px-3 text-gray-500">Or Preview Instantly</span>
            </div>
          </div>

          <button
            onClick={handleDemoBypass}
            className="w-full py-3 px-4 rounded-xl bg-dark-900 hover:bg-dark-900/60 border border-gray-800 text-gray-300 font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            <span>✨</span> Access Demo Admin Dashboard
          </button>

          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-gray-500 hover:text-gray-400 underline transition-colors">
              ← Return to public website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // SCREEN 2: MAIN ADMIN DASHBOARD LAYOUT
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col font-sans">
      {/* Top Admin Nav Bar */}
      <header className="border-b border-gray-800 bg-dark-900/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-whatsapp to-brand-400 flex items-center justify-center text-dark-900 font-extrabold text-lg">
              IP
            </div>
            <div>
              <span className="text-xs text-whatsapp font-bold block uppercase tracking-wider">
                {demoMode ? 'Sandbox Mode' : 'Firebase Verified'}
              </span>
              <h1 className="text-base font-bold text-white leading-none">Command Center</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
            <button
              onClick={() => setActiveSection('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSection === 'overview' ? 'bg-dark-800 text-whatsapp border border-gray-700' : 'text-gray-400 hover:text-white'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveSection('products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSection === 'products' ? 'bg-dark-800 text-whatsapp border border-gray-700' : 'text-gray-400 hover:text-white'
              }`}
            >
              🛍️ Products ({products.length})
            </button>
            <button
              onClick={() => setActiveSection('photos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSection === 'photos' ? 'bg-dark-800 text-whatsapp border border-gray-700' : 'text-gray-400 hover:text-white'
              }`}
            >
              🖼️ Photos ({photos.length})
            </button>
            <button
              onClick={() => setActiveSection('users')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeSection === 'users' ? 'bg-dark-800 text-whatsapp border border-gray-700' : 'text-gray-400 hover:text-white'
              }`}
            >
              👥 CRM Users ({crmLeads.length + crmContacts.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        
        {/* SECTION A: OVERVIEW METRICS */}
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Banner info */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-800 to-dark-800/40 border border-gray-800 relative overflow-hidden">
              <div className="max-w-xl">
                <h2 className="text-xl font-bold text-white">Welcome back, Administrator</h2>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Your customized admin dashboard library pipeline is fully operational. Manage backend items below to update customer experiences instantly.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded-md bg-dark-900 text-gray-400 text-[10px] font-mono border border-gray-800">
                    Connection: {demoMode ? 'Local Mocks Active' : 'Live Firebase Service'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-whatsapp/10 text-whatsapp text-[10px] font-semibold border border-whatsapp/20">
                    Protected Admin Router V2
                  </span>
                </div>
              </div>
            </div>

            {/* Core KPI metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-dark-800/40 border border-gray-800">
                <span className="text-gray-400 text-xs font-semibold uppercase">Total Products</span>
                <p className="text-2xl font-bold text-white mt-1">{products.length}</p>
                <span className="text-[10px] text-whatsapp block mt-1">Pricing tiers available</span>
              </div>
              <div className="p-5 rounded-xl bg-dark-800/40 border border-gray-800">
                <span className="text-gray-400 text-xs font-semibold uppercase">Gallery Assets</span>
                <p className="text-2xl font-bold text-white mt-1">{photos.length}</p>
                <span className="text-[10px] text-brand-300 block mt-1">Retouched images</span>
              </div>
              <div className="p-5 rounded-xl bg-dark-800/40 border border-gray-800">
                <span className="text-gray-400 text-xs font-semibold uppercase">Trial Leads</span>
                <p className="text-2xl font-bold text-white mt-1">{crmLeads.length}</p>
                <span className="text-[10px] text-whatsapp block mt-1">Fired via Landing Page</span>
              </div>
              <div className="p-5 rounded-xl bg-dark-800/40 border border-gray-800">
                <span className="text-gray-400 text-xs font-semibold uppercase">Inbox Queries</span>
                <p className="text-2xl font-bold text-white mt-1">{crmContacts.length}</p>
                <span className="text-[10px] text-gray-400 block mt-1">Direct feedback messages</span>
              </div>
            </div>

            {/* Quick shortcuts layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-dark-800/30 border border-gray-800">
                <h3 className="text-sm font-semibold text-whatsapp uppercase tracking-wider mb-3">
                  🛍️ Product Pricing Setup
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Add custom booking sessions or customize pricing tags displayed across your primary call-to-action triggers.
                </p>
                <button
                  onClick={() => setActiveSection('products')}
                  className="px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-semibold text-white border border-gray-700 transition-all"
                >
                  Configure Products →
                </button>
              </div>

              <div className="p-6 rounded-xl bg-dark-800/30 border border-gray-800">
                <h3 className="text-sm font-semibold text-brand-300 uppercase tracking-wider mb-3">
                  🖼️ Photo Gallery Controller
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Upload preview assets or connect high-resolution photography collections to fuel showcase feeds.
                </p>
                <button
                  onClick={() => setActiveSection('photos')}
                  className="px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-semibold text-white border border-gray-700 transition-all"
                >
                  Manage Visual Assets →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION B: MANAGE PRODUCTS */}
        {activeSection === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Manage Products & Plans</h2>
                <p className="text-xs text-gray-400">Add customizable shoot offerings to your core booking checkout workflow.</p>
              </div>
            </div>

            {/* Creation Form */}
            <form onSubmit={handleAddProduct} className="p-5 rounded-xl bg-dark-800/40 border border-gray-800 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Package Title</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Bronze Headshot Session"
                  className="w-full px-3 py-2 bg-dark-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-whatsapp"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Price Tag</label>
                <input
                  type="text"
                  required
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  placeholder="e.g. $450"
                  className="w-full px-3 py-2 bg-dark-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-whatsapp"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Key Features</label>
                <input
                  type="text"
                  value={newProductFeatures}
                  onChange={(e) => setNewProductFeatures(e.target.value)}
                  placeholder="e.g. 2 Outfits, Full digital delivery"
                  className="w-full px-3 py-2 bg-dark-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-whatsapp"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-whatsapp hover:bg-whatsapp/90 text-dark-900 rounded-lg text-xs font-bold transition-all"
              >
                ➕ Add Product
              </button>
            </form>

            {/* Products Table List */}
            <div className="border border-gray-800 rounded-xl overflow-hidden bg-dark-800/20">
              <table className="w-full text-left text-xs">
                <thead className="bg-dark-800/60 text-gray-400 uppercase tracking-wider border-b border-gray-800">
                  <tr>
                    <th className="py-3 px-4">Offering Name</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Features Included</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/40 text-gray-300">
                  {products.map(item => (
                    <tr key={item.id} className="hover:bg-dark-800/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                      <td className="py-3 px-4 font-mono text-whatsapp">{item.price}</td>
                      <td className="py-3 px-4 text-gray-400 max-w-xs truncate">{item.features}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-brand-500/10 text-brand-400 border border-brand-500/20 font-semibold">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="px-2.5 py-1 text-red-400 hover:bg-red-500/10 rounded transition-all"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION C: MANAGE PHOTOS */}
        {activeSection === 'photos' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Manage Photo Portfolio</h2>
                <p className="text-xs text-gray-400">Connect studio photography to backend database arrays to render on site layouts.</p>
              </div>

              {/* Upload trigger */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUploadSimulated}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="photo-upload-input"
                />
                <label 
                  htmlFor="photo-upload-input"
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-gray-700 rounded-lg text-xs font-bold text-white flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>📤</span> Upload New Photo
                </label>
              </div>
            </div>

            {/* Photo preview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {photos.map(pic => (
                <div key={pic.id} className="bg-dark-800/40 border border-gray-800 rounded-xl overflow-hidden group">
                  <div className="aspect-video w-full bg-dark-900 relative overflow-hidden">
                    <img 
                      src={pic.url} 
                      alt={pic.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-[10px] text-gray-300 font-mono">{pic.date}</span>
                      <button 
                        onClick={() => setPhotos(photos.filter(p => p.id !== pic.id))}
                        className="text-[10px] px-2 py-0.5 bg-red-500 text-white rounded font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-white truncate">{pic.title}</h4>
                    <span className="text-[10px] text-gray-500 font-mono block mt-0.5">ID: {pic.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION D: MANAGE USERS / CRM LEADS */}
        {activeSection === 'users' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Registered Users & Captured CRM Leads</h2>
                <p className="text-xs text-gray-400">Authenticated viewer accounts and API submissions tracked from contact triggers.</p>
              </div>
              <button
                onClick={fetchCrmData}
                disabled={dataLoading}
                className="px-3 py-1.5 rounded bg-dark-800 hover:bg-dark-700 border border-gray-700 text-xs font-semibold"
              >
                {dataLoading ? 'Fetching API...' : '🔄 Pull Live Database'}
              </button>
            </div>

            {/* Layout tabs for internal data sets */}
            <div className="space-y-8">
              {/* Captured Funnel Leads */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-dark-800/20">
                <div className="p-3 bg-dark-800/50 border-b border-gray-800 text-xs font-bold text-whatsapp flex justify-between">
                  <span>🚀 Active Trial Registrations ({crmLeads.length})</span>
                  <span className="text-gray-400 font-normal">Source: /api/lead</span>
                </div>
                {crmLeads.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500">
                    No API funnel records captured yet. Submit lead forms on frontend page to sync instantly.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-dark-800/40 text-gray-500 uppercase tracking-wider border-b border-gray-800">
                      <tr>
                        <th className="py-2.5 px-4">Name</th>
                        <th className="py-2.5 px-4">Email Address</th>
                        <th className="py-2.5 px-4">Phone</th>
                        <th className="py-2.5 px-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/40 text-gray-300">
                      {crmLeads.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-dark-800/30">
                          <td className="py-2.5 px-4 font-bold text-white">{item.name}</td>
                          <td className="py-2.5 px-4 font-mono text-gray-400">{item.email}</td>
                          <td className="py-2.5 px-4 text-gray-500">{item.phone || '—'}</td>
                          <td className="py-2.5 px-4 text-gray-500 font-mono">
                            {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Recent'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* General Inbound Messages */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-dark-800/20">
                <div className="p-3 bg-dark-800/50 border-b border-gray-800 text-xs font-bold text-brand-300 flex justify-between">
                  <span>💬 Direct Contact Form Inquiries ({crmContacts.length})</span>
                  <span className="text-gray-400 font-normal">Source: /api/contact</span>
                </div>
                {crmContacts.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500">
                    No direct queries saved yet. Send info requests via final CTA triggers to record entries.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-dark-800/40 text-gray-500 uppercase tracking-wider border-b border-gray-800">
                      <tr>
                        <th className="py-2.5 px-4">Sender</th>
                        <th className="py-2.5 px-4">Contact Link</th>
                        <th className="py-2.5 px-4">Message Context</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/40 text-gray-300">
                      {crmContacts.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-dark-800/30 align-top">
                          <td className="py-2.5 px-4 font-bold text-white">{item.name}</td>
                          <td className="py-2.5 px-4 font-mono text-gray-400">{item.email}</td>
                          <td className="py-2.5 px-4 text-gray-300 whitespace-pre-line max-w-md">{item.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Branding */}
      <footer className="mt-auto py-4 border-t border-gray-800/60 text-center text-xs text-gray-600 font-mono">
        IntenPhoto Web Administration System V2 • Connected to Backend API Pipeline
      </footer>
    </div>
  );
};

export default AdminDashboard;
