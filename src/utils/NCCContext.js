import React, { createContext, useContext, useState, useEffect } from 'react';

// Default NCC data
const defaultNCCData = {
  pageTitle: "National Cadet Corps (NCC)",
  pageDescription: "Training the youth to become potential leaders and responsible citizens",
  mainImage: "/images/ncc-main.jpg",
  overview: "The National Cadet Corps is the Indian military cadet corps with its headquarters in New Delhi, India. It is open to school and college students on a voluntary basis as a Tri-Services Organisation, comprising the Army, Navy and Air Wing.",
  mission: "To develop character, comradeship, discipline, leadership, secular outlook, spirit of adventure, and ideals of selfless service amongst the youth of the country.",
  vision: "To empower youth to become potential leaders and responsible citizens who will contribute to nation-building.",
  activities: [
    {
      id: 1,
      title: "Annual Training Camp",
      description: "10-day camp for basic military training, weapon training, and drill practice.",
      image: "/images/ncc-camp.jpg"
    },
    {
      id: 2,
      title: "Republic Day Camp",
      description: "Selected cadets participate in the prestigious Republic Day Parade in New Delhi.",
      image: "/images/ncc-republic.jpg"
    },
    {
      id: 3,
      title: "Social Service",
      description: "Community service activities including blood donation, tree plantation, and cleanliness drives.",
      image: "/images/ncc-social.jpg"
    }
  ],
  achievements: [
    {
      id: 1,
      year: "2022",
      title: "Best NCC Unit Award",
      description: "Awarded the Best NCC Unit in the district for outstanding performance."
    },
    {
      id: 2,
      year: "2021",
      title: "Republic Day Representation",
      description: "3 cadets selected for Republic Day Camp in New Delhi."
    }
  ],
  enrollment: {
    eligibility: "Open to all undergraduate students with Indian citizenship",
    process: "Enroll through the college NCC office at the beginning of the academic year",
    benefits: "Character building, leadership training, certificate advantage in government jobs, scholarship opportunities"
  },
  contacts: {
    officer: "Lt. Col. Rajesh Kumar",
    email: "ncc@example.com",
    phone: "+91 9876543210",
    office: "Room 101, Administrative Block"
  }
};

// Create Context
const NCCContext = createContext();

// Provider Component
export const NCCProvider = ({ children }) => {
  const [nccData, setNCCData] = useState(() => {
    // Try to get data from localStorage
    const storedData = localStorage.getItem('college_website_ncc');
    return storedData ? JSON.parse(storedData) : defaultNCCData;
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('college_website_ncc', JSON.stringify(nccData));
  }, [nccData]);

  // Function to update NCC data
  const updateNCCData = (newData) => {
    setNCCData(newData);
  };

  return (
    <NCCContext.Provider value={{ nccData, updateNCCData }}>
      {children}
    </NCCContext.Provider>
  );
};

// Custom hook to use the NCC context
export const useNCC = () => useContext(NCCContext);

export default defaultNCCData; 