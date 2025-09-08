import React from 'react';

function LoadingScreen({ message = 'Loading...' }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"></div>
                    <div className="absolute inset-3 rounded-full border-4 border-white/10"></div>
                    <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-purple-400 animate-[spin_1.2s_linear_infinite_reverse]"></div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-white text-lg font-semibold">{message}</span>
                    <span className="inline-flex">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce mx-1"></span>
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;


