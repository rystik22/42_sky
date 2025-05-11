"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Save, Filter, X, Check } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", managedEvents: ["Hackathon Finals", "Community Mixer"] },
    { id: 2, name: "Sam Chen", email: "sam@example.com", role: "Moderator", managedEvents: ["Introduction to AI"] },
    { id: 3, name: "Taylor Kim", email: "taylor@example.com", role: "Moderator", managedEvents: ["Industry Expert Talk"] },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Moderator",
    managedEvents: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string | null>(null);

  // Sample list of all available events for assignment
  const availableEvents = [
    "Introduction to AI",
    "Hackathon Finals",
    "Community Mixer",
    "Industry Expert Talk",
    "Workshop: Web Development",
    "Panel Discussion"
  ];

  // Available roles
  const availableRoles = ["Admin", "Moderator", "Editor", "Viewer"];

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "Moderator",
      managedEvents: []
    });
    setShowForm(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      managedEvents: [...user.managedEvents]
    });
    setShowForm(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const eventName = value;
      let updatedEvents = [...formData.managedEvents];
      
      if (checkbox.checked) {
        // Add event if not already in the array
        if (!updatedEvents.includes(eventName)) {
          updatedEvents.push(eventName);
        }
      } else {
        // Remove event
        updatedEvents = updatedEvents.filter(event => event !== eventName);
      }
      
      setFormData({
        ...formData,
        managedEvents: updatedEvents
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser ? { ...user, ...formData } : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        ...formData
      };
      setUsers([...users, newUser]);
    }
    
    setShowForm(false);
    setEditingUser(null);
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEventFilter = 
      !filterEvent || user.managedEvents.includes(filterEvent);
    
    const matchesRoleFilter = 
      !filterRole || user.role === filterRole;
    
    return matchesSearch && matchesEventFilter && matchesRoleFilter;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterEvent(null);
    setFilterRole(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">User Management</h1>
        <button 
          onClick={handleAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border bg-white/50 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-1 gap-4">
            <div className="flex-1">
              <select 
                value={filterEvent || ''}
                onChange={(e) => setFilterEvent(e.target.value || null)}
                className="border rounded-lg px-4 py-2 w-full bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Filter by Event</option>
                {availableEvents.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <select 
                value={filterRole || ''}
                onChange={(e) => setFilterRole(e.target.value || null)}
                className="border rounded-lg px-4 py-2 w-full bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Filter by Role</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {(searchQuery || filterEvent || filterRole) && (
              <button 
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* User Form */}
      {showForm && (
        <div className="mb-6 bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow">
          <h2 className="text-xl font-light mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Managed Events</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white/30 p-3 rounded-lg">
                {availableEvents.map(event => (
                  <div key={event} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`event-${event}`}
                      name="managedEvents"
                      value={event}
                      checked={formData.managedEvents.includes(event)}
                      onChange={handleFormChange}
                      className="mr-2 h-4 w-4 accent-blue-600"
                    />
                    <label htmlFor={`event-${event}`} className="text-sm">{event}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                {editingUser ? 'Update User' : 'Save User'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200/30">
          <thead className="bg-white/10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Managed Events
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/30">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-white/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-sm opacity-75">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-purple-500/20 text-purple-200' :
                      user.role === 'Moderator' ? 'bg-blue-500/20 text-blue-200' :
                      user.role === 'Editor' ? 'bg-green-500/20 text-green-200' : 'bg-gray-500/20 text-gray-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.managedEvents.length > 0 ? (
                        user.managedEvents.map((event, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-white/20">
                            {event}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm opacity-75">No events assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                        aria-label="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        aria-label="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm">
                  No users found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow">
          <div className="text-sm opacity-75">Total Users</div>
          <div className="text-2xl font-light">{users.length}</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow">
          <div className="text-sm opacity-75">Admins</div>
          <div className="text-2xl font-light">{users.filter(u => u.role === 'Admin').length}</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow">
          <div className="text-sm opacity-75">Moderators</div>
          <div className="text-2xl font-light">{users.filter(u => u.role === 'Moderator').length}</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow">
          <div className="text-sm opacity-75">Users with Events</div>
          <div className="text-2xl font-light">{users.filter(u => u.managedEvents.length > 0).length}</div>
        </div>
      </div>
    </div>
  );
}