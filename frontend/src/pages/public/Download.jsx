import React, { useState } from 'react'
import { Download, FileText, Award, Calendar, User, Search, Loader, FileCheck, ArrowRight } from 'lucide-react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { certificateAPI } from '../../services/api'
import toast from 'react-hot-toast'

const CertificateDownload = () => {
  const [certId, setCertId] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!certId.trim()) {
      setError('Please enter a Certificate ID')
      return
    }

    setIsSearching(true)
    setError('')
    setSearchResults(null)

    try {
      const res = await certificateAPI.search(certId)
      if (res.data.success && res.data.data) {
        setSearchResults([res.data.data])
      } else {
        setSearchResults([])
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSearchResults([])
      } else {
        setError('An error occurred while searching for the certificate.')
      }
    } finally {
      setIsSearching(false)
    }
  }

  const handleDownload = async (certificateId) => {
    try {
      const toastId = toast.loading('Generating PDF...')
      const response = await certificateAPI.download(certificateId)
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Certificate_${certificateId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      toast.success('Downloaded successfully!', { id: toastId })
    } catch (err) {
      toast.error('Failed to download certificate.')
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-600">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-4 min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-medium text-sm mb-6">
              <Download className="w-4 h-4" />
              <span>Digital Downloads</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Access Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Certificates
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Securely access and download your verified academic credentials using your unique Certificate ID.
            </p>
          </Motion.div>

          {/* Search Section */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-2xl shadow-gray-200/50 max-w-3xl mx-auto mb-16"
          >
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., CERT-...)"
                  className="w-full pl-14 pr-36 py-5 bg-gray-50/50 border border-gray-200 rounded-2xl text-lg text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 focus:bg-white transition-all outline-none"
                />
                <Motion.button
                  type="submit"
                  disabled={isSearching || !certId.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 rounded-xl font-semibold shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-orange-500/30 transition-all flex items-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span className="hidden sm:inline">Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span className="hidden sm:inline">Search</span>
                    </>
                  )}
                </Motion.button>
              </div>
              {error && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-3 ml-4"
                >
                  {error}
                </Motion.p>
              )}
            </form>
          </Motion.div>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {searchResults && (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex items-center justify-between mb-8 px-4">
                  <h2 className="text-2xl font-bold text-gray-900">Available Certificates</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                    {searchResults.length} Found
                  </span>
                </div>
                
                {searchResults.length === 0 ? (
                  <Motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-gray-50/50 rounded-3xl border border-gray-100"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Certificates Found</h3>
                    <p className="text-gray-500">We couldn't find any certificates associated with this ID.</p>
                  </Motion.div>
                ) : (
                  <div className="grid gap-6">
                    {searchResults.map((certificate, index) => (
                      <Motion.div
                        key={certificate.certificateId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-100 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                          {/* Icon/Thumbnail */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-50 rounded-2xl flex items-center justify-center border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                              <Award className="w-10 h-10 text-orange-600" />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-grow">
                            <div className="flex flex-wrap gap-3 mb-3">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                                <FileCheck className="w-3.5 h-3.5" />
                                Verified
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                                {certificate.certificateId}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                              {certificate.internshipDomain}
                            </h3>
                            <p className="text-gray-600 mb-4">{certificate.institution || 'Credential'}</p>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{certificate.studentName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Issued: {new Date(certificate.issueDate || certificate.createdAt || Date.now()).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action */}
                          <div className="flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 md:pl-8 md:border-l">
                            <Motion.button
                              onClick={() => handleDownload(certificate.certificateId)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full md:w-auto bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group/btn"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download PDF</span>
                              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                            </Motion.button>
                          </div>
                        </div>
                      </Motion.div>
                    ))}
                  </div>
                )}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CertificateDownload
