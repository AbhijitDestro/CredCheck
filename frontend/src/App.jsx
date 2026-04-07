import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/authStore'
import Landing from './pages/public/Landing'
import Download from './pages/public/Download'
import Contact from './pages/public/Contact'
import About from './pages/public/About'
import SignUp from './pages/public/SignUp'
import SignIn from './pages/public/SignIn'
import IssuerDashboard from './pages/protected/issuer/dashboard'
import StudentDashboard from './pages/protected/student/dashboard'
import VerifyCertificate from './pages/public/Verify'

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }
  return children
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              duration: 4000,
            },
          }}
        />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/student/download" element={<Download />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/issuer/dashboard" element={<ProtectedRoute role="issuer"><IssuerDashboard /></ProtectedRoute>} />
            <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/verify" element={<VerifyCertificate />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
