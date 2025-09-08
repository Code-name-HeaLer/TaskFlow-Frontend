import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Sparkles, Zap, User, ArrowRight } from "lucide-react";
import { API_BASE_URL } from '../context/AuthContext';

function LoginPage() {
    const location = useLocation(); // To check URL params
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('action') === 'signup') {
            setIsLogin(false); // Switch to Signup view
        } else {
            setIsLogin(true); // Default to Login view
        }
    }, [location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your login/signup logic will go here
        console.log("Form submitted (Email/Password - NOT YET IMPLEMENTED):", formData, "Mode:", isLogin ? "Login" : "Sign Up");
        alert("Email/Password authentication is not yet implemented. Please use Google Sign-In.");
    };

    const handleGoogleSignIn = () => {
        // Redirect to your backend's Google OAuth route
        window.location.href = `${API_BASE_URL}/auth/google`; // API_BASE_URL from AuthContext or define it here
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden flex items-center justify-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg transform rotate-12 animate-bounce">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                            TaskFlow
                        </h1>
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg transform -rotate-12 animate-bounce" style={{ animationDelay: '1s' }}>
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <p className="text-blue-100 text-lg font-medium opacity-90 mb-2">
                        Transform your productivity ✨
                    </p>
                    <p className="text-blue-200 opacity-75">
                        {isLogin ? "Welcome back! Sign in to continue" : "Join thousands of productive users"}
                    </p>
                </div>

                {/* Login/Signup Toggle */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 mb-8 border border-white/20 shadow-xl">
                    <div className="flex">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${isLogin
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                                : 'text-blue-200 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${!isLogin
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                                : 'text-blue-200 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Login/Signup Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name field for signup */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-blue-100 font-medium flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg font-medium"
                                        placeholder="Enter your full name"
                                        required={!isLogin}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>
                        )}

                        {/* Email field */}
                        <div className="space-y-2">
                            <label className="text-blue-100 font-medium flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg font-medium"
                                    placeholder="Enter your email"
                                    required
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="text-blue-100 font-medium flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 pr-14 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg font-medium"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-cyan-400 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Remember me / Forgot password */}
                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-white/30 bg-white/10 text-cyan-400 focus:ring-cyan-400 focus:ring-2"
                                    />
                                    <span className="text-blue-200 text-sm">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3 group"
                        >
                            {isLogin ? "Sign In" : "Create Account"}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="px-4 text-blue-200 text-sm">or continue with</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <button onClick={handleGoogleSignIn} className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-3 group hover:scale-105">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-blue-200 text-sm opacity-75">
                        By {isLogin ? "signing in" : "creating an account"}, you agree to our{" "}
                        <button className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-200">
                            Terms of Service
                        </button>{" "}
                        and{" "}
                        <button className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-200">
                            Privacy Policy
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;