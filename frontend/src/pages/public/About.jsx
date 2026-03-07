import React from 'react'
import { Shield, Users, Globe, Award, TrendingUp, User, ArrowRight, CheckCircle2 } from 'lucide-react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import { motion as Motion } from 'framer-motion'

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      description: 'Former university registrar with 15+ years in educational technology.',
      color: 'from-blue-400 to-indigo-600'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Blockchain expert and former lead developer at major tech companies.',
      color: 'from-emerald-400 to-teal-600'
    },
    {
      name: 'Prof. David Williams',
      role: 'Chief Academic Officer',
      description: 'Former university president and education policy expert.',
      color: 'from-orange-400 to-red-600'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Head of Operations',
      description: 'Experienced operations leader with background in credential verification.',
      color: 'from-purple-400 to-pink-600'
    }
  ]

  const stats = [
    { label: 'Verified Certificates', value: '2.5M+', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Partner Institutions', value: '500+', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Countries Served', value: '50+', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Verified Users', value: '1M+', icon: User, color: 'text-pink-600', bg: 'bg-pink-50' }
  ]

  const values = [
    {
      title: 'Trust & Security',
      description: 'We prioritize the security and integrity of every credential in our system, using blockchain technology to ensure tamper-proof verification.',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Accessibility',
      description: 'Education credentials should be accessible to everyone, everywhere. We make verification simple and available globally.',
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide the most advanced credential verification solutions using cutting-edge technology.',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from user experience to verification accuracy.',
      icon: Award,
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-600">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-100">
                Our Story
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-8">
                Revolutionizing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  Trust in Education
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                We're building the future of credential verification using blockchain technology to create a world where achievements are instantly verifiable and universally trusted.
              </p>
            </Motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 text-center group hover:border-red-100 transition-colors"
                >
                  <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </Motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  CredCheck was founded with a simple yet powerful mission: to make credential verification 
                  instant, secure, and accessible to everyone, everywhere.
                </p>
                <p>
                  In today's global economy, the ability to quickly and reliably verify educational 
                  credentials is more important than ever. Traditional verification methods are slow, 
                  expensive, and prone to fraud.
                </p>
                <ul className="space-y-3 mt-8">
                  {['Blockchain-backed security', 'Instant global verification', 'Tamper-proof records'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-900 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Motion.div>
            
            <Motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-orange-100 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative">
                  {/* Fallback pattern if image fails or for design */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                     <Users className="w-24 h-24 text-gray-300" />
                  </div>
                  <img 
                    src="/about.jpg" 
                    alt="Students collaborating" 
                    className="w-full h-full object-cover relative z-10 mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity duration-500"
                    onError={(e) => e.target.style.display = 'none'} 
                  />
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide our innovation and service.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">The experts behind the revolution in credential verification.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl transform group-hover:rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-sm group-hover:shadow-xl transition-all duration-300">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.color} p-1`}>
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <User className="w-10 h-10 text-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-medium text-sm mb-4">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 px-8 py-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Join the Revolution?
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Whether you're an institution looking to secure your credentials or an individual 
                wanting to verify your achievements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-600/30 hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Motion.button>
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
                >
                  Contact Sales
                </Motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default About
