"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Upload, CheckCircle, AlertTriangle, X, FileText } from "lucide-react";
import Link from "next/link";

interface FormattedEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  date: string;
  time: string;
  beginAt: string;
  endAt: string;
  maxAttendees: number | null;
  currentAttendees: number;
  isCustom: boolean;
}

export default function ImportEventsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [importedEvents, setImportedEvents] = useState<FormattedEvent[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload via click
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle drag and drop
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Format date for event storage
  const formatDateForEvent = (dateStr: string, timeStr: string): string => {
    try {
      const [datePart] = dateStr.split('T');
      return new Date(`${datePart}T${timeStr}:00`).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  // Parse CSV and convert to events
  const parseCSV = (csvContent: string): FormattedEvent[] => {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const events: FormattedEvent[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',').map(val => val.trim());
      if (values.length !== headers.length) continue;
      
      const eventData: any = {};
      headers.forEach((header, index) => {
        eventData[header.toLowerCase()] = values[index];
      });
      
      // Parse date and time
      const dateStr = eventData.date || new Date().toISOString().split('T')[0];
      const timeRange = (eventData.time || '09:00 - 11:00').split('-');
      const startTime = timeRange[0]?.trim() || '09:00';
      const endTime = timeRange[1]?.trim() || '11:00';
      
      const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      
      const event: FormattedEvent = {
        id: Date.now() + i, // Unique ID
        title: eventData.title || `Event ${i}`,
        description: eventData.description || 'No description provided',
        location: eventData.location || 'TBD',
        category: eventData.category || 'workshop',
        date: formattedDate,
        time: `${startTime} - ${endTime}`,
        beginAt: formatDateForEvent(dateStr, startTime),
        endAt: formatDateForEvent(dateStr, endTime),
        maxAttendees: eventData.maxattendees ? Number(eventData.maxattendees) : null,
        currentAttendees: eventData.currentattendees ? Number(eventData.currentattendees) : 0,
        isCustom: true
      };
      
      events.push(event);
    }
    
    return events;
  };

  // Process the uploaded file
  const processFile = () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadError(null);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const events = parseCSV(content);
        
        if (events.length === 0) {
          setUploadError("No valid events found in the CSV file");
          setIsUploading(false);
          return;
        }
        
        // Get existing custom events
        const customEventsStr = localStorage.getItem('customEvents');
        const existingCustomEvents: FormattedEvent[] = customEventsStr ? JSON.parse(customEventsStr) : [];
        
        // Merge with new events
        const allCustomEvents = [...existingCustomEvents, ...events];
        
        // Save to localStorage
        localStorage.setItem('customEvents', JSON.stringify(allCustomEvents));
        
        setImportedEvents(events);
        setUploadComplete(true);
        setIsUploading(false);
      } catch (error) {
        console.error('Error processing CSV:', error);
        setUploadError('Failed to process the CSV file. Please check the format.');
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      setUploadError('Error reading the file');
      setIsUploading(false);
    };
    
    reader.readAsText(file);
  };

  // Clear current file
  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto relative z-10">
      {/* Background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="mb-8">
        <Link href="/admin" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Events</span>
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">
          Import <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent font-normal">Events</span>
        </h1>
      </div>
      
      {!uploadComplete ? (
        <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="text-xl font-light mb-3">Upload CSV File</h2>
            <p className="text-white/60 text-sm">
              Upload a CSV file containing your events data. The file should include columns for title, description, 
              location, category, date, time, and attendance information.
            </p>
          </div>
          
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
              isDragging 
                ? 'border-purple-500 bg-purple-500/10' 
                : 'border-white/20 hover:border-white/40 hover:bg-white/5'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            
            {!file ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-white/10">
                    <FileText className="h-12 w-12 text-white/60" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-light text-white/90">
                    Drag & drop your CSV file here
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    or click to browse files
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <div className="p-4 rounded-full bg-purple-500/20">
                  <FileText className="h-10 w-10 text-purple-400" />
                </div>
                <p className="text-xl font-light text-white/90">{file.name}</p>
                <p className="text-white/50 text-sm">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs mt-2 transition-colors"
                >
                  <X className="h-3.5 w-3.5" /> Remove file
                </button>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="mt-6 bg-red-500/20 text-red-300 p-4 rounded-xl flex items-center gap-3 border border-red-500/30 backdrop-blur-sm">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={processFile}
              disabled={!file || isUploading}
              className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all ${
                !file || isUploading
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-purple-500/20'
              }`}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Import Events</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center p-5 bg-green-500/20 rounded-full mb-5 border border-green-500/30">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-light mb-3">Import Successful!</h2>
            <p className="text-white/70">
              {importedEvents.length} event{importedEvents.length !== 1 ? 's' : ''} have been imported successfully.
            </p>
          </div>
          
          {/* List of imported events */}
          <div className="mt-8">
            <h3 className="text-sm font-medium uppercase tracking-wider text-white/50 mb-4">Imported Events</h3>
            <div className="bg-black/30 rounded-xl p-1 max-h-96 overflow-y-auto border border-white/5">
              <div className="space-y-1">
                {importedEvents.map(event => (
                  <div 
                    key={event.id}
                    className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="text-white/90 font-medium mb-1">{event.title}</div>
                        <div className="text-white/50 text-sm flex items-center flex-wrap gap-3">
                          <span>{event.date}</span>
                          <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                          <span>{event.time}</span>
                          <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full capitalize ${
                        event.category === 'conference' ? 'bg-blue-500/20 text-blue-300' :
                        event.category === 'workshop' ? 'bg-green-500/20 text-green-300' :
                        event.category === 'hackathon' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => {
                setFile(null);
                setUploadComplete(false);
                setImportedEvents([]);
              }}
              className="px-5 py-2.5 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-full transition-colors"
            >
              Import Another File
            </button>
            <Link 
              href="/admin"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full inline-flex items-center gap-2 transition-colors shadow-lg hover:shadow-purple-500/20"
            >
              Return to Events
            </Link>
          </div>
        </div>
      )}
      
      {/* CSV Format Example */}
      <div className="mt-8 bg-gray-900/50 border border-white/5 rounded-xl p-8 shadow-lg">
        <h2 className="text-xl font-light mb-4 flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">CSV</span> Format Example
        </h2>
        <div className="bg-black/50 p-6 rounded-xl overflow-x-auto border border-white/5">
          <pre className="text-white/70 text-sm font-mono">
            title,description,location,category,date,time,maxAttendees,currentAttendees
            Workshop on React,Learn the basics of React,Conference Room A,workshop,2025-05-15,09:00 - 12:00,30,12
            AI Conference,Discussion on latest AI trends,Main Auditorium,conference,2025-06-01,10:00 - 17:00,150,45
            Hackathon 2025,Annual coding competition,Innovation Center,hackathon,2025-07-10,09:00 - 18:00,100,0
          </pre>
        </div>
      </div>
    </div>
  );
}