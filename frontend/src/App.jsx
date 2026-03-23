import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/public/Landing'
import Download from './pages/public/Download'
import Contact from './pages/public/Contact'
import About from './pages/public/About'
import SignUp from './pages/public/SignUp'
import SignIn from './pages/public/SignIn'
import IssuerDashboard from './pages/protected/issuer/dashboard'
import StudentDashboard from './pages/protected/student/dashboard'
import VerifyCertificate from './pages/public/Verify'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Toaster position="top-right" />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/student/download" element={<Download />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/issuer/dashboard" element={<IssuerDashboard />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/verify" element={<VerifyCertificate />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
