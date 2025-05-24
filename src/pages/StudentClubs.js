import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const StudentClubs = () => {
  return (
    <div className="student-clubs-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>Student Clubs</h1>
            <p>Discover our vibrant student communities</p>
          </div>
        </Container>
      </section>

      {/* Clubs Overview */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Campus Life</h6>
            <h2 className="heading">Our Student Clubs</h2>
            <div className="heading-line"></div>
            <p className="mt-4 text-center mx-auto" style={{ maxWidth: '800px' }}>
              At GEC Barmer, we believe in the holistic development of students. Our student clubs provide platforms 
              for students to explore their interests, develop leadership skills, and foster creativity beyond academics.
            </p>
          </div>
          
          <Row>
            {clubs.map((club, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="club-card h-100">
                  <Card.Img variant="top" src={club.image} alt={club.name} />
                  <Card.Body>
                    <Card.Title>{club.name}</Card.Title>
                    <Card.Text>{club.description}</Card.Text>
                    <h6 className="mt-3">Activities:</h6>
                    <ul className="club-activities">
                      {club.activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

// Sample clubs data
const clubs = [
  {
    name: '16MM ( Photography Club )',
    description: 'This is a Photography Club for creative space for photography and videography enthusiasts, offering workshops, photo walks, and events to enhance visual storytelling skills and artistic expression.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677747/16mm_hzxrv4.jpg",
    activities: [
      'Photo walks',
      'Before & After Challenge',
      'Photo storytelling',
      'Monthly Photo Contest'
    ]
  },
  {
    name: 'Tech Club',
    description: 'This is a Tech Club for fosters innovation through workshops, hackathons, and projects, empowering students to explore AI, IoT, coding, and more while bridging theory with real-world tech skills.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677743/tech_wyt2nw.jpg",
    activities: [
      'Workshops and training sessions',
      'Project showcase',
      'Tech Quizzes',
      'Hackathons',
    ]
  },
  {
    name: 'Srijan ( Literature Club )',
    description: 'This is a Literature Club for fosters creativity and expression through poetry, prose, debates, and workshops, nurturing a love for reading, writing, and intellectual exploration among students.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677744/srijan_vereym.jpg",
    activities: [
      'Open Mic Night',
      'Recording projects',
      'Collab with Dance Club',
      'Songwriting Workshop',
    ]
  },
  {
    name: 'Phoenix Fire ( Sports Club )',
    description: 'This is a Sports Club for promoting physical fitness, teamwork, and sportsmanship through various indoor and outdoor sports activities.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677743/sports_j7ncuo.jpg",
    activities: [
      'Inter-college sports tournaments',
      'Annual sports meet',
      'Fitness training sessions',
      'Adventure sports expeditions'
    ]
  },
  {
    name: 'Anhad ( Music Club )',
    description: 'This is a Music Club for fostering a love for music through singing, dancing, and music production, providing a platform for students to showcase their talents and explore different genres of music.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677751/music_hvpdbx.jpg",
    activities: [
      'open mic night',
      'Recording projects',
      'Collab with Dance Club',
      'Songwriting Workshop',
    
    ]
  },
  {
    name: ' Natraja ( Dance Club )',
    description: 'This is a Dance Club for promoting cultural dance forms and fostering a love for dance through various dance styles and performances.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677751/dance_uglpzh.jpg",
    activities: [
      'Dance Battles',
      'Dance film project',
      'Collab with other clubs',
      'Annual Dance Showcase',
    ]
  },
  {
    name: 'Petrotitans',
    description: 'Petrotitan, a dynamic and forward-thinking student\'s organization of the department of Petroleum Engineering, GEC Barmer',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747678551/WhatsApp_Image_2025-05-19_at_23.41.25_ad7100c0_fsqvih.jpg",
    activities: [
      'Technical Workshops',
      'Energy Summits',
      'Competitions',
      'Field Trips',
    ]
  },
  {
    name: 'Nirmiti ( Art & Craft Club )',
    description: 'This is a Art & Craft Club for fostering creativity and artistic expression through various art forms and craft activities.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677748/art_vmdhnm.jpg",
    activities: [
      'Themed Art Challenges',
      'Sketching Sessions in Nature',
      'Art Swap Event',
      'Art Exhibition',
    ]
  },
  {
    name: 'Drama Club',
    description: 'A creative space for theater enthusiasts to express themselves through acting, direction, and stage management.',
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747677743/lela_jhsjuo.jpg",
    activities: [
      'Stage plays and theatrical performances',
      'Acting and improvisation workshops',
      'Script writing and adaptation',
      'Stage design and lighting workshops',
      'Annual drama festival',
      'Inter-college theater competitions'
    ]
  }
];

export default StudentClubs;  