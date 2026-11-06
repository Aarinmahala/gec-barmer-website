import React, { createContext, useState, useContext, useEffect } from 'react';

// Default announcement data
const defaultAnnouncements = [
  {
    id: '1',
    title: 'New Semester Registration',
    content: 'Registration for the new semester starts from June 15, 2025. All students are required to clear their outstanding dues before registration. The registration process will be online through the student portal.',
    date: '2025-05-10',
    category: 'academics',
    important: true,
    link: 'https://studentportal.gec.ac.in/registration'
  },
  {
    id: '2',
    title: 'Campus Placement Drive',
    content: 'TCS will be conducting a placement drive on July 5, 2025. Eligible students from final year can register through the career portal by June 25. For more details, contact the placement cell.',
    date: '2025-05-11',
    category: 'placements',
    important: true,
    link: 'https://careers.gec.ac.in/tcs-drive'
  },
  {
    id: '3',
    title: 'Annual Cultural Fest',
    content: 'Annual cultural fest "Kaleidoscope" will be held from August 10-12, 2025. Students interested in participating in various events can register with their respective department cultural representatives.',
    date: '2025-05-12',
    category: 'events',
    important: false,
    link: 'https://kaleidoscope.gec.ac.in'
  },
  {
    id: '4',
    title: 'Library Extended Hours',
    content: 'The college library will extend its working hours during examination period from 8 AM to 10 PM starting next week. Students can utilize this opportunity for exam preparation.',
    date: '2025-05-08',
    category: 'academics',
    important: false,
    link: ''
  },
  {
    id: '5',
    title: 'National Level Technical Symposium',
    content: 'The Department of Computer Science is organizing a National Level Technical Symposium "TechVista 2025" on July 20-21. Registration is open for paper presentations, coding contests, and project exhibitions.',
    date: '2025-05-07',
    category: 'events',
    important: false,
    link: 'https://techvista.gec.ac.in'
  }
];

// Local storage key
const STORAGE_KEY = 'college_website_announcements';

// Create the announcement context
const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  // Initialize state with default announcements
  const [announcements, setAnnouncements] = useState(defaultAnnouncements);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (storedData) {
          // Parse the stored data
          const parsedData = JSON.parse(storedData);
          setAnnouncements(parsedData);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        // If there's an error, use default data
        setAnnouncements(defaultAnnouncements);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Save to localStorage whenever announcements change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [announcements, isLoading]);
  
  // Add a new announcement
  const addAnnouncement = (newAnnouncement) => {
    const announcement = {
      ...newAnnouncement,
      id: Date.now().toString(), // Generate a unique ID
      date: newAnnouncement.date || new Date().toISOString().split('T')[0]
    };
    
    setAnnouncements(prev => [...prev, announcement]);
    return announcement;
  };
  
  // Update an existing announcement
  const updateAnnouncement = (updatedAnnouncement) => {
    const newAnnouncements = announcements.map(a => 
      a.id === updatedAnnouncement.id ? updatedAnnouncement : a
    );
    
    setAnnouncements(newAnnouncements);
    return updatedAnnouncement;
  };
  
  // Delete an announcement
  const deleteAnnouncement = (id) => {
    const filteredAnnouncements = announcements.filter(a => a.id !== id);
    setAnnouncements(filteredAnnouncements);
    return true;
  };
  
  // Reset to defaults
  const resetToDefaults = () => {
    setAnnouncements(defaultAnnouncements);
  };
  
  // Get latest announcements for homepage display
  const getLatestAnnouncements = (count = 3) => {
    return [...announcements]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, count);
  };
  
  return (
    <AnnouncementContext.Provider 
      value={{ 
        announcements, 
        isLoading,
        addAnnouncement, 
        updateAnnouncement, 
        deleteAnnouncement,
        getLatestAnnouncements,
        resetToDefaults
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

// Custom hook for using announcement context
export const useAnnouncements = () => {
  return useContext(AnnouncementContext);
}; 