"use client"
import { useState, useEffect } from "react"
import type { Event } from "./landing_utils"
import { Footer } from "../../components/custom/footer"
import { Header } from "../../components/custom/header"
import LoginPage from "../../components/custom/user_login/page"
import { ArrowRight, LogIn, Calendar, Clock, ChevronRight } from "lucide-react"

// Define CategoryBadge component that was missing
const CategoryBadge = ({ category }: { category: "workshop" | "competition" | "social" | "lecture" | string }) => {
  const colors: Record<string, string> = {
    workshop: "bg-blue-500/20 text-blue-400",
    competition: "bg-purple-500/20 text-purple-400",
    social: "bg-emerald-500/20 text-emerald-400",
    lecture: "bg-amber-500/20 text-amber-400",
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[category] || "bg-gray-500/20 text-gray-400"}`}>
      {category}
    </span>
  )
}

// Define events array with initial sample data
const events: Event[] = [
  {
    id: 1,
    title: "Introduction to AI",
    category: "workshop",
    date: "May 15",
    time: "14:00 - 16:00",
    location: "Lab 1",
    description: "Learn the basics of artificial intelligence and machine learning.",
    image: "/images/events/ai-workshop.jpg",
  },
  {
    id: 2,
    title: "Hackathon Finals",
    category: "competition",
    date: "May 18",
    time: "09:00 - 18:00",
    location: "Main Hall",
    description: "Final presentations of the annual hackathon projects.",
    image: "/images/events/hackathon.jpg",
  },
  {
    id: 3,
    title: "Community Mixer",
    category: "social",
    date: "May 20",
    time: "19:00 - 21:00",
    location: "Lounge Area",
    description: "Network with fellow students and industry professionals.",
    image: "/images/events/mixer.jpg",
  },
  {
    id: 4,
    title: "Industry Expert Talk",
    category: "lecture",
    date: "May 22",
    time: "13:00 - 14:30",
    location: "Auditorium",
    description: "Hear from leading experts in the tech industry.",
    image: "/images/events/expert-talk.jpg",
  },
  {
    id: 5,
    title: "Web Development Basics",
    category: "workshop",
    date: "May 25",
    time: "15:00 - 17:00",
    location: "Lab 2",
    description: "Introduction to HTML, CSS, and JavaScript fundamentals.",
    image: "/images/events/web-dev.jpg",
  },
  {
    id: 6,
    title: "Design Challenge",
    category: "competition",
    date: "May 27",
    time: "10:00 - 16:00",
    location: "Design Studio",
    description: "Put your UI/UX skills to the test in this design competition.",
    image: "/images/events/design-challenge.jpg",
  },
]

// This function can be used in your component to fetch real events
const fetchEventsFromApi = async () => {
  try {
    // First get access token using the client credentials flow
    const tokenResponse = await fetch("https://api.intra.42.fr/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_42_UID,
        client_secret: process.env.FORTY_TWO_SECRET,
      }),
    })

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // First get the campus ID (you can store this in state/context to avoid refetching)
    const campusResponse = await fetch("https://api.intra.42.fr/v2/campus", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const campuses = await campusResponse.json()
    const abuDhabiCampus = campuses.find((campus: { name: string }) => campus.name === "Abu Dhabi")

    if (!abuDhabiCampus) {
      throw new Error("Abu Dhabi campus not found")
    }
    return []
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

export default function LandingPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Format time to show hours:minutes
  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Creative Design */}
      <section className="pt-24 overflow-hidden">
        <Header />
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

      {/* Creative Events Display */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-1/4 w-1 h-20 bg-white/10"></div>
        <div className="absolute top-60 left-1/3 w-1 h-48 bg-white/5"></div>
        <div className="absolute top-40 right-1/4 w-1 h-32 bg-white/10"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full mb-3">
                Upcoming
              </span>
              <h2 className="text-3xl font-light">
                Featured{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  experiences
                </span>
              </h2>
            </div>
            <button className="text-sm text-white/70 hover:text-white flex items-center group">
              View all <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Event orbit display */}
          <div className="relative h-[600px] hidden md:flex items-center justify-center mb-24">
            {/* Center element */}
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center z-20">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white/70" />
              </div>
            </div>

            {/* Orbital paths */}
            <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5"></div>
            <div className="absolute w-[700px] h-[700px] rounded-full border border-white/5"></div>

            {/* Event cards in orbit */}
            {events.map((event, index) => {
              const [position, setPosition] = useState({ x: 0, y: 0, zIndex: 5 })

              useEffect(() => {
                // Calculate position along the orbit on the client side
                const angle = (index * (360 / events.length) + currentTime.getSeconds() * 0.5) % 360
                const radius = index % 2 === 0 ? 250 : 350 // Inner or outer orbit
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius
                const zIndex = angle > 180 ? 10 : 5
                setPosition({ x, y, zIndex })
              }, [currentTime, index])

              return (
                <div
                  key={event.id}
                  className="absolute bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 w-64 transition-all hover:scale-105 cursor-pointer hover:border-white/30"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: position.zIndex,
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <CategoryBadge category={event.category} />
                    <span className="text-xs text-white/50">{event.date}</span>
                  </div>
                  <h3 className="font-medium text-white mb-2">{event.title}</h3>
                  <div className="flex items-center text-xs text-white/50">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Improved mobile event display */}
          <div className="md:hidden space-y-4">
            <h3 className="text-xl font-medium text-white/80 mb-6">Upcoming Events</h3>
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all hover:scale-105 cursor-pointer hover:border-white/30"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex justify-between items-center mb-2">
                  <CategoryBadge category={event.category} />
                  <span className="text-xs text-white/50">{event.date}</span>
                </div>
                <h3 className="font-medium text-white mb-2">{event.title}</h3>
                <p className="text-sm text-white/70 mb-2 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-white/50">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <button className="text-xs flex items-center font-medium text-white/70 hover:text-white transition-colors">
                    Details <ChevronRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center mt-8">
              <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-sm text-white rounded-full transition-colors flex items-center mx-auto">
                See all events <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* This section is no longer needed as we've improved the mobile display above */}
          <div className="hidden"></div>
        </div>
      </section>

      {/* Community Categories Section */}
      <section className="py-24 relative overflow-hidden bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full mb-3">
              Discover
            </span>
            <h2 className="text-3xl font-light">
              Find your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                community
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Workshops",
                description: "Hands-on learning experiences",
                color: "from-blue-600/20 to-blue-800/20",
                icon: "💻",
              },
              {
                name: "Competitions",
                description: "Test your skills and win prizes",
                color: "from-indigo-600/20 to-indigo-800/20",
                icon: "🏆",
              },
              {
                name: "Social",
                description: "Connect with the community",
                color: "from-emerald-600/20 to-emerald-800/20",
                icon: "🎉",
              },
              {
                name: "Lectures",
                description: "Learn from industry experts",
                color: "from-amber-600/20 to-amber-800/20",
                icon: "🎓",
              },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer transition-all hover:border-white/30 group relative overflow-hidden"
              >
                <div
                  className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${category.color} blur-xl opacity-70 group-hover:opacity-100 transition-opacity`}
                ></div>

                <div className="relative z-10">
                  <div className="text-2xl mb-3">{category.icon}</div>
                  <h3 className="font-medium text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-white/70 mb-4">{category.description}</p>
                  <button className="text-xs flex items-center font-medium text-white/70 group-hover:text-white transition-colors">
                    Explore <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-2/3 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-light mb-4">
                Stay{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  informed
                </span>
              </h2>
              <p className="text-white/70 mb-8">
                Get updates on the latest events and opportunities from the 42 Abu Dhabi community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-black/30 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-white/30"
                />
                <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
