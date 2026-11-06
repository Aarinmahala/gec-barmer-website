import React, { createContext, useState, useContext, useEffect } from 'react';

// Default leadership data
const defaultLeadershipData = {
  principal: {
    name: "Dr. Sandeep Rankawat",
    position: "Principal",
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747073594/305009840_1119703905648281_7765544022572070549_n_1_ajzme6.jpg",
    qualifications: "Ph.D in Mechanical Engineering",
    experience: "Over 20 years of experience in academia and research",
    message: "Leading the institution with a vision of academic excellence and innovation."
  },
  registrar: {
    name: "MR.kamalPanwar",
    position: "Registrar",
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747222365/OIP_leveho.jpg",
    qualifications: "B.Tech in Electronics and Communication Engineering",
    message: "It is a matter of great pride to have you as the Registrar of our esteemed institution. With a B.Tech in Electronics and Communication Engineering and an impressive 26 years of teaching experience, your guidance and dedication have been instrumental in shaping academic excellence. Your earlier service as a Junior Engineer in RSEB further enriches your professional background. Your commitment to discipline, academic integrity, and efficient administration continues to inspire both staff and students. We are grateful for your leadership and look forward to your continued support in driving the institution towards greater heights."
  },
  viceChancellor: {
    name: "Prof. Ajay Kumar Sharma",
    position: "Vice Chancellor",
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747737795/vc.jpeg_e2apzr.jpg",
    qualifications: "Ph.D in Electronics Engineering",
    experience: "More than 20 years in teaching and research. Before assuming the charge of Vice Chancellor, MBM University, Jodhpur, Rajasthan",
    message: "As the Vice Chancellor, I am committed to fostering academic excellence, research innovation, and holistic development of our students. Our institution stands as a beacon of quality technical education, preparing future leaders and innovators."
  }
};

// Local storage key
const STORAGE_KEY = 'college_website_leadership';

// Create the Leadership context
const LeadershipContext = createContext();

export const LeadershipProvider = ({ children }) => {
  // Initialize state with default data
  const [leadershipData, setLeadershipData] = useState(defaultLeadershipData);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (storedData) {
          // Parse the stored data
          const parsedData = JSON.parse(storedData);
          setLeadershipData(parsedData);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        // If there's an error, use default data
        setLeadershipData(defaultLeadershipData);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leadershipData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [leadershipData, isLoading]);
  
  // Function to update a specific leader's information
  const updateLeader = (role, field, value) => {
    setLeadershipData(prevData => ({
      ...prevData,
      [role]: {
        ...prevData[role],
        [field]: value
      }
    }));
  };
  
  // Reset to defaults
  const resetToDefaults = () => {
    setLeadershipData(defaultLeadershipData);
  };
  
  return (
    <LeadershipContext.Provider 
      value={{ 
        leadershipData,
        isLoading,
        updateLeader,
        resetToDefaults
      }}
    >
      {children}
    </LeadershipContext.Provider>
  );
};

// Custom hook for using leadership context
export const useLeadership = () => {
  return useContext(LeadershipContext);
}; 