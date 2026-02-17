import React, { useState } from 'react'
import { Search, CheckCircle, XCircle, Loader } from 'lucide-react'

const VerifyCredentials = () => {
  const [credentialId, setCredentialId] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [error, setError] = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!credentialId.trim()) {
      setError('Please enter a credential ID')
      return
    }

    setIsVerifying(true)
    setError('')
    setVerificationResult(null)

    // Simulate API call
    setTimeout(() => {
      // Mock verification result
      const isValid = Math.random() > 0.3 // 70% chance of being valid
      setVerificationResult({
        credentialId,
        isValid,
        studentName: isValid ? 'John Doe' : null,
        institution: isValid ? 'University of Technology' : null,
        course: isValid ? 'Bachelor of Computer Science' : null,
        issueDate: isValid ? '2024-01-15' : null,
        blockchainHash: isValid ? '0x742d35cc6c3c7a1b3e8b9e5f3a2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2' : null
      })
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Verify Credentials
            </h1>
            <p className="text-xl text-gray-300">
              Enter a credential ID to verify its authenticity
            </p>
          </div>

          {/* Verification Form */}
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="credentialId" className="block text-white text-sm font-medium mb-2">
                  Credential ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="credentialId"
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    placeholder="Enter credential ID (e.g., CRED-2024-001)"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#f53924] focus:border-transparent outline-none"
                  />
                  <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#f53924] text-white py-3 rounded-lg font-semibold hover:bg-[#923830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Credential'
                )}
              </button>
            </form>
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div className={`rounded-lg p-8 ${verificationResult.isValid ? 'bg-green-900 border border-green-700' : 'bg-red-900 border border-red-700'}`}>
              <div className="flex items-center gap-3 mb-6">
                {verificationResult.isValid ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
                <h2 className={`text-2xl font-bold ${verificationResult.isValid ? 'text-green-400' : 'text-red-400'}`}>
                  {verificationResult.isValid ? 'Credential Verified Successfully' : 'Invalid Credential'}
                </h2>
              </div>

              {verificationResult.isValid ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 text-sm">Student Name</p>
                      <p className="text-white font-semibold">{verificationResult.studentName}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Institution</p>
                      <p className="text-white font-semibold">{verificationResult.institution}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Course</p>
                      <p className="text-white font-semibold">{verificationResult.course}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Issue Date</p>
                      <p className="text-white font-semibold">{verificationResult.issueDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Blockchain Hash</p>
                    <p className="text-white font-mono text-sm break-all">{verificationResult.blockchainHash}</p>
                  </div>
                </div>
              ) : (
                <p className="text-red-300">
                  The credential ID you entered could not be verified. Please check the ID and try again.
                </p>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h3 className="text-white text-lg font-semibold mb-4">How to Verify Credentials</h3>
            <ol className="text-gray-300 space-y-2 list-decimal list-inside">
              <li>Obtain the credential ID from the certificate holder</li>
              <li>Enter the credential ID in the verification field above</li>
              <li>Click "Verify Credential" to check authenticity</li>
              <li>Review the verification results displayed below</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyCredentials