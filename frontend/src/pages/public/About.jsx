import React from 'react'
import { Shield, Users, Globe, Award, TrendingUp, User } from 'lucide-react'

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      description: 'Former university registrar with 15+ years in educational technology'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Blockchain expert and former lead developer at major tech companies'
    },
    {
      name: 'Prof. David Williams',
      role: 'Chief Academic Officer',
      description: 'Former university president and education policy expert'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Head of Operations',
      description: 'Experienced operations leader with background in credential verification'
    }
  ]

  const stats = [
    { label: 'Verified Credentials', value: '2.5M+', icon: Shield },
    { label: 'Partner Institutions', value: '500+', icon: Users },
    { label: 'Countries Served', value: '50+', icon: Globe },
    { label: 'Success Rate', value: '99.9%', icon: Award }
  ]

  const values = [
    {
      title: 'Trust & Security',
      description: 'We prioritize the security and integrity of every credential in our system, using blockchain technology to ensure tamper-proof verification.',
      icon: Shield
    },
    {
      title: 'Accessibility',
      description: 'Education credentials should be accessible to everyone, everywhere. We make verification simple and available globally.',
      icon: Globe
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide the most advanced credential verification solutions using cutting-edge technology.',
      icon: TrendingUp
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from user experience to verification accuracy.',
      icon: Award
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="text-[#f53924]">CredCheck</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Revolutionizing credential verification through blockchain technology and innovative solutions
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-[#f53924] rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-gray-300 text-lg mb-6">
                  CredCheck was founded with a simple yet powerful mission: to make credential verification 
                  instant, secure, and accessible to everyone, everywhere.
                </p>
                <p className="text-gray-300 text-lg mb-6">
                  In today's global economy, the ability to quickly and reliably verify educational 
                  credentials is more important than ever. Traditional verification methods are slow, 
                  expensive, and prone to fraud.
                </p>
                <p className="text-gray-300 text-lg">
                  We're changing that by leveraging blockchain technology to create a decentralized, 
                  tamper-proof system that benefits students, institutions, and employers alike.
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/hero-students-large.png" 
                  alt="Students celebrating" 
                  className="w-full max-w-md rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <div key={index} className="text-center p-6">
                    <div className="w-16 h-16 bg-[#f53924] rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-[#f53924] rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-[#f53924] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Credential Revolution?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you're an institution looking to secure your credentials or an individual 
              wanting to verify your achievements, CredCheck is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#f53924] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#923830] transition-colors">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About