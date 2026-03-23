import { X, User, Mail, Lock, ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authAPI } from '../../services/api'
import useAuthStore from '../../store/authStore'
import { toast } from 'react-hot-toast'
import { motion as Motion } from 'framer-motion'

const SignUp = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [selectedRole, setSelectedRole] = useState('student')
  const handleRoleChange = (role) => setSelectedRole(role)

  const onSubmit = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const res = await authAPI.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: selectedRole
      })
      const { token, user } = res.data || {}
      if (token && user) {
        localStorage.setItem('token', token)
        setAuth(user, token)
        toast.success('Account created successfully!')
        if (user.role === 'issuer') {
          navigate('/issuer/dashboard')
        } else {
          navigate('/student/dashboard')
        }
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-blue-800/60  rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-red-500/60 rounded-full blur-[100px]"></div>
      </div>

      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-gray-500/90 border border-gray-100 overflow-hidden relative z-10"
      >
        <div className="p-4 sm:p-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="logo" className="w-12 h-12"/>
              <span className="font-bold text-2xl tracking-tight">CredCheck</span>
            </div>
            <Link to="/" className="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <X className="w-5 h-5 text-white" />
              </div>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black tracking-tight">Create Account</h1>
            <p className="text-gray-500">Join CredCheck to verify and manage credentials</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 ml-1">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('student')}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedRole === 'student'
                        ? 'border-[#f53924] bg-red-50 text-black'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                    aria-pressed={selectedRole === 'student'}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">🧑🏼‍🎓</div>
                      <div className="font-semibold text-sm">Student</div>
                      <div className="text-xs text-gray-500">Looking to manage credentials</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('issuer')}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedRole === 'issuer'
                        ? 'border-[#f53924] bg-red-50 text-black'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                    aria-pressed={selectedRole === 'issuer'}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">🏢</div>
                      <div className="font-semibold text-sm">Issuer</div>
                      <div className="text-xs text-gray-500">Issuing and verifying records</div>
                    </div>
                  </button>
                </div>
                <input type="hidden" name="role" value={selectedRole} />
              </div>
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#f53924] transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f53924]/20 focus:border-[#f53924] outline-none transition-all placeholder:text-gray-400 text-black font-medium"
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm font-medium flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {errors.name.message}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#f53924] transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f53924]/20 focus:border-[#f53924] outline-none transition-all placeholder:text-gray-400 text-black font-medium"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                  })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm font-medium flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {errors.email.message}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#f53924] transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#f53924]/20 focus:border-[#f53924] outline-none transition-all placeholder:text-gray-400 text-black font-medium"
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm font-medium flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {errors.password.message}
              </p>}
            </div>

            <Motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f53924] text-white py-2 rounded-xl font-bold text-lg shadow-lg shadow-red-500/25 hover:bg-[#d9301e] hover:shadow-red-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : 'Create Account'}
            </Motion.button>
          </form>
        </div>

        <div className="p-2 -mt-10 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-gray-600 font-medium">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#f53924] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Motion.div>
    </div>
  )
}

export default SignUp
