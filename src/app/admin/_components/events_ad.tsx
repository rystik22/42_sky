"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Save } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState([
    { id: 1, name: "Introduction to AI", date: "2025-05-15", status: "Upcoming", attendees: 42, location: "Main Hall" },
    { id: 2, name: "Hackathon Finals", date: "2025-05-18", status: "Upcoming", attendees: 24, location: "Lab 101" },
    { id: 3, name: "Community Mixer", date: "2025-05-20", status: "Upcoming", attendees: 37, location: "Lounge" },
    { id: 4, name: "Industry Expert Talk", date: "2025-05-22", status: "Upcoming", attendees: 15, location: "Auditorium" },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    status: "Upcoming",
    attendees: 0,
    location: ""
  });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      name: "",
      date: "",
      status: "Upcoming",
      attendees: 0,
      location: ""
    });
    setShowForm(true);
  };

  const handleEditEvent = (event: {id: number, name: string, date: string, status: string, attendees: number, location: string}) => {
    setEditingEvent(event.id);
    setFormData({
      name: event.name,
      date: event.date,
      status: event.status,
      attendees: event.attendees,
      location: event.location
    });
    setShowForm(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'attendees' ? parseInt(value) || 0 : value
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent ? { ...event, ...formData } : event
      ));
    } else {
      // Add new event
      const newEvent = {
        id: Math.max(0, ...events.map(e => e.id)) + 1,
        ...formData
      };
      setEvents([...events, newEvent]);
    }
    
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">Event Management</h1>
        <button 
          onClick={handleAddEvent}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      {showForm ? (
        <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-light mb-4">
            {editingEvent ? "Edit Event" : "Add New Event"}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white/60 text-sm mb-2">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Expected Attendees</label>
                <input
                  type="number"
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleFormChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                {editingEvent ? "Update Event" : "Save Event"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <Search className="h-4 w-4 text-white/50 absolute left-3 top-3" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white/60 border-b border-white/10">
                <th className="pb-3 font-normal">Event Name</th>
                <th className="pb-3 font-normal">Date</th>
                <th className="pb-3 font-normal">Location</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal">Attendees</th>
                <th className="pb-3 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-white/5">
                  <td className="py-3">{event.name}</td>
                  <td className="py-3 text-white/70">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="py-3 text-white/70">{event.location}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                      event.status === 'Ongoing' ? 'bg-green-500/20 text-green-400' :
                      event.status === 'Completed' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-3 text-white/70">{event.attendees}</td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditEvent(event)}
                        className="p-1.5 rounded-md hover:bg-white/10"
                      >
                        <Edit className="h-4 w-4 text-white/70" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1.5 rounded-md hover:bg-white/10"
                      >
                        <Trash2 className="h-4 w-4 text-white/70" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}