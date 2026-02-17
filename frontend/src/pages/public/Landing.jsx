import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldUser, ArrowDownToLine, CheckCircle, Clock, Shield, Award, Users, Globe, Download, Search, Zap, Star, ArrowRight, User } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section - Text Left, Image Right */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                Verify Your Credentials <br/> with <span className="text-[#f53924]">CredCheck</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-300">
                Secure, fast, and reliable certificate platform for educational institutions, employers and professionals worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/verify-credentials" className="bg-[#923830] text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-[#f53924] cursor-pointer flex items-center justify-center gap-2 transition-colors">
                  <ShieldUser /> Verify Certificate
                </Link>
                <Link to="/download" className="border border-white text-white px-8 py-3 rounded-xl text-lg font-bold cursor-pointer hover:bg-white hover:text-black flex items-center justify-center gap-2 transition-colors">
                  <ArrowDownToLine /> Download Certificate
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src="/hero-students-large.png" alt="Students celebrating with certificates" className="w-full h-auto rounded-2xl shadow-2xl"/>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Simple steps to verify and download your credentials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 bg-[#f53924] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1. Search Certificate</h3>
              <p className="text-gray-300">Enter your certificate ID or upload your document to begin verification</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 bg-[#f53924] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2. Verify Authenticity</h3>
              <p className="text-gray-300">Our system instantly validates your credentials against our secure database</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 bg-[#f53924] rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">3. Download & Share</h3>
              <p className="text-gray-300">Get verified digital copies ready for sharing with employers and institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section - Bento Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-300">Comprehensive credential verification solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2 lg:col-span-2 p-8 bg-gradient-to-br from-[#923830] to-[#f53924] rounded-2xl text-white">
              <Shield className="w-12 h-12 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Secure Verification</h3>
              <p className="text-lg opacity-90">Advanced blockchain technology ensures tamper-proof credential verification with military-grade encryption.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl text-white hover:bg-gray-700 transition-colors">
              <Clock className="w-10 h-10 text-[#f53924] mb-4" />
              <h3 className="text-2xl font-bold mb-3">Instant Results</h3>
              <p className="text-gray-300">Get verification results in seconds, not days. Our AI-powered system works 24/7.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl text-white hover:bg-gray-700 transition-colors">
              <Globe className="w-10 h-10 text-[#f53924] mb-4" />
              <h3 className="text-2xl font-bold mb-3">Global Network</h3>
              <p className="text-gray-300">Connect with institutions worldwide. Verify credentials from any country, any language.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl text-white hover:bg-gray-700 transition-colors">
              <Award className="w-10 h-10 text-[#f53924] mb-4" />
              <h3 className="text-2xl font-bold mb-3">Trusted by Leaders</h3>
              <p className="text-gray-300">Used by Fortune 500 companies and top universities for reliable credential verification.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl text-white hover:bg-gray-700 transition-colors">
              <Users className="w-10 h-10 text-[#f53924] mb-4" />
              <h3 className="text-2xl font-bold mb-3">Multi-User Support</h3>
              <p className="text-gray-300">Team accounts with role-based access. Perfect for HR departments and admissions offices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Marquee */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-300">Trusted by thousands of professionals worldwide</p>
          </div>
          <div className="marquee">
            <div className="marquee-content">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="mx-4 w-80 bg-gray-800 p-6 rounded-2xl flex-shrink-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#f53924] rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{['Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Anna Thompson', 'James Wilson'][i]}</h4>
                      <p className="text-gray-400 text-sm">{['HR Manager', 'Student', 'Recruiter', 'Professor', 'Graduate', 'Employer'][i]}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {[
                      "CredCheck saved us weeks of manual verification. Incredible platform!",
                      "So easy to verify my degree. Got results in under a minute.",
                      "The most reliable verification service we've ever used.",
                      "Perfect for academic credential verification. Highly recommend!",
                      "Fast, secure, and user-friendly. Exactly what we needed.",
                      "Streamlined our hiring process significantly. Great tool!"
                    ][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#923830] to-[#f53924]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Verify Your Credentials?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of professionals who trust CredCheck for secure credential verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/verify-credentials" className="bg-white text-[#923830] px-8 py-3 rounded-xl text-lg font-bold hover:bg-gray-100 cursor-pointer flex items-center justify-center gap-2 transition-colors">
              Start Verification <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-bold cursor-pointer hover:bg-white hover:text-[#923830] flex items-center justify-center gap-2 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">CredCheck</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Leading credential verification platform trusted by educational institutions and employers worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f53924] transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f53924] transition-colors cursor-pointer">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#f53924] transition-colors cursor-pointer">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/verify-credentials" className="text-gray-400 hover:text-white transition-colors">Certificate Verification</Link></li>
                <li><Link to="/download" className="text-gray-400 hover:text-white transition-colors">Download Certificates</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Integration</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bulk Verification</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CredCheck. All rights reserved. Built with security and trust in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing