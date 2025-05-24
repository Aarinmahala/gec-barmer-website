import React, { createContext, useState, useContext, useEffect } from 'react';

// Default important links data
const defaultLinks = [
  {
    id: '1',
    title: 'AICTE',
    url: 'https://www.aicte-india.org/',
    category: 'important',
    order: 1
  },
  {
    id: '2',
    title: 'MBM jodhpur',
    url: 'https://btu.rajasthan.gov.in/',
    category: 'important',
    order: 2
  },
  {
    id: '3',
    title: 'Govt. of Rajasthan',
    url: 'https://www.rajasthan.gov.in/',
    category: 'important',
    order: 3
  },
  {
    id: '4',
    title: 'Swayam',
    url: 'https://www.swayam.gov.in/',
    category: 'important',
    order: 4
  },
  {
    id: '5',
    title: 'MyGov.in',
    url: 'https://www.mygov.in/',
    category: 'important',
    order: 5
  }
];

// Local storage key
const STORAGE_KEY = 'college_website_links';

// Create the link context
const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  // Initialize state with default links
  const [links, setLinks] = useState(defaultLinks);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (storedData) {
          // Parse the stored data
          const parsedData = JSON.parse(storedData);
          setLinks(parsedData);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        // If there's an error, use default data
        setLinks(defaultLinks);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Save to localStorage whenever links change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [links, isLoading]);
  
  // Functions for managing links
  const addLink = (newLink) => {
    const link = {
      ...newLink,
      id: Date.now().toString(),
      order: links.length + 1
    };
    
    setLinks([...links, link]);
    return link;
  };
  
  const updateLink = (updatedLink) => {
    const newLinks = links.map(l => 
      l.id === updatedLink.id ? updatedLink : l
    );
    
    setLinks(newLinks);
    return updatedLink;
  };
  
  const deleteLink = (id) => {
    const filteredLinks = links.filter(l => l.id !== id);
    setLinks(filteredLinks);
    return true;
  };
  
  const reorderLinks = (newOrder) => {
    const reorderedLinks = [...links];
    newOrder.forEach((id, index) => {
      const link = reorderedLinks.find(l => l.id === id);
      if (link) link.order = index + 1;
    });
    reorderedLinks.sort((a, b) => a.order - b.order);
    
    setLinks(reorderedLinks);
    return true;
  };
  
  // Reset to defaults
  const resetToDefaults = () => {
    setLinks(defaultLinks);
  };
  
  // Get links by category
  const getLinksByCategory = (category) => {
    return [...links]
      .filter(l => l.category === category)
      .sort((a, b) => a.order - b.order);
  };
  
  return (
    <LinkContext.Provider 
      value={{ 
        links,
        isLoading,
        addLink, 
        updateLink, 
        deleteLink,
        reorderLinks,
        getLinksByCategory,
        resetToDefaults
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

// Custom hook for using link context
export const useLinks = () => {
  return useContext(LinkContext);
}; 