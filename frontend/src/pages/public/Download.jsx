import React, { useState } from 'react'
import { Download, FileText, Award, Calendar, User, Search, Loader } from 'lucide-react'

const CertificateDownload = () => {
  const [studentId, setStudentId] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!studentId.trim()) {
      setError('Please enter a student ID')
      return
    }

    setIsSearching(true)
    setError('')
    setSearchResults(null)

    // Simulate API call
    setTimeout(() => {
      // Mock search results
      const hasResults = Math.random() > 0.2 // 80% chance of having results
      if (hasResults) {
        setSearchResults([
          {
            id: 'CERT-2024-001',
            studentName: 'John Doe',
            course: 'Bachelor of Computer Science',
            institution: 'University of Technology',
            issueDate: '2024-01-15',
            status: 'issued'
          },
          {
            id: 'CERT-2024-002',
            studentName: 'John Doe',
            course: 'Master of Business Administration',
            institution: 'Business School',
            issueDate: '2023-12-20',
            status: 'issued'
          }
        ])
      } else {
        setSearchResults([])
      }
      setIsSearching(false)
    }, 1500)
  }

  const handleDownload = (certificateId) => {
    // Simulate download
    const link = document.createElement('a')
    link.href = `/api/certificates/${certificateId}/download`
    link.download = `certificate-${certificateId}.pdf`
    link.click()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Download Certificates
            </h1>
            <p className="text-xl text-gray-300">
              Search and download your verified certificates
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="studentId" className="block text-white text-sm font-medium mb-2">
                  Student ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter your student ID (e.g., STU-2024-001)"
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
                disabled={isSearching}
                className="w-full bg-[#f53924] text-white py-3 rounded-lg font-semibold hover:bg-[#923830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search Certificates'
                )}
              </button>
            </form>
          </div>

          {/* Search Results */}
          {searchResults && (
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Your Certificates</h2>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No certificates found for this student ID.</p>
                  <p className="text-gray-500 text-sm mt-2">Please check your student ID and try again.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((certificate) => (
                    <div key={certificate.id} className="bg-gray-700 rounded-lg p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#f53924] rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{certificate.course}</h3>
                          <div className="flex items-center gap-4 text-gray-300 text-sm mt-1">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{certificate.studentName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{certificate.issueDate}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{certificate.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                          {certificate.status}
                        </span>
                        <button
                          onClick={() => handleDownload(certificate.id)}
                          className="bg-[#f53924] text-white px-4 py-2 rounded-lg hover:bg-[#923830] transition-colors flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h3 className="text-white text-lg font-semibold mb-4">How to Download Certificates</h3>
            <ol className="text-gray-300 space-y-2 list-decimal list-inside">
              <li>Enter your student ID in the search field above</li>
              <li>Click "Search Certificates" to find your certificates</li>
              <li>Review your available certificates in the results</li>
              <li>Click the "Download" button next to any certificate</li>
              <li>Your certificate will be downloaded as a PDF file</li>
            </ol>
            <div className="mt-4 p-4 bg-yellow-900 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> Certificates are only available for download if they have been issued and verified by your institution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateDownload