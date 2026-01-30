import React, { useEffect, useState } from 'react';
import { Phone, Lock, User, Mail } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

console.log("🌍 ENV API URL =", import.meta.env.VITE_API_URL);

// 🌍 API Instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log("🌍 ENV API URL =", import.meta.env.VITE_API_URL);

const Login: React.FC = () => {
  const navigate = useNavigate(); // ✅ navigation hook

  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] =
    useState<'admin' | 'teacher' | 'student'>('student');

  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔍 Log state changes
  useEffect(() => {
    console.log("🔄 Mode changed:", isLogin ? "LOGIN" : "SIGNUP");
  }, [isLogin]);

  useEffect(() => {
    console.log("👤 User role changed:", userType);
  }, [userType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    console.log("📤 Form submitted");
    console.log("🧾 Form data:", formData);
    console.log("👤 Role:", userType);
    console.log("🔐 Mode:", isLogin ? "LOGIN" : "SIGNUP");

    try {
      if (isLogin) {
        console.log("➡️ Calling LOGIN API...");
        console.log("🌍 URL:", `${API.defaults.baseURL}/auth/login`);

        const res = await API.post('/auth/login', {
          phone: formData.phone,
          password: formData.password,
          role: userType,
        });

        console.log("✅ Login response:", res.data);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        setMessage('Login successful ✅');

        // 🚀 Navigate to dashboard
        navigate("/dashboard");

      } else {
        console.log("➡️ Calling SIGNUP API...");
        console.log("🌍 URL:", `${API.defaults.baseURL}/auth/signup`);

        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: userType,
        };

        console.log("📦 Signup payload:", payload);

        const res = await API.post('/auth/signup', payload);

        console.log("✅ Signup response:", res.data);

        setMessage('Signup successful 🎉 Please login.');
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error("❌ API Error:", error);

      console.error("❌ Error response:", error?.response);
      console.error("❌ Error message:", error?.message);
      console.error("❌ Error config:", error?.config);

      setMessage(
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong ❌'
      );
    } finally {
      setLoading(false);
      console.log("⏹️ Request finished");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          {/* User Type Selection */}
          <div className="flex gap-2 mb-6">
            {(['student', 'teacher', 'admin'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setUserType(type);
                  if (type === 'admin') {
                    setIsLogin(true); // force login for admin
                  }
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  userType === type
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Status Message */}
          {message && (
            <p className="text-center mb-4 text-sm font-medium text-red-600">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Signup Fields */}
            {!isLogin && userType !== 'admin' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white/60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle Login / Signup */}
          {userType !== 'admin' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Login'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
