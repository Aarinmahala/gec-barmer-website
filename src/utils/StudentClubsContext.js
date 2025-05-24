import React, { createContext, useContext, useState, useEffect } from 'react';

// Default Student Clubs data
const defaultStudentClubsData = {
  pageTitle: "Student Clubs & Activities",
  pageDescription: "Explore diverse interests through our vibrant student clubs",
  mainImage: "/images/student-clubs-main.jpg",
  overview: "Student clubs are an integral part of campus life, providing opportunities for students to explore their interests, develop leadership skills, and build community.",
  clubs: [
    {
      id: 1,
      name: "Tech Innovators Club",
      logo: "/images/tech-club-logo.png",
      description: "A platform for technology enthusiasts to collaborate on innovative projects, participate in hackathons, and learn cutting-edge technologies.",
      activities: [
        "Weekly coding workshops",
        "Annual hackathon",
        "Industry expert talks",
        "Project showcases"
      ],
      achievements: [
        "Winner of State-level Innovation Challenge 2022",
        "Published 3 mobile applications on Play Store"
      ],
      contactPerson: "Rahul Sharma",
      email: "techclub@example.com",
      meetingSchedule: "Every Saturday, 2:00 PM",
      location: "Computer Lab 2"
    },
    {
      id: 2,
      name: "Cultural Club",
      logo: "/images/cultural-club-logo.png",
      description: "Celebrates diverse cultural expressions through music, dance, drama, and art, fostering creativity and cultural appreciation.",
      activities: [
        "Annual cultural fest",
        "Weekly music sessions",
        "Dance competitions",
        "Theater workshops"
      ],
      achievements: [
        "Best College Cultural Team Award 2021",
        "Represented college in 5 state-level competitions"
      ],
      contactPerson: "Ananya Patel",
      email: "culturalclub@example.com",
      meetingSchedule: "Every Friday, 4:00 PM",
      location: "Auditorium"
    },
    {
      id: 3,
      name: "Literary Society",
      logo: "/images/literary-club-logo.png",
      description: "Promotes reading, writing, and literary appreciation through discussions, debates, and creative writing.",
      activities: [
        "Book club meetings",
        "Poetry slams",
        "Essay competitions",
        "Literary magazine publication"
      ],
      achievements: [
        "Published annual literary magazine 'Expressions'",
        "Organized state-level debate competition"
      ],
      contactPerson: "Ishaan Gupta",
      email: "literarysociety@example.com",
      meetingSchedule: "Every Wednesday, 3:30 PM",
      location: "Library Conference Room"
    },
    {
      id: 4,
      name: "Sports Club",
      logo: "/images/sports-club-logo.png",
      description: "Promotes physical fitness, sportsmanship, and competitive spirit through various sports activities.",
      activities: [
        "Intra-college tournaments",
        "Fitness sessions",
        "Sports coaching",
        "Annual sports day"
      ],
      achievements: [
        "District Cricket Champions 2022",
        "4 athletes selected for state-level competitions"
      ],
      contactPerson: "Kiran Verma",
      email: "sportsclub@example.com",
      meetingSchedule: "Every Tuesday & Thursday, 5:00 PM",
      location: "Sports Complex"
    },
    {
      id: 5,
      name: "Environment Club",
      logo: "/images/eco-club-logo.png",
      description: "Works towards environmental conservation and sustainability through awareness programs and action initiatives.",
      activities: [
        "Campus cleanliness drives",
        "Tree plantation events",
        "Waste management workshops",
        "Environmental awareness campaigns"
      ],
      achievements: [
        "Implemented campus-wide waste segregation system",
        "Planted 1000+ trees in campus vicinity"
      ],
      contactPerson: "Neha Reddy",
      email: "ecoclub@example.com",
      meetingSchedule: "Every Monday, 3:00 PM",
      location: "Botanical Garden"
    }
  ],
  joinProcess: {
    howToJoin: "Students can join clubs at the beginning of each semester during Club Enrollment Week",
    requirements: "Open to all registered students",
    fees: "Most clubs are free to join, some may have minimal activity fees",
    benefits: "Skill development, leadership opportunities, co-curricular recognition in transcripts"
  },
  startNewClub: {
    process: "Submit a proposal to the Student Affairs Office with at least 15 interested members and a faculty advisor",
    guidelines: "Clubs must align with the college's mission and values and provide unique opportunities not covered by existing clubs",
    support: "Approved clubs receive basic funding, meeting space, and promotion through college channels"
  }
};

// Create Context
const StudentClubsContext = createContext();

// Provider Component
export const StudentClubsProvider = ({ children }) => {
  const [clubsData, setClubsData] = useState(() => {
    // Try to get data from localStorage
    const storedData = localStorage.getItem('college_website_student_clubs');
    return storedData ? JSON.parse(storedData) : defaultStudentClubsData;
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('college_website_student_clubs', JSON.stringify(clubsData));
  }, [clubsData]);

  // Function to update student clubs data
  const updateClubsData = (newData) => {
    setClubsData(newData);
  };

  return (
    <StudentClubsContext.Provider value={{ clubsData, updateClubsData }}>
      {children}
    </StudentClubsContext.Provider>
  );
};

// Custom hook to use the Student Clubs context
export const useStudentClubs = () => useContext(StudentClubsContext);

export default defaultStudentClubsData; 