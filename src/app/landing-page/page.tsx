"use client"
import { useState, useEffect } from "react"
import { Footer } from "./footer"
import { Header } from "./header"
import { HeroSection } from "./_componets/hero_section"
import { EventsSection } from "./_componets/event_desplay"
import { CategoriesSection } from "./_componets/community_categ"
import { NewsletterSection } from "./_componets/newsletter"
import { EventDetailModal } from "./_componets/event_modal"
import { Event } from "../../types/types"
import { formatTime, fetchEventsFromApi, fallbackEvents } from "../../utils/api"

export default function LandingPage() {
  const [events, setEvents] = useState<Event[]>(fallbackEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  // Fetch events on component mount
  useEffect(() => {
    const getEvents = async () => {
      try {
        setIsLoading(true)
        const apiEvents = await fetchEventsFromApi()
        if (apiEvents.length > 0) {
          setEvents(apiEvents)
        }
      } catch (error) {
        console.error("Failed to load events:", error)
        // Fallback to sample events
      } finally {
        setIsLoading(false)
      }
    }

    getEvents()
  }, [])

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <HeroSection 
        formatTime={formatTime} 
        currentTime={currentTime} 
        setShowUserLogin={setShowUserLogin}
        showUserLogin={showUserLogin}
      />
      
      <EventsSection 
        events={events}
        isLoading={isLoading}
        currentTime={currentTime}
        setSelectedEvent={setSelectedEvent}
      />
      
      <CategoriesSection />
      
      <NewsletterSection />

      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      
      <Footer />
    </div>
  )
}