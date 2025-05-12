'use client'

import { useState } from 'react'
import { ArrowRight, LogIn } from 'lucide-react'
import LoginPage from "../../../components/custom/user_login/page"
import { useAuth } from '../../../app/context/auth_provider'

type HeroProps = {
  formatTime: (date: Date) => string
  currentTime: Date
  setShowUserLogin: (show: boolean) => void
  showUserLogin: boolean
}

export const HeroSection = ({ formatTime, currentTime, setShowUserLogin, showUserLogin }: HeroProps) => {
  const { user } = useAuth();
  
  return (
    <section className="pt-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-20">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            
            {user ? (
              // Content for logged-in users
              <>
                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
                  Welcome back,{" "}
                  <span className="font-normal bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {user.name}
                  </span>
                </h1>

                <p className="text-lg text-gray-400 mb-10 max-w-lg">
                  Discover new events, connect with the community, and make the most of your 42 Abu Dhabi experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium text-sm group">
                    Explore Events
                    <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-3 bg-transparent border border-white/30 rounded-full hover:bg-white/10 transition-colors font-medium text-sm">
                    My Dashboard
                  </button>
                </div>
              </>
            ) : (
              // Content for non-logged in users
              <>
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
                </div>
              </>
            )}
          </div>
          
          {/* Time display and image stay the same */}
          <div className="lg:pl-10 relative z-10">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="bg-gray-900/50 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs font-mono text-white/70">{formatTime(currentTime)}</div>
                </div>
                <div className="text-center py-6">
                  <img
                    src="/image.png"
                    alt="42 Abu Dhabi"
                    className="w-32 mx-auto mb-4 filter drop-shadow-lg"
                  />
                  <h3 className="text-2xl font-light mb-2">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-normal">
                      42 Abu Dhabi
                    </span>
                  </h3>
                  <p className="text-white/60 text-sm">Next-generation tech education</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* User login modal */}
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
    </section>
  )
}