import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCheck, 
  Search, 
  Download, 
  ShieldCheck, 
  ShieldAlert, 
  LogOut, 
  FolderOpen,
  ArrowRight,
  User,
  Menu,
  X,
  XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import { certificateAPI, authAPI } from '../../../services/api';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('my-certs');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout, updateUser } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle window resize for responsiveness (Tablet & Mobile < 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setSidebarOpen(false);
      } else {
        setIsMobile(false);
        setSidebarOpen(true);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileUpdate = (updatedUser) => {
    updateUser(updatedUser);
    setIsProfileModalOpen(false);
  };

  const menuItems = [
    { id: 'my-certs', label: 'My Certificates', icon: FolderOpen },
    { id: 'fetch', label: 'Fetch New Certificate', icon: Search },
    { id: 'verify', label: 'Verify Certificate', icon: FileCheck },
  ];

  return (
    <div className="flex h-screen bg-[#fcfcfc] overflow-hidden font-sans">
      
      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <ProfileModal 
            user={user} 
            onClose={() => setIsProfileModalOpen(false)} 
            onUpdate={handleProfileUpdate} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: isMobile ? -250 : 0, width: isMobile ? 250 : 250 }}
        animate={{ 
          x: isMobile ? (sidebarOpen ? 0 : -250) : 0,
          width: isMobile ? 250 : (sidebarOpen ? 250 : 80)
        }}
        transition={{ duration: 0.3 }}
        className={`bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30 transition-all fixed h-full lg:static ${isMobile ? 'top-0 left-0' : ''}`}
      >
        <div>
          <div className="flex items-center gap-3 px-2 mb-10 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#f53924] to-[#d9534f] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/30">
                S
              </div>
              {(sidebarOpen || isMobile) && <span className="text-xl font-bold text-gray-800">Student Portal</span>}
            </div>
            {isMobile && (
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500">
                <X size={24} />
              </button>
            )}
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all font-medium ${isActive ? 'bg-red-50 text-[#f53924]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <Icon size={20} className={isActive ? 'text-[#f53924]' : 'text-gray-400'} />
                  {(sidebarOpen || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all mt-auto group cursor-pointer"
        >
          <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          {(sidebarOpen || isMobile) && <span className="font-medium">Sign Out</span>}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-gray-50 via-white to-white">
        <header className="h-20 flex items-center justify-between px-6 md:px-10 z-10 sticky top-0 bg-white/80 backdrop-blur-md lg:bg-transparent">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 lg:hidden">
                <Menu size={24} />
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name || 'Student'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'Loading...'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
              {user?.name ? (
                <span className="font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <User size={20} />
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              {activeTab === 'my-certs' && <MyCertificatesTab />}
              {activeTab === 'fetch' && <FetchCertificateTab />}
              {activeTab === 'verify' && <VerifyCertificateTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function ProfileModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.updateProfile(formData);
      toast.success('Profile updated successfully');
      onUpdate(response.data.user);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924] bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924] bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924] bg-gray-50"
              placeholder="Leave blank to keep current"
            />
          </div>
          
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl font-medium text-white bg-[#f53924] hover:bg-[#d9534f] transition-colors disabled:opacity-70"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function MyCertificatesTab() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await certificateAPI.getMyCertificates();
        setCertificates(response.data.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        toast.error('Failed to load your certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDownload = async (certId) => {
    try {
      const response = await certificateAPI.download(certId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${certId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error('Failed to download certificate');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f53924]"></div></div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.length > 0 ? (
          certificates.map((cert, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={cert._id} 
              className="group relative bg-white rounded-2xl p-1 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-6 aspect-4/3 flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl translate-y-10 -translate-x-5"></div>
                
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm relative z-10 text-[#f53924]">
                  <FileCheck size={24} />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1 relative z-10">{cert.domain}</h3>
                <p className="text-sm text-gray-500 relative z-10">Issued to {cert.studentName}</p>
                
                <div className="mt-4 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-gray-200/50 relative z-10">
                  {new Date(cert.createdAt).toLocaleDateString()}
                </div>

                {/* Hover actions overlay */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                  <button 
                    onClick={() => handleDownload(cert.certificateId)}
                    className="w-10 h-10 rounded-full bg-[#f53924] text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-md shadow-red-500/30" 
                    title="Download High Quality PDF"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
              
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">{cert.certificateId}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={12} /> {cert.status || 'Valid'}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <FolderOpen size={32} />
            </div>
            <p>No certificates found. Use the "Fetch New Certificate" tab to add one.</p>
          </div>
        )}

        {/* Empty State / Add New Card */}
        {certificates.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: certificates.length * 0.1 }}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 aspect-4/3 hover:border-red-300 hover:bg-red-50/30 cursor-pointer transition-all group"
            onClick={() => {
              toast('Use the "Fetch New Certificate" tab to add certificates', { icon: 'ℹ️' });
            }}
          >
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-sm transition-all text-gray-400 group-hover:text-[#f53924] group-hover:scale-110">
              <Search size={28} />
            </div>
            <h3 className="font-semibold text-gray-700">Fetch Missing Certificate</h3>
            <p className="text-sm text-gray-400 text-center mt-2 max-w-[200px]">Have a unique ID? Add more certificates to your wallet.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function FetchCertificateTab() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedCert, setFetchedCert] = useState(null);

  const handleFetch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const certId = e.target.certId.value;

    try {
      const response = await certificateAPI.search(certId);
      if (response.data.success) {
        setFetchedCert(response.data.data);
        setStep(2);
        toast.success('Certificate fetched successfully!');
      } else {
        toast.error(response.data.message || 'Certificate not found');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Certificate not found or server error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!fetchedCert) return;
    try {
      const response = await certificateAPI.download(fetchedCert.certificateId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${fetchedCert.certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error('Failed to download certificate');
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-[#f53924]" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Claim Your Certificate</h2>
                <p className="text-gray-500 mt-2">Enter the Unique ID sent to your email to fetch and add it to your wallet.</p>
              </div>

              <form onSubmit={handleFetch} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Certificate Unique ID</label>
                  <input name="certId" required type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924]/50 focus:border-[#f53924] transition-all bg-gray-50/50 hover:bg-gray-50 font-mono tracking-widest placeholder:tracking-normal placeholder:font-sans" placeholder="e.g. CERT-ABCD-1234"/>
                </div>
                <button disabled={isLoading} type="submit" className="w-full py-4 bg-linear-to-r from-[#f53924] to-[#d9534f] hover:from-[#e0301d] hover:to-[#c94d49] text-white rounded-xl font-bold tracking-wide shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Fetch Certificate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
                <FileCheck className="text-green-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Found!</h2>
              <p className="text-gray-500 mb-8">We found this certificate in our records.</p>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100 flex items-center gap-5">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#f53924]">
                  <FileCheck size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{fetchedCert?.domain}</h4>
                  <p className="text-sm text-gray-500">Issued to {fetchedCert?.studentName} • {new Date(fetchedCert?.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                  Fetch Another
                </button>
                <button onClick={handleDownload} className="flex-1 py-3.5 bg-[#f53924] text-white rounded-xl font-semibold hover:shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2">
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function VerifyCertificateTab() {
  const [verifyStatus, setVerifyStatus] = useState(null); // 'valid', 'revoked', 'not-found', 'name-mismatch', null
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerifyStatus(null);
    setVerificationData(null);
    
    const certId = e.target.certId.value;
    const studentName = e.target.studentName.value;

    try {
      const response = await certificateAPI.verify({ certificateId: certId, studentName });
      
      // Assuming response format from controller:
      // { success: true, verified: false, status: 'not-found', message: '...' }
      // { success: true, verified: true, status: 'valid', data: ... }
      
      if (response.data.success) {
        if (response.data.verified) {
            setVerifyStatus('valid');
            setVerificationData(response.data.data);
        } else {
            // Handle specific status if backend provides it, or fallback
            setVerifyStatus(response.data.status || 'not-found');
        }
      } else {
        setVerifyStatus('not-found');
      }
    } catch (error) {
      console.error(error);
      setVerifyStatus('not-found'); // Default to not found on error
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-8 items-start relative max-w-5xl mx-auto">
      {/* Verify Input Section */}
      <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Verify Authenticity</h2>
          <p className="text-gray-500 mt-2 leading-relaxed text-sm">
            Check if a certificate is valid, authentic, and hasn't been revoked by the issuer. Instantly verify credentials issued through our platform.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Certificate Unique ID</label>
            <input name="certId" required type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-gray-50/50 hover:bg-gray-50 font-mono tracking-widest placeholder:tracking-normal placeholder:font-sans" placeholder="Enter ID to verify..."/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name (as on certificate)</label>
            <input name="studentName" required type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-gray-50/50 hover:bg-gray-50" placeholder="e.g. John Doe"/>
          </div>
          
          <button disabled={isVerifying} type="submit" className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold tracking-wide shadow-md hover:shadow-xl transition-all flex justify-center items-center gap-2 group disabled:opacity-70">
            {isVerifying ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Run Verification <Search size={18} /></>
            )}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-1/2 min-h-[400px]">
        <AnimatePresence mode="wait">
          {!verifyStatus && !isVerifying && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-600 mb-2">Awaiting Verification Request</h3>
              <p className="text-sm text-gray-400 max-w-xs">Enter a certificate ID and student name to securely query our verified database.</p>
            </motion.div>
          )}

          {isVerifying && (
            <motion.div 
              key="verifying"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center p-10 border border-gray-100 bg-white rounded-3xl shadow-sm"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-gray-100 rounded-full border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                  <Search size={24} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Verifying credential integrity...</h3>
              <p className="text-sm text-gray-500">Checking issuer signatures and revocation status</p>
            </motion.div>
          )}

          {verifyStatus === 'valid' && verificationData && (
            <motion.div 
              key="valid"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white border-2 border-green-500/20 rounded-3xl p-8 shadow-[0_8px_30px_rgba(34,197,94,0.12)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
              
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 drop-shadow-sm">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Certificate is Valid</h3>
              <p className="text-green-700 font-medium mb-6 inline-flex items-center gap-2 bg-green-50 py-2 px-4 rounded-lg border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Blockchain Verified Signature
              </p>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-100 text-sm">
                  <span className="text-gray-400 uppercase tracking-wider text-xs block mb-1">Issued To</span>
                  <span className="font-semibold text-gray-800 text-base">{verificationData.studentName}</span>
                </div>
                <div className="pb-4 border-b border-gray-100 text-sm">
                  <span className="text-gray-400 uppercase tracking-wider text-xs block mb-1">Credential</span>
                  <span className="font-semibold text-gray-800">{verificationData.domain}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400 uppercase tracking-wider text-xs block mb-1">Issue Date</span>
                  <span className="font-semibold text-gray-800">{new Date(verificationData.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          )}

          {verifyStatus === 'revoked' && (
            <motion.div 
              key="revoked"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-red-50/50 border-2 border-red-500/30 rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 relative">
                <ShieldAlert size={32} />
                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Certificate Revoked</h3>
              <p className="text-red-700 font-medium mb-4 inline-flex items-center gap-2 bg-red-100/50 py-2 px-4 rounded-lg border border-red-200">
                <XCircle size={16} /> Unauthorized or Invalidated
              </p>
              <p className="text-gray-600 text-sm leading-relaxed bg-white/60 p-4 rounded-xl border border-red-100">
                This certificate has been formally revoked by the issuing authority. It is no longer valid for verification purposes.
              </p>
            </motion.div>
          )}

          {(verifyStatus === 'not-found' || verifyStatus === 'name-mismatch') && (
            <motion.div 
              key="not-found"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white border-2 border-gray-200 rounded-3xl p-8"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {verifyStatus === 'name-mismatch' ? 'Name Mismatch' : 'Record Not Found'}
              </h3>
              <p className="text-gray-500 mb-6">
                {verifyStatus === 'name-mismatch' 
                  ? "We found a certificate with this ID, but the student name doesn't match our records." 
                  : "We couldn't find any certificate matching this ID in our secure database."}
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside ml-2">
                <li>Check for typos in the ID</li>
                <li>Ensure the name matches exactly as printed</li>
                <li>Contact the issuer if you believe this is an error</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
