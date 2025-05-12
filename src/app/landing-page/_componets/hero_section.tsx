'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, LogIn, Code, Terminal, Clock, Calendar, MapPin, ChevronRight } from 'lucide-react'
import LoginPage from "../../../components/custom/user_login/page"
import { useAuth } from '../../../components/custom/client_component_wrapper'
import { CategoryBadge } from './category_badge'
import { Event } from '../../../types/types'

type HeroProps = {
  formatTime: (date: Date) => string
  currentTime: Date
  setShowUserLogin: (show: boolean) => void
  showUserLogin: boolean
}

export const HeroSection = ({ formatTime, currentTime, setShowUserLogin, showUserLogin }: HeroProps) => {
  const { user } = useAuth();
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  
  // Fetch a featured event for the card
  useEffect(() => {
    async function fetchFeaturedEvent() {
      try {
        // You can use your existing API or fetch mechanism here
        const response = await fetch('/api/events?limit=1');
        const data = await response.json();
        
        if (data.events && data.events.length > 0) {
          setFeaturedEvent(data.events[0]);
        }
      } catch (error) {
        console.error('Error fetching featured event:', error);
        // Fallback featured event
        setFeaturedEvent({
          id: 1,
          title: "Hackathon: AI Solutions",
          description: "Join us for a 24-hour hackathon focused on creating AI-powered solutions for real-world problems. Work with industry mentors and showcase your skills.",
          location: "Innovation Hub",
          category: "hackathon",
          date: "May 15",
          time: "09:00 - 18:00",
          beginAt: "2025-05-15T09:00:00Z",
          endAt: "2025-05-15T18:00:00Z",
          maxAttendees: 100,
          currentAttendees: 42,
          image: "/event-placeholder.jpg" // Added missing image property
        });
      }
    }
    
    fetchFeaturedEvent();
  }, []);
  
  return (
    <section className="pt-24 overflow-hidden relative">
      {/* Dynamic blurred background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Code matrix-like patterns */}
        <div className="absolute left-10 top-40 text-xs font-mono text-blue-500/20 opacity-30 transform -rotate-12">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="mb-2">
              {Array.from({ length: 20 }).map((_, j) => (
                <span key={j} className="mr-2">{Math.round(Math.random())}</span>
              ))}
            </div>
          ))}
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-800/10 to-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-700/10 to-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-tl from-sky-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Abstract tech pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/5 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-20">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            
            {user ? (
              // Content for logged-in users
              <>
                <div className="mb-2 inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">
                  <Terminal className="h-3 w-3 mr-2" />
                  <span>Welcome back</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
                  Hello,{" "}
                  <span className="font-normal bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {user.name}
                  </span>
                </h1>

                <p className="text-lg text-gray-300 mb-10 max-w-lg">
                  Discover new events, connect with the community, and make the most of your 42 Abu Dhabi experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition font-medium text-sm group">
                    Explore Events
                    <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-colors font-medium text-sm">
                    My Dashboard
                  </button>
                </div>
              </>
            ) : (
              // Content for non-logged in users
              <>
                <div className="mb-2 inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">
                  <Code className="h-3 w-3 mr-2" />
                  <span>Innovation Hub</span>
                </div>
                
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

                <p className="text-lg text-gray-300 mb-10 max-w-lg">
                  Discover unique events curated for the 42 Abu Dhabi community. Connect, learn, and grow with fellow
                  innovators.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition font-medium text-sm group">
                    Explore Events
                    <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setShowUserLogin(true)}
                    className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-colors font-medium text-sm flex items-center justify-center"
                  >
                    <LogIn className="h-4 w-4 mr-2" /> Sign In
                  </button>
                </div>
              </>
            )}
          </div>
          
          {/* Featured Event Showcase */}
          <div className="lg:pl-10 relative z-10">
            <div className="relative">
              {/* Animated background glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
              </div>
              
              {/* Featured Event Card */}
              <div className="relative backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Floating elements */}
                <div className="absolute top-4 left-6 w-16 h-16 bg-white/5 transform -rotate-12"></div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/5 transform rotate-12"></div>
                
                {/* Event Card */}
                <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 transform transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/10">
                  {/* Top accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  
                  {featuredEvent ? (
                    <div>
                      {/* Featured Event Image */}
                      <div className="h-40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 z-10"></div>
                        <div className="absolute inset-0 bg-[url('/event-placeholder.jpg')] bg-cover bg-center opacity-60"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                          <div className="inline-block px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full mb-1">
                            Featured Event
                          </div>
                        </div>
                      </div>
                      
                      {/* Event Details */}
                      <div className="p-6">
                        {/* Digital clock display */}
                        <div className="flex justify-between items-start mb-5">
                          <CategoryBadge category={featuredEvent.category} />
                          <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                            <span className="font-mono text-xs text-white/80">{formatTime(currentTime)}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-medium text-white mb-3 line-clamp-2">
                          {featuredEvent.title}
                        </h3>
                        
                        <p className="text-white/70 text-sm mb-5 line-clamp-3">
                          {featuredEvent.description}
                        </p>
                        
                        <div className="space-y-2.5 mb-5">
                          <div className="flex items-center text-sm text-white/60">
                            <Calendar className="h-4 w-4 mr-3 text-blue-400" />
                            <span>{featuredEvent.date}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-white/60">
                            <Clock className="h-4 w-4 mr-3 text-purple-400" />
                            <span>{featuredEvent.time}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-white/60">
                            <MapPin className="h-4 w-4 mr-3 text-pink-400" />
                            <span>{featuredEvent.location}</span>
                          </div>
                        </div>
                        
                        {/* Attendance meter */}
                        <div className="mb-5">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-white/70">Attendance</span>
                            {featuredEvent.maxAttendees ? (
                              <span className="text-white/90 font-medium">
                                {featuredEvent.currentAttendees}/{featuredEvent.maxAttendees}
                              </span>
                            ) : (
                              <span className="text-white/90 font-medium">
                                {featuredEvent.currentAttendees} attending
                              </span>
                            )}
                          </div>
                          
                          {featuredEvent.maxAttendees ? (
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                style={{ 
                                  width: `${Math.min(
                                    ((featuredEvent.currentAttendees || 0) / (featuredEvent.maxAttendees || 1)) * 100, 
                                    100
                                  )}%` 
                                }}
                              ></div>
                            </div>
                          ) : (
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        
                        {/* CTA button */}
                        <button className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg flex items-center justify-center group transition-all">
                          <span>View event details</span>
                          <ChevronRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 flex items-center justify-center min-h-[400px]">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-white/30 animate-spin mb-4"></div>
                        <p className="text-white/50 text-sm">Loading upcoming event...</p>
                      </div>
                    </div>
                  )}
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