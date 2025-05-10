import { useState } from 'react'
import { ArrowRight, LogIn } from 'lucide-react'
import LoginPage from "../../../components/custom/user_login/page"

type HeroProps = {
  formatTime: (date: Date) => string
  currentTime: Date
  setShowUserLogin: (show: boolean) => void
  showUserLogin: boolean
}

export const HeroSection = ({ formatTime, currentTime, setShowUserLogin, showUserLogin }: HeroProps) => {
  return (
    <section className="pt-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-20">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              Where{" "}
              <span className="font-normal bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ideas
              </span>{" "}
              meet{" "}
              <span className="font-normal bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                community
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-10 max-w-lg">
              Discover unique events curated for the 42 Abu Dhabi community. Connect, learn, and grow with fellow
              innovators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium text-sm group">
                Explore Events
                <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowUserLogin(true)}
                className="px-8 py-3 bg-transparent border border-white/30 rounded-full hover:bg-white/10 transition-colors font-medium text-sm flex items-center justify-center"
              >
                <LogIn className="h-4 w-4 mr-2" /> Sign In
              </button>

              {/* Render the login page when showUserLogin is true */}
              {showUserLogin && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <button 
                      onClick={() => setShowUserLogin(false)} 
                      className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
                      aria-label="Close login modal"
                    >
                      ✕
                    </button>
                    <LoginPage />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:block relative">
            {/* Animated clock design */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-white/10 flex items-center justify-center">
              <div className="absolute w-56 h-56 rounded-full border border-white/10"></div>
              <div className="absolute w-48 h-48 rounded-full border border-white/5"></div>

              <div className="absolute text-2xl font-light">{formatTime(currentTime)}</div>

              {/* Hour markers */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-3 bg-white/20"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-30px)`,
                    transformOrigin: "bottom center",
                  }}
                ></div>
              ))}

              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-purple-500/30 to-pink-700/30 rounded-full blur-xl"></div>
            </div>

            {/* Floating event cards */}
            <div className="absolute top-8 right-0 w-48 h-28 bg-black border border-white/10 rounded-lg p-3 transform rotate-6 shadow-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="h-2 w-12 bg-white/20 rounded-full"></div>
                <div className="h-2 w-6 bg-blue-500/50 rounded-full"></div>
              </div>
              <div className="h-3 w-20 bg-white/10 rounded-full mb-2"></div>
              <div className="h-2 w-full bg-white/10 rounded-full mb-2"></div>
              <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
            </div>

            <div className="absolute bottom-12 left-8 w-56 h-32 bg-black border border-white/10 rounded-lg p-4 transform -rotate-3 shadow-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="h-2 w-12 bg-white/20 rounded-full"></div>
                <div className="h-2 w-6 bg-purple-500/50 rounded-full"></div>
              </div>
              <div className="h-3 w-28 bg-white/10 rounded-full mb-2"></div>
              <div className="h-2 w-full bg-white/10 rounded-full mb-2"></div>
              <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2"></div>
              <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-screen overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}