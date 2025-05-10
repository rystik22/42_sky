import { Clock, Calendar } from 'lucide-react'
import { Event } from '../../../types/types'
import { CategoryBadge } from './category_badge'

export const EventDetailModal = ({ event, onClose }: { event: Event, onClose: () => void }) => {
  if (!event) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-white/10 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <CategoryBadge category={event.category} />
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white"
              aria-label="Close details"
            >
              ✕
            </button>
          </div>
          
          <h2 className="text-xl font-medium mb-2">{event.title}</h2>
          
          <div className="flex flex-col space-y-3 mb-4 text-sm text-white/70">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-4 mb-4">
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-white/70">{event.description}</p>
          </div>
          
          <button className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-gray-100 transition-colors">
            Register for Event
          </button>
        </div>
      </div>
    </div>
  )
}