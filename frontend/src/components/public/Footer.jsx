import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, Globe, Twitter, Linkedin, Facebook, Github } from 'lucide-react';
import { motion as Motion } from 'framer-motion'

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'Certificate Verification', path: '/verify-credentials' },
      { name: 'Download Certificates', path: '/download' },
      { name: 'API Integration', path: '#' },
      { name: 'Bulk Verification', path: '#' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' }
    ]
  }

  return (
    <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
            <Motion.div
              className="col-span-1 md:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain"/>
                <span className="text-xl font-bold text-black tracking-tight">CredCheck</span>
              </div>
              <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                The most secure and reliable credential verification platform. Trusted by leading educational institutions and employers worldwide.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Facebook, href: '#' },
                  { icon: Github, href: '#' }
                ].map((social, index) => (
                  <Motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#f53924] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={18} />
                  </Motion.a>
                ))}
              </div>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold text-black tracking-wider uppercase mb-6">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-gray-500 hover:text-[#f53924] transition-colors text-sm font-medium block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold text-black tracking-wider uppercase mb-6">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-gray-500 hover:text-[#f53924] transition-colors text-sm font-medium block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Motion.div>
          </div>
          
          <div className="border-t border-gray-100 mt-5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CredCheck. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
