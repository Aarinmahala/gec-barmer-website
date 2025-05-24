import React, { createContext, useContext, useState, useEffect } from 'react';

// Default Faculty data
const defaultFacultyData = {
  departments: [
    {
      id: 1,
      name: 'Computer Science & Engineering',
      shortName: 'CSE',
      faculty: [
        {
          id: 'cse-001',
          name: 'Dr. Rajesh Kumar',
          designation: 'Professor & Head',
          qualification: 'Ph.D. in Computer Science',
          specialization: 'Machine Learning, AI',
          experience: '15 years',
          email: 'rajesh.kumar@example.com',
          photo: '/images/faculty/rajesh-kumar.jpg',
          bio: 'Dr. Kumar has extensive research experience in machine learning and has published over 50 papers in international journals.',
          researchAreas: [
            'Artificial Intelligence',
            'Neural Networks',
            'Computer Vision'
          ],
          courses: [
            'Machine Learning',
            'Data Science',
            'Computer Architecture'
          ],
          achievements: [
            'Best Teacher Award 2021',
            'Research grant of ₹50 lakhs from DST',
            'Visiting Professor at MIT (2018)'
          ]
        },
        {
          id: 'cse-002',
          name: 'Dr. Priya Singh',
          designation: 'Associate Professor',
          qualification: 'Ph.D. in Information Security',
          specialization: 'Cybersecurity, Cryptography',
          experience: '10 years',
          email: 'priya.singh@example.com',
          photo: '/images/faculty/priya-singh.jpg',
          bio: 'Dr. Singh specializes in information security and has worked on several government projects related to cryptography.',
          researchAreas: [
            'Cybersecurity',
            'Network Security',
            'Cryptography'
          ],
          courses: [
            'Information Security',
            'Network Security',
            'Blockchain Technology'
          ],
          achievements: [
            'Young Scientist Award 2019',
            '5 patents in cybersecurity',
            'Consultant for National Cyber Security Project'
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Electronics & Communication',
      shortName: 'ECE',
      faculty: [
        {
          id: 'ece-001',
          name: 'Dr. Anand Verma',
          designation: 'Professor & Head',
          qualification: 'Ph.D. in VLSI Design',
          specialization: 'VLSI, Embedded Systems',
          experience: '18 years',
          email: 'anand.verma@example.com',
          photo: '/images/faculty/anand-verma.jpg',
          bio: 'Dr. Verma has significant industry experience and has led major projects with leading semiconductor companies.',
          researchAreas: [
            'VLSI Design',
            'Embedded Systems',
            'IoT'
          ],
          courses: [
            'Digital System Design',
            'VLSI Design',
            'Embedded Systems'
          ],
          achievements: [
            'Fellow of IEEE',
            'Industry collaboration projects worth ₹2 crores',
            'Best Researcher Award 2020'
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      shortName: 'ME',
      faculty: [
        {
          id: 'me-001',
          name: 'Dr. Suresh Patel',
          designation: 'Professor & Head',
          qualification: 'Ph.D. in Thermal Engineering',
          specialization: 'Thermodynamics, Renewable Energy',
          experience: '20 years',
          email: 'suresh.patel@example.com',
          photo: '/images/faculty/suresh-patel.jpg',
          bio: 'Dr. Patel is an expert in thermal engineering with focus on renewable energy solutions.',
          researchAreas: [
            'Renewable Energy',
            'Thermal Systems',
            'Energy Conservation'
          ],
          courses: [
            'Thermodynamics',
            'Renewable Energy Systems',
            'Heat Transfer'
          ],
          achievements: [
            'National Award for Energy Conservation',
            'Author of 3 textbooks on Thermodynamics',
            'Completed 10 industrial consultancy projects'
          ]
        }
      ]
    }
  ]
};

// Create Context
const FacultyContext = createContext();

// Provider Component
export const FacultyProvider = ({ children }) => {
  const [facultyData, setFacultyData] = useState(() => {
    // Try to get data from localStorage
    const storedData = localStorage.getItem('college_website_faculty');
    return storedData ? JSON.parse(storedData) : defaultFacultyData;
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('college_website_faculty', JSON.stringify(facultyData));
  }, [facultyData]);

  // Function to update faculty data
  const updateFacultyData = (newData) => {
    setFacultyData(newData);
  };

  return (
    <FacultyContext.Provider value={{ facultyData, updateFacultyData }}>
      {children}
    </FacultyContext.Provider>
  );
};

// Custom hook to use the Faculty context
export const useFaculty = () => useContext(FacultyContext);

export default defaultFacultyData; 