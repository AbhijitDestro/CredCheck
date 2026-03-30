import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, Download, CheckCircle, Search } from 'lucide-react'
import { motion as Motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 lg:py-20 overflow-hidden bg-white">
      {/* Aurora Silk Fade Gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(150deg, #FFF1ED 0%, #FFE3DE 20%, #FFD1C9 40%, #FFC0B3 60%, #FF8A65 80%, #F53924 100%)`
        }}
      />
      {/* Bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none z-[1]" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-2"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#f53924]"></span>
              <span className="text-sm font-medium text-[#f53924] tracking-wide uppercase">Trusted Certification Platform</span>
            </Motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-black tracking-tight leading-[1.1] mb-3">
              Get Certified<br/>
              <span className="text-[#f53924]"> Securely & Instantly</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The global standard for digital credential verification. Empowering institutions, employers, and professionals with blockchain-backed security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-[#f53924] text-white rounded-xl font-semibold text-lg shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 hover:bg-[#d9301e] transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  Get Started
                </Motion.button>
              </Link>
              <Link to="/about">
                <Motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black border border-gray-200 rounded-xl font-semibold text-lg hover:border-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  Learn More <ArrowRight className="w-5 h-5" />
                </Motion.button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 Available</span>
              </div>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/hero.png"
                alt="Platform Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
