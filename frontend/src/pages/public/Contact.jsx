import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, User, MessageSquare, ArrowRight, HelpCircle } from 'lucide-react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import { motion as Motion, AnimatePresence } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    // Simulate API call
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
      
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@credcheck.com', 'info@credcheck.com'],
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri 9AM-6PM EST'],
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Tech Street, Suite 456', 'New York, NY 10001'],
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-600">
      <Navbar />
      
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-100">
                Contact Support
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about our verification process? Our team is here to help you 24/7.
              </p>
            </Motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-8 relative z-10">Send us a message</h2>
              
              <AnimatePresence>
                {submitMessage && (
                  <Motion.div
                    initial={{ opacity: 0, height: 0, mb: 0 }}
                    animate={{ opacity: 1, height: 'auto', mb: 24 }}
                    exit={{ opacity: 0, height: 0, mb: 0 }}
                    className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm font-medium border border-emerald-100 flex items-center gap-2 overflow-hidden"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    {submitMessage}
                  </Motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-red-50 focus:border-red-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-red-50 focus:border-red-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 ml-1">Subject</label>
                  <div className="relative group">
                    <HelpCircle className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-red-50 focus:border-red-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 ml-1">Message</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-red-50 focus:border-red-500 focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                <Motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/20 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Motion.button>
              </form>
            </Motion.div>

            {/* Info Side */}
            <div className="space-y-8">
              <Motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid gap-6"
              >
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-5">
                      <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </Motion.div>

              {/* FAQ Section */}
              <Motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      How long does verification take?
                    </h4>
                    <p className="text-gray-600 text-sm ml-3.5 pl-2 border-l border-gray-200">
                      Most verifications are completed within seconds using our blockchain technology.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      Is my data secure?
                    </h4>
                    <p className="text-gray-600 text-sm ml-3.5 pl-2 border-l border-gray-200">
                      Yes, we use military-grade encryption and blockchain technology to secure all data.
                    </p>
                  </div>
                </div>
              </Motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
