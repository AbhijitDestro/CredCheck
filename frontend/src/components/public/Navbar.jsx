import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' }
  ]

  return (
    <Motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='max-w-8xl mx-auto px-5 lg:px-8 flex justify-between items-center'>
        <Link to="/" onClick={closeMenu}>
          <Motion.div
            className='flex items-center gap-2'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <img src="/logo.png" alt="logo" className='w-14 h-14 object-contain'/>
            <h1 className='text-3xl font-bold text-black tracking-tight'>CredCheck</h1>
          </Motion.div>
        </Link> 
        
        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-8'>
            <ul className='flex items-center gap-8'>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className='relative group'>
                      <span className={`text-md font-medium transition-colors ${
                        location.pathname === link.path ? 'text-[#f53924]' : 'text-gray-600 hover:text-black'
                      }`}>
                        {link.name}
                      </span>
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f53924] transition-all duration-300 group-hover:w-full ${
                        location.pathname === link.path ? 'w-full' : ''
                      }`}></span>
                    </Link>
                  </li>
                ))}
            </ul>

            <div className='flex items-center gap-4 ml-4'>
              <Link to="/signin">
                <Motion.button
                  className='text-md font-medium text-black px-5 py-2.5 rounded-full border border-gray-200 hover:border-black transition-colors'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                    Log in
                </Motion.button>
              </Link>
              <Link to="/signup">
                <Motion.button
                  className='text-md font-medium text-white bg-[#f53924] px-5 py-2.5 rounded-full shadow-lg shadow-red-500/20 hover:bg-[#d9301e] transition-all'
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 57, 36, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                    Get Started
                </Motion.button>
              </Link>
            </div>
        </div>

        {/* Mobile Menu Button */}
        <Motion.button 
          className='lg:hidden p-2 text-black hover:bg-gray-100 rounded-full transition-colors'
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            className='lg:hidden fixed inset-0 z-[60] bg-white'
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className='flex flex-col h-full px-6 py-6'>
              <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-2'>
                  <img src="/logo.png" alt="logo" className='w-10 h-10 object-contain'/>
                  <h1 className='text-2xl font-bold text-black tracking-tight'>CredCheck</h1>
                </div>
                <button 
                  onClick={closeMenu}
                  className='p-2 -mr-2 text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer'
                  aria-label="Close menu"
                >
                  <X size={24}/>
                </button>
              </div>
              <div className='flex flex-col space-y-6'>
                {navLinks.map((link, i) => (
                  <Motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`text-2xl font-medium ${
                        location.pathname === link.path ? 'text-[#f53924]' : 'text-black'
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  </Motion.div>
                ))}
              </div>
              
              <div className='mt-auto flex flex-col space-y-4'>
                <Link to="/signin" onClick={closeMenu}>
                  <Motion.button
                    className='w-full border border-gray-800 text-black font-medium px-4 py-4 rounded-xl active:bg-gray-50 hover:text-white hover:bg-black cursor-pointer'
                    whileTap={{ scale: 0.98 }}
                  >
                    Log in
                  </Motion.button>
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <Motion.button
                    className='w-full bg-[#f53924] text-white font-medium px-4 py-4 rounded-xl shadow-xl shadow-red-500/20 hover:bg-[#79241a] cursor-pointer'
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </Motion.button>
                </Link>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.nav>
  )
}

export default Navbar
