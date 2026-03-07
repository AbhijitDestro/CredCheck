import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Award, Users, Globe, Download, Search, CheckCircle, ArrowRight, Zap, Clock } from 'lucide-react';
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer';
import { motion as Motion } from 'framer-motion'
import Hero from '../../components/public/Hero';
import Testimonials from '../../components/public/Testimonials';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <section className="py-14 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Motion.h2
              className="text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Verification Made Simple
            </Motion.h2>
            <Motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Three simple steps to verify, manage, and share your professional credentials with the world.
            </Motion.p>
          </div>
          <Motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            {[
              {
                icon: Search,
                title: "1. Search Certificate",
                desc: "Enter your unique certificate ID or upload your document to begin the instant verification process."
              },
              {
                icon: CheckCircle,
                title: "2. Verify Authenticity",
                desc: "Our blockchain-powered system instantly validates your credentials against our secure, immutable database."
              },
              {
                icon: Download,
                title: "3. Download & Share",
                desc: "Get verified digital copies ready for sharing with employers, institutions, and social networks."
              }
            ].map((step, index) => (
              <Motion.div
                key={index}
                className="text-center group"
                variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-red-500/5 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                  <step.icon className="w-8 h-8 text-[#f53924]" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Our Services Section - Bento Grid */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">Why Choose CredCheck</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive credential verification solutions designed for the modern world.</p>
          </div>
          <Motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <Motion.div
              className="md:col-span-2 lg:col-span-2 p-10 bg-[#f53924] rounded-3xl text-white relative overflow-hidden group"
              variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <Shield className="w-12 h-12 mb-6 text-white" />
                <h3 className="text-3xl font-bold mb-4">Secure Verification</h3>
                <p className="text-lg text-white/90 max-w-lg leading-relaxed">Advanced blockchain technology ensures tamper-proof credential verification with military-grade encryption. Your data is protected by the highest security standards in the industry.</p>
              </div>
            </Motion.div>

            {[
              {
                icon: Clock,
                title: "Instant Results",
                desc: "Get verification results in seconds, not days. Our AI-powered system works 24/7."
              },
              {
                icon: Globe,
                title: "Global Network",
                desc: "Connect with institutions worldwide. Verify credentials from any country, any language."
              },
              {
                icon: Award,
                title: "Trusted by Leaders",
                desc: "Used by Fortune 500 companies and top universities for reliable credential verification."
              },
              {
                icon: Users,
                title: "Multi-User Support",
                desc: "Team accounts with role-based access. Perfect for HR departments and admissions offices."
              }
            ].map((card, index) => (
              <Motion.div
                key={index}
                className="p-8 bg-gray-50 rounded-3xl text-black hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-100"
                variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <card.icon className="w-6 h-6 text-[#f53924]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f53924] opacity-20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 px-8 py-20 md:py-28 text-center">
            <Motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Verify Your Credentials?
            </Motion.h2>
            <Motion.p
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join thousands of professionals and institutions who trust CredCheck for secure, instant credential verification.
            </Motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/verify-credentials">
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-[#f53924] text-white rounded-xl font-bold text-lg hover:bg-[#d9301e] transition-colors shadow-lg shadow-red-900/20"
                >
                  Start Verification
                </Motion.button>
              </Link>
              <Link to="/contact">
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Contact Sales
                </Motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Landing
