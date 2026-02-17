import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/public/Navbar'
import Landing from './pages/public/Landing'
import VerifyCredentials from './pages/public/VerifyCredentials'
import Download from './pages/public/Download'
import Contact from './pages/public/Contact'
import About from './pages/public/About'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/verify-credentials" element={<VerifyCredentials />} />
            <Route path="/download" element={<Download />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App