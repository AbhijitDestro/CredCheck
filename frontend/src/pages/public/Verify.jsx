import React, { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Search, ShieldCheck, ShieldAlert, FileText, CheckCircle, XCircle, Award, User, Calendar, Loader } from 'lucide-react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import { certificateAPI } from '../../services/api'

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState(null) // null, 'valid', 'revoked', 'not-found'
  const [resultData, setResultData] = useState(null)
  const [error, setError] = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!certId.trim()) {
      setError('Please enter a Certificate ID')
      return
    }

    setIsVerifying(true)
    setError('')
    setResult(null)
    setResultData(null) // Added this line

    try {
      const res = await certificateAPI.search(certId)
      const certInfo = res.data.data
      setResultData(certInfo)
      
      if (certInfo.status === 'revoked') {
        setResult('revoked')
      } else {
        setResult('valid')
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setResult('not-found')
      } else {
        setError('An error occurred during verification. Please try again.')
      }
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-600 flex flex-col">
      <Navbar />
      
      <main className="flex-1 relative pt-32 pb-20 px-4 flex flex-col justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Public Verification Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Verify a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Certificate
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Instantly authenticate credentials. Enter the unique certificate ID to check its validity and ensure it hasn't been revoked.
            </p>
          </Motion.div>

          {/* Verification Search Box */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-blue-900/5 max-w-3xl mx-auto mb-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px]"></div>
            
            <form onSubmit={handleVerify} className="relative z-10">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., CERT-1234)"
                  className="w-full pl-16 pr-40 py-5 bg-white border-2 border-gray-100 rounded-2xl text-lg text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-mono tracking-wider focus:shadow-sm"
                />
                <Motion.button
                  type="submit"
                  disabled={isVerifying || !certId.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-8 rounded-xl font-semibold shadow-lg shadow-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-all flex items-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span className="hidden sm:inline">Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify</span>
                      <ShieldCheck className="w-5 h-5" />
                    </>
                  )}
                </Motion.button>
              </div>
              {error && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-3 ml-5 flex items-center gap-1"
                >
                  <XCircle size={14} /> {error}
                </Motion.p>
              )}
              <div className="mt-4 flex gap-4 text-xs text-gray-400 ml-5 font-medium items-center">
                <span>Try these test IDs:</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono tracking-widest cursor-pointer hover:bg-gray-200" onClick={() => setCertId('CERT-VALID')}>CERT-VALID</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono tracking-widest cursor-pointer hover:bg-gray-200" onClick={() => setCertId('CERT-REV')}>CERT-REV</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono tracking-widest cursor-pointer hover:bg-gray-200" onClick={() => setCertId('CERT-ERR')}>CERT-ERR</span>
              </div>
            </form>
          </Motion.div>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {result === 'valid' && (
              <Motion.div
                key="valid"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 relative">
                      <ShieldCheck className="w-12 h-12 text-green-500 relative z-10" />
                      <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-4 border border-green-100">
                        <CheckCircle className="w-4 h-4" />
                        Verified Authentic
                      </div>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{resultData?.domain}</h2>
                      <p className="text-gray-500 text-lg mb-8">Issued by CredCheck Verification System</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div>
                          <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-2">
                            <User className="w-4 h-4" /> Issued To
                          </p>
                          <p className="font-bold text-gray-900 text-lg">{resultData?.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Issue Date
                          </p>
                          <p className="font-bold text-gray-900 text-lg">{new Date(resultData?.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                        <div className="sm:col-span-2 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">
                            Certificate ID
                          </p>
                          <p className="font-mono font-medium text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200 inline-block">
                            {resultData?.certificateId || certId.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}

            {result === 'revoked' && (
              <Motion.div
                key="revoked"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="max-w-2xl mx-auto bg-white rounded-[2rem] border border-red-100 shadow-xl overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-600"></div>
                <div className="p-8 md:p-12 text-center">
                  <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <ShieldAlert className="w-12 h-12 text-red-500" />
                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping"></div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Certificate Revoked</h2>
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium border border-red-100 mb-6">
                    <XCircle className="w-5 h-5" /> This credential is no longer valid
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                    The issuing institution has revoked this certificate. It cannot be used for official verification purposes.
                  </p>
                  <div className="mt-8 pt-6 border-t border-gray-100 max-w-sm mx-auto">
                    <p className="text-sm text-gray-400 mb-1">Queried ID</p>
                    <p className="font-mono text-gray-800">{certId.toUpperCase()}</p>
                  </div>
                </div>
              </Motion.div>
            )}

            {result === 'not-found' && (
              <Motion.div
                key="not-found"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="max-w-2xl mx-auto bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden"
              >
                <div className="p-8 md:p-12 text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No Record Found</h2>
                  <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    We couldn't find any certificate matching the ID <span className="font-mono font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">{certId.toUpperCase()}</span>.
                  </p>
                  
                  <div className="bg-gray-50 text-left p-6 rounded-2xl max-w-sm mx-auto border border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-500" /> Common issues:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                      <li>Typo in the certificate ID</li>
                      <li>O/0 or I/1 character confusion</li>
                      <li>Certificate hasn't been issued yet</li>
                    </ul>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default VerifyCertificate
