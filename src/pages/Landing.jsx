import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, CheckCircle, Star, ArrowRight, Clock, Target, Lightbulb } from "lucide-react";

function LandingPage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleGetStarted = () => {
        navigate('/login?action=signup');
        console.log("Navigating to app...");
    };

    const handleSignIn = () => {
        navigate('/login'); // Navigate to login
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        navigate('/login?action=signup');
        setEmail("");
    };

    const features = [
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Smart Task Management",
            description: "Organize your tasks with intelligent categorization and priority sorting"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Real-time Progress",
            description: "Track your productivity with beautiful visual progress indicators"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Goal Achievement",
            description: "Set and achieve your goals with our intuitive task completion system"
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Smart Insights",
            description: "Get personalized insights to boost your productivity and efficiency"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Product Manager",
            content: "TaskFlow transformed how I manage my daily tasks. The interface is beautiful and so intuitive!",
            rating: 5
        },
        {
            name: "Mike Rodriguez",
            role: "Designer",
            content: "Finally, a todo app that doesn't feel boring. The animations and design are top-notch.",
            rating: 5
        },
        {
            name: "Emily Watson",
            role: "Developer",
            content: "Clean, fast, and powerful. TaskFlow helps me stay organized without getting in my way.",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
                <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-1000"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="container mx-auto px-6 py-8">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg transform rotate-12">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                TaskFlow
                            </span>
                        </div>
                        <button
                            onClick={handleSignIn}
                            className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 font-medium"
                        >
                            Sign In
                        </button>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-6 py-20 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-4 mb-8">
                            <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl transform rotate-12 animate-bounce">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                                TaskFlow
                            </h1>
                            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl transform -rotate-12 animate-bounce animation-delay-1000">
                                <Zap className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Transform Your Productivity
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                One Task at a Time
                            </span>
                        </h2>

                        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Experience the future of task management with our beautifully designed, intuitive platform that makes productivity feel effortless and enjoyable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <button
                                onClick={handleGetStarted}
                                className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-3"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-cyan-400 mb-2">10K+</div>
                                <div className="text-blue-200">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-purple-400 mb-2">1M+</div>
                                <div className="text-blue-200">Tasks Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-pink-400 mb-2">99.9%</div>
                                <div className="text-blue-200">Uptime</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-6 py-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-bold text-white mb-4">
                                Powerful Features for
                                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Modern Productivity</span>
                            </h3>
                            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                                Everything you need to stay organized, focused, and productive in one beautiful package
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/15 transform animate-fadeIn"
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                                            <p className="text-blue-200 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="container mx-auto px-6 py-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-bold text-white mb-4">
                                Loved by
                                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Thousands</span>
                            </h3>
                            <p className="text-xl text-blue-200">
                                See what our users have to say about TaskFlow
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-fadeIn"
                                    style={{ animationDelay: `${index * 300}ms` }}
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-blue-100 mb-4 italic">"{testimonial.content}"</p>
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.name}</div>
                                        <div className="text-blue-300 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                            <h3 className="text-4xl font-bold text-white mb-6">
                                Ready to Transform Your
                                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Productivity?</span>
                            </h3>
                            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                                Join thousands of users who have already revolutionized their task management with TaskFlow
                            </p>

                            <div className="max-w-md mx-auto mb-8">
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleEmailSubmit}
                                        className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-xl transform hover:scale-105"
                                    >
                                        Start Free
                                    </button>
                                </div>
                            </div>

                            <p className="text-blue-300 text-sm">
                                No credit card required • Free forever • Get started in seconds
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="container mx-auto px-6 py-12 border-t border-white/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-3 mb-4 md:mb-0">
                                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg transform rotate-12">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                    TaskFlow
                                </span>
                            </div>
                            <div className="flex gap-8 text-blue-200">
                                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms</a>
                                <a href="#" className="hover:text-white transition-colors">Support</a>
                                <a href="#" className="hover:text-white transition-colors">Contact</a>
                            </div>
                        </div>
                        <div className="text-center mt-8 pt-8 border-t border-white/10">
                            <p className="text-blue-300">
                                © 2025 TaskFlow. All rights reserved. Made with ✨ for productivity enthusiasts.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}

export default LandingPage;