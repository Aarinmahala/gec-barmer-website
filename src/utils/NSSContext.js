import React, { createContext, useContext, useState, useEffect } from 'react';

// Default NSS data
const defaultNSSData = {
  pageTitle: "National Service Scheme (NSS)",
  pageDescription: "Not Me But You - Developing personality through community service",
  mainImage: "/images/nss-main.jpg",
  overview: "The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. It provides opportunity to the student youth of colleges to take part in various government led community service activities & programs.",
  mission: "To develop the personality and character of the student youth through voluntary community service. 'Not Me But You' is the motto of NSS.",
  vision: "To build a generation of responsible citizens who are sensitive to the needs of the community and are committed to national development.",
  activities: [
    {
      id: 1,
      title: "Special Camp",
      description: "7-day residential camp in adopted villages focusing on specific social issues.",
      image: "/images/nss-camp.jpg"
    },
    {
      id: 2,
      title: "Regular Activities",
      description: "Weekly activities including cleanliness drives, awareness programs, and campus development.",
      image: "/images/nss-regular.jpg"
    },
    {
      id: 3,
      title: "Blood Donation",
      description: "Organizing blood donation camps in association with local hospitals and blood banks.",
      image: "/images/nss-blood.jpg"
    },
    {
      id: 4,
      title: "Environmental Conservation",
      description: "Tree plantation, water conservation, and plastic-free campus initiatives.",
      image: "/images/nss-environment.jpg"
    }
  ],
  achievements: [
    {
      id: 1,
      year: "2022",
      title: "Best NSS Unit Award",
      description: "Awarded the Best NSS Unit at the district level for outstanding community service."
    },
    {
      id: 2,
      year: "2021",
      title: "State-level Recognition",
      description: "2 volunteers selected for state-level Republic Day parade."
    }
  ],
  enrollment: {
    eligibility: "Open to all undergraduate students",
    process: "Enroll through the college NSS office at the beginning of the academic year",
    benefits: "Personality development, leadership skills, certificate advantage in higher education and jobs"
  },
  contacts: {
    officer: "Dr. Priya Sharma",
    email: "nss@example.com",
    phone: "+91 9876543211",
    office: "Room 102, Administrative Block"
  }
};

// Create Context
const NSSContext = createContext();

// Provider Component
export const NSSProvider = ({ children }) => {
  const [nssData, setNSSData] = useState(() => {
    // Try to get data from localStorage
    const storedData = localStorage.getItem('college_website_nss');
    return storedData ? JSON.parse(storedData) : defaultNSSData;
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('college_website_nss', JSON.stringify(nssData));
  }, [nssData]);

  // Function to update NSS data
  const updateNSSData = (newData) => {
    setNSSData(newData);
  };

  return (
    <NSSContext.Provider value={{ nssData, updateNSSData }}>
      {children}
    </NSSContext.Provider>
  );
};

// Custom hook to use the NSS context
export const useNSS = () => useContext(NSSContext);

export default defaultNSSData; 