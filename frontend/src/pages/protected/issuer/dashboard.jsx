import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  FileText, 
  Users, 
  AlertCircle,
  UploadCloud,
  Layers,
  Search,
  CheckCircle,
  XCircle,
  LogOut,
  ChevronRight,
  Download,
  FileSpreadsheet,
  User,
  X,
  Menu
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import { authAPI, issuerAPI } from '../../../services/api';

export default function IssuerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, updateUser, logout } = useAuthStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  
  // Data states
  const [stats, setStats] = useState({
    totalCertificates: 0,
    downloadedCertificates: 0,
    revokedCertificates: 0,
    recentCertificates: []
  });
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle window resize
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
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, certsRes] = await Promise.all([
        issuerAPI.getStats(),
        issuerAPI.getAllCertificates(1, 100) // Fetch first 100 for now
      ]);
      setStats(statsRes.data.data);
      setCertificates(certsRes.data.data.certificates);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Fetch profile
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getMe();
        updateUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [updateUser]);

  const handleProfileUpdate = (updatedUser) => {
    updateUser(updatedUser);
    setIsProfileModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRevoke = async (id) => {
    try {
      await issuerAPI.deleteCertificate(id);
      toast.success('Certificate revoked successfully');
      fetchData(); // Refresh data
    } catch (error) {
      toast.error('Failed to revoke certificate');
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'issue', label: 'Issue Certificate', icon: FileText },
    { id: 'history', label: 'Students & History', icon: Users },
    { id: 'revoke', label: 'Revoke Certificates', icon: AlertCircle },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
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
        className={`bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4 transition-all fixed h-full z-30 lg:static ${isMobile ? 'top-0 left-0' : ''}`}
      >
        <div>
          <div className="flex items-center justify-between gap-3 px-2 mb-10">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="CredCheck" className="w-10 h-10 rounded-xl" />
              {(sidebarOpen || isMobile) && <span className="text-xl font-bold bg-gradient-to-r from-[#f53924] to-[#7a2823] bg-clip-text text-transparent">CredCheck</span>}
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
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-[#f53924] text-white shadow-md shadow-red-500/20' : 'text-gray-500 hover:bg-red-50 hover:text-[#f53924]'}`}
                >
                  <Icon size={20} />
                  {(sidebarOpen || isMobile) && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:bg-gray-100 transition-all mt-auto hover:text-red-500 cursor-pointer"
        >
          <LogOut size={20} />
          {(sidebarOpen || isMobile) && <span className="font-medium">Sign Out</span>}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 lg:hidden">
                <Menu size={24} />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">Welcome back to your issuer portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name || 'Issuer'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'Loading...'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-gray-500">
              {user?.name ? (
                <span className="font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <User size={20} />
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f8f9fa]">
          {loading ? (
             <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f53924]"></div></div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'overview' && <OverviewTab stats={stats} />}
                {activeTab === 'issue' && <IssueTab onIssue={fetchData} />}
                {activeTab === 'history' && <HistoryTab certificates={certificates} />}
                {activeTab === 'revoke' && <RevokeTab certificates={certificates} onRevoke={handleRevoke} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}

function ProfileModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    organizationName: user?.organizationName || ''
  });
  const [signatureFile, setSignatureFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(user?.signatureBase64 || '');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignatureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      if (formData.password) data.append('password', formData.password);
      if (formData.organizationName !== undefined) data.append('organizationName', formData.organizationName);
      if (signatureFile) data.append('signature', signatureFile);

      const response = await authAPI.updateProfile(data);
      toast.success('Profile updated successfully');
      onUpdate(response.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
            <input 
              type="text" 
              value={formData.organizationName}
              onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924] bg-gray-50"
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Signature Image</label>
            <div className="flex items-center gap-4">
              {signaturePreview && (
                <div className="w-16 h-16 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                  <img src={signaturePreview} alt="Signature Preview" className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-[#f53924] hover:file:bg-red-100"
                />
              </div>
            </div>
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

function OverviewTab({ stats }) {
  const statCards = [
    { label: 'Total Certificates', value: stats.totalCertificates, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Downloaded', value: stats.downloadedCertificates, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Revoked', value: stats.revokedCertificates, icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={26} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Issuances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-100">
                <th className="font-medium pb-3 px-4 w-1/4">Certificate ID</th>
                <th className="font-medium pb-3 px-4 w-1/4">Student Name</th>
                <th className="font-medium pb-3 px-4 w-1/4">Date Issued</th>
                <th className="font-medium pb-3 px-4 w-1/4">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentCertificates && stats.recentCertificates.length > 0 ? (
                stats.recentCertificates.map((cert, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-700">{cert.certificateId}</td>
                    <td className="py-4 px-4 text-gray-600">{cert.studentName}</td>
                    <td className="py-4 px-4 text-gray-500">{new Date(cert.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cert.status === 'revoked' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {cert.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">No certificates issued yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IssueTab({ onIssue }) {
  const [issueType, setIssueType] = useState('single');
  const [isLoading, setIsLoading] = useState(false);

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = {
      studentName: formData.get('studentName'),
      studentEmail: formData.get('studentEmail'),
      courseName: formData.get('courseName')
    };

    try {
      await issuerAPI.issueCertificate(data);
      toast.success('Certificate issued successfully!');
      e.target.reset();
      if (onIssue) onIssue();
    } catch (error) {
      toast.error('Failed to issue certificate');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDFTemplate = async (e) => {
    if (e) e.preventDefault();
    try {
      const toastId = toast.loading('Generating design template...');
      const response = await issuerAPI.previewTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Certificate_Template.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Design preview downloaded!', { id: toastId });
    } catch (error) {
      toast.error('Failed to download design template');
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await issuerAPI.uploadCertificates(formData);
      if (res.data.data && res.data.data.errors && res.data.data.errors.length > 0) {
        toast.error(`Inserted ${res.data.data.inserted}. Error: ${res.data.data.errors[0]}`);
      } else {
        toast.success(res.data.message || 'Certificates uploaded successfully!');
      }
      if (onIssue) onIssue();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload certificates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = (e) => {
    e.preventDefault();
    // Create CSV content
    const headers = ['certificateId', 'studentName', 'email', 'internshipDomain', 'startDate', 'endDate'];
    const exampleRow = ['CERT-001', 'John Doe', 'john@example.com', 'Web Development', '2023-01-01', '2023-06-30'];
    const csvContent = "data:text/csv;charset=utf-8," + 
      headers.join(",") + "\n" + 
      exampleRow.join(",");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "certificate_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
      <div className="flex border-b border-gray-100 items-center">
        <button 
          onClick={() => setIssueType('single')}
          className={`flex-1 py-4 font-medium transition-all ${issueType === 'single' ? 'text-[#f53924] border-b-2 border-[#f53924]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          Single Certificate
        </button>
        <button 
          onClick={() => setIssueType('bulk')}
          className={`flex-1 py-4 font-medium transition-all ${issueType === 'bulk' ? 'text-[#f53924] border-b-2 border-[#f53924]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          Bulk Upload (Excel)
        </button>
        <div className="pr-4 pl-2">
          <button 
            type="button"
            onClick={handleDownloadPDFTemplate} 
            className="px-4 py-2 bg-[#f53924]/10 text-[#f53924] text-sm font-semibold rounded-lg hover:bg-[#f53924]/20 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <FileText size={16} /> Preview Design
          </button>
        </div>
      </div>

      <div className="p-8 flex-1">
        <AnimatePresence mode="wait">
          {issueType === 'single' ? (
            <motion.form 
              key="single"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSingleSubmit}
              className="max-w-xl mx-auto space-y-5"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#f53924]">
                  <FileText size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Issue to a single student</h2>
                <p className="text-gray-500 text-sm mt-1">An email will be sent to the student with their unique ID.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Full Name</label>
                <input name="studentName" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924] transition-all bg-gray-50 focus:bg-white" placeholder="e.g. John Doe"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Email Address</label>
                <input name="studentEmail" required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924] transition-all bg-gray-50 focus:bg-white" placeholder="john@example.com"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course / Assessment Name</label>
                <input name="courseName" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f53924] transition-all bg-gray-50 focus:bg-white" placeholder="e.g. Advanced React Patterns"/>
              </div>
              <button disabled={isLoading} type="submit" className="w-full py-3.5 bg-gradient-to-r from-[#f53924] to-[#d9534f] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all flex justify-center items-center gap-2 disabled:opacity-70">
                {isLoading ? 'Issuing...' : (
                  <>Issue Certificate <ChevronRight size={18} /></>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="bulk"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-xl mx-auto flex flex-col items-center justify-center h-full min-h-[300px]"
            >
              <div className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-red-300 transition-all cursor-pointer group relative">
                <input 
                  type="file" 
                  accept=".xlsx, .xls, .csv" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleBulkUpload}
                  onClick={(e) => { e.target.value = null }}
                  disabled={isLoading}
                />
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="text-[#f53924]" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {isLoading ? 'Uploading...' : 'Upload Excel/CSV File'}
                </h3>
                <p className="text-gray-500 text-sm text-center mt-2 mb-6 max-w-sm">
                  Upload an .xlsx or .csv file containing the required columns.
                </p>
                <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
                  <UploadCloud size={18} /> Select File
                </button>
              </div>

              <div className="mt-8 w-full">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} /> Required Columns Format
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs text-left">
                      <thead className="bg-blue-100/50 text-blue-800">
                        <tr>
                          <th className="px-3 py-2 rounded-l-lg">certificateId</th>
                          <th className="px-3 py-2">studentName</th>
                          <th className="px-3 py-2">email</th>
                          <th className="px-3 py-2">internshipDomain</th>
                          <th className="px-3 py-2">startDate</th>
                          <th className="px-3 py-2 rounded-r-lg">endDate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-blue-600">
                          <td className="px-3 py-2">CERT-001</td>
                          <td className="px-3 py-2">John Doe</td>
                          <td className="px-3 py-2">john@ex.com</td>
                          <td className="px-3 py-2">Web Dev</td>
                          <td className="px-3 py-2">2023-01-01</td>
                          <td className="px-3 py-2">2023-06-30</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={handleDownloadTemplate}
                    className="text-[#f53924] hover:underline flex items-center justify-center gap-1 mx-auto text-sm font-medium"
                  >
                    <Download size={16} /> Download Template File (CSV)
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HistoryTab({ certificates }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCerts = certificates.filter(cert => 
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert.studentEmail && cert.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by student or ID..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 bg-gray-50 w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-y border-gray-100">
              <th className="font-semibold py-4 px-4">Certificate ID</th>
              <th className="font-semibold py-4 px-4">Student Name</th>
              <th className="font-semibold py-4 px-4">Email Address</th>
              <th className="font-semibold py-4 px-4">Date Issued</th>
              <th className="font-semibold py-4 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCerts.length > 0 ? (
              filteredCerts.map(cert => (
                <tr key={cert._id} className="border-b border-gray-50 hover:bg-red-50/30 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-800">{cert.certificateId}</td>
                  <td className="py-4 px-4 text-gray-600">{cert.studentName}</td>
                  <td className="py-4 px-4 text-gray-500 text-sm">{cert.studentEmail}</td>
                  <td className="py-4 px-4 text-gray-500 text-sm">{new Date(cert.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${cert.status === 'revoked' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                      {cert.status === 'revoked' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                      {cert.status === 'revoked' ? 'Revoked' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No matching certificates found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevokeTab({ certificates, onRevoke }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCerts = certificates.filter(cert => 
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 border-t-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search by ID or email to revoke..." 
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 bg-gray-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
              <th className="font-semibold py-4 px-4">Certificate ID</th>
              <th className="font-semibold py-4 px-4">Student Name</th>
              <th className="font-semibold py-4 px-4">Status</th>
              <th className="font-semibold py-4 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCerts.length > 0 ? (
              filteredCerts.map((cert) => (
                <tr key={cert._id} className="border-b border-gray-100 hover:bg-red-50/30 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-800">{cert.certificateId}</td>
                  <td className="py-4 px-4 text-gray-600">
                    <p>{cert.studentName}</p>
                    <p className="text-xs text-gray-400">{cert.studentEmail}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cert.status === 'revoked' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {cert.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      disabled={cert.status === 'revoked'}
                      onClick={() => onRevoke(cert._id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${cert.status === 'revoked' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'}`}
                    >
                      {cert.status === 'revoked' ? 'Revoked' : 'Revoke'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">No certificates found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
