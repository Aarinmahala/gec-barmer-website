import { useState, useEffect } from 'react';

/**
 * Custom hook to load announcements directly from a JSON file
 * This allows for easy updates by simply editing the JSON file
 * @returns {Object} Announcements data and loading state
 */
export const useFileAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setIsLoading(true);
        // Fetch the announcements from the JSON file
        const response = await fetch('/data/announcements.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load announcements: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setAnnouncements(data);
        setError(null);
      } catch (err) {
        console.error('Error loading announcements from file:', err);
        setError(err.message);
        // If there's an error, we'll keep the previous announcements if any
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  // Get latest announcements for homepage display
  const getLatestAnnouncements = (count = 3) => {
    return [...announcements]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, count);
  };

  return {
    announcements,
    isLoading,
    error,
    getLatestAnnouncements
  };
}; 