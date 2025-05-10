import { ChevronRight, Calendar, Clock } from 'lucide-react'
import { Event } from '../../../types/types'
import { CategoryBadge } from './category_badge'

type EventsSectionProps = {
  events: Event[]
  isLoading: boolean
  currentTime: Date
  setSelectedEvent: (event: Event) => void
}

export const EventsSection = ({ events, isLoading, currentTime, setSelectedEvent }: EventsSectionProps) => {
  return (
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

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            {/* Event orbit display - Desktop */}
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
              {(() => {
                const calculatePositions = () => {
                  return events.slice(0, 6).map((_, index) => {
                    const angle = (index * (360 / Math.min(events.length, 6)) + currentTime.getSeconds() * 0.5) % 360
                    const radius = index % 2 === 0 ? 250 : 350 // Inner or outer orbit
                    const x = Math.cos((angle * Math.PI) / 180) * radius
                    const y = Math.sin((angle * Math.PI) / 180) * radius
                    const zIndex = angle > 180 ? 10 : 5
                    return { x, y, zIndex }
                  })
                }

                const positions = calculatePositions()

                return events.slice(0, 6).map((event, index) => {
                  const position = positions[index]
                  
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
                })
              })()}
            </div>

            {/* Mobile event display */}
            <div className="md:hidden space-y-4">
              <h3 className="text-xl font-medium text-white/80 mb-6">Upcoming Events</h3>
              {events.slice(0, 4).map((event) => (
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
          </>
        )}
      </div>
    </section>
  )
}