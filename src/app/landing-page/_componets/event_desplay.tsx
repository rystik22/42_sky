import { ChevronRight, Calendar, Clock, MapPin, Star } from 'lucide-react'
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
      
      {/* Decorative elements - abstract geometric shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-1/5 w-24 h-24 bg-blue-500 rotate-45 opacity-20"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-purple-500 opacity-10"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-16 bg-indigo-500 skew-x-12 opacity-15"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-48 bg-teal-500 -rotate-12 opacity-10"></div>
      </div>

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
            {/* Desktop Cascading Waterfall Layout */}
            <div className="hidden md:grid grid-cols-3 gap-6 mb-16">
              {/* Featured event - large card */}
              <div 
                className="col-span-3 md:col-span-1 row-span-2 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all cursor-pointer group h-full"
                onClick={() => setSelectedEvent(events[0])}
              >
                <div className="h-48 mb-4 overflow-hidden rounded-lg bg-gray-800 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      Featured
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-3">
                  <CategoryBadge category={events[0].category} />
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                    <span className="text-xs text-white/70">Featured</span>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-300 transition-colors">{events[0].title}</h3>
                <p className="text-sm text-white/70 mb-4 line-clamp-3">{events[0].description}</p>
                <div className="flex items-center text-xs text-white/60 mb-2">
                  <Calendar className="h-3 w-3 mr-2" />
                  <span>{events[0].date}</span>
                </div>
                <div className="flex items-center text-xs text-white/60 mb-2">
                  <Clock className="h-3 w-3 mr-2" />
                  <span>{events[0].time}</span>
                </div>
                <div className="flex items-center text-xs text-white/60">
                  <MapPin className="h-3 w-3 mr-2" />
                  <span>{events[0].location || "Virtual Event"}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <button className="text-sm text-white flex items-center group">
                    View details <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Staggered card layout */}
              {events.slice(1, 7).map((event, index) => {
                // Calculate dynamic styles for staggered appearance
                const isOdd = index % 2 === 0;
                const translateY = isOdd ? 'translate-y-6' : '';
                
                return (
                  <div 
                    key={event.id}
                    className={`bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 transition-all hover:scale-105 cursor-pointer hover:border-white/20 ${translateY}`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <CategoryBadge category={event.category} />
                      <span className="text-xs text-white/50">{event.date}</span>
                    </div>
                    <h3 className="font-medium text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-xs text-white/70 mb-3 line-clamp-2">{event.description}</p>
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
                )
              })}
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