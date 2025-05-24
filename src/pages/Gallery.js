import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import '../assets/Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>Gallery</h1>
            <p>Visual glimpses of life at GEC Barmer</p>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Photo Gallery</h6>
            <h2 className="heading">Campus Life & Events</h2>
            <div className="heading-line"></div>
          </div>
          
          <Tab.Container id="gallery-tabs" defaultActiveKey="campus">
            <Nav className="gallery-nav justify-content-center mb-5">
              <Nav.Item>
                <Nav.Link eventKey="campus">Campus</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="events">Events</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tech-safari">Tech SAFARI</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="workshops">Workshops</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sports">Sports</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Tab.Content>
              <Tab.Pane eventKey="campus">
                <Row className="gallery-row g-3">
                  {campusImages.map((image, index) => (
                    <Col lg={4} md={6} key={index}>
                      <div className="gallery-item" onClick={() => openLightbox(image)}>
                        <img src={image.src} alt={image.alt} className="img-fluid" />
                        <div className="overlay">
                          <div className="content">
                            <h5>{image.title}</h5>
                            <p>{image.description}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              
              <Tab.Pane eventKey="events">
                <Row className="gallery-row g-3">
                  {eventsImages.map((image, index) => (
                    <Col lg={4} md={6} key={index}>
                      <div className="gallery-item" onClick={() => openLightbox(image)}>
                        <img src={image.src} alt={image.alt} className="img-fluid" />
                        <div className="overlay">
                          <div className="content">
                            <h5>{image.title}</h5>
                            <p>{image.description}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              
              <Tab.Pane eventKey="tech-safari">
                <Row className="gallery-row g-3">
                  {techSafariImages.map((image, index) => (
                    <Col lg={4} md={6} key={index}>
                      <div className="gallery-item" onClick={() => openLightbox(image)}>
                        <img src={image.src} alt={image.alt} className="img-fluid" />
                        <div className="overlay">
                          <div className="content">
                            <h5>{image.title}</h5>
                            <p>{image.description}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              
              <Tab.Pane eventKey="workshops">
                <Row className="gallery-row g-3">
                  {workshopImages.map((image, index) => (
                    <Col lg={4} md={6} key={index}>
                      <div className="gallery-item" onClick={() => openLightbox(image)}>
                        <img src={image.src} alt={image.alt} className="img-fluid" />
                        <div className="overlay">
                          <div className="content">
                            <h5>{image.title}</h5>
                            <p>{image.description}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              
              <Tab.Pane eventKey="sports">
                <Row className="gallery-row g-3">
                  {sportsImages.map((image, index) => (
                    <Col lg={4} md={6} key={index}>
                      <div className="gallery-item" onClick={() => openLightbox(image)}>
                        <img src={image.src} alt={image.alt} className="img-fluid" />
                        <div className="overlay">
                          <div className="content">
                            <h5>{image.title}</h5>
                            <p>{image.description}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="close-btn" onClick={closeLightbox}>&times;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} className="img-fluid" />
            <div className="lightbox-caption">
              <h4>{selectedImage.title}</h4>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sample campus images
const campusImages = [
  {
    src: '/images/campus-1.jpg',
    alt: 'College Building',
    title: 'Main Academic Block',
    description: 'The main academic building houses classrooms, laboratories, and faculty offices'
  },
  {
    src: '/images/campus-2.jpg',
    alt: 'College Library',
    title: 'Central Library',
    description: 'Our well-stocked library with reading areas and digital resources'
  },
  {
    src: '/images/campus-3.jpg',
    alt: 'Computer Lab',
    title: 'Computer Center',
    description: 'Modern computer lab equipped with latest hardware and software'
  },
  {
    src: '/images/campus-4.jpg',
    alt: 'Hostel Building',
    title: 'Student Hostels',
    description: 'Comfortable accommodation for students with all necessary amenities'
  },
  {
    src: '/images/campus-5.jpg',
    alt: 'Sports Ground',
    title: 'Sports Facilities',
    description: 'Outdoor sports facilities for various games and activities'
  },
  {
    src: '/images/campus-6.jpg',
    alt: 'Canteen',
    title: 'College Canteen',
    description: 'Cafeteria serving healthy and affordable meals to students and staff'
  }
];

// Sample events images
const eventsImages = [
  {
    src: '/images/event-1.jpg',
    alt: 'Cultural Event',
    title: 'Annual Cultural Fest',
    description: 'Students performing during the annual cultural festival'
  },
  {
    src: '/images/event-2.jpg',
    alt: 'Independence Day',
    title: 'Independence Day Celebration',
    description: 'Flag hoisting ceremony on Independence Day'
  },
  {
    src: '/images/event-3.jpg',
    alt: 'National Conference',
    title: 'National Conference on Emerging Technologies',
    description: 'Experts and researchers presenting their work at the conference'
  },
  {
    src: '/images/event-4.jpg',
    alt: 'Engineers Day',
    title: 'Engineers Day Celebration',
    description: 'Special events organized to celebrate Engineers Day'
  },
  {
    src: '/images/event-5.jpg',
    alt: 'Alumni Meet',
    title: 'Alumni Meet 2024',
    description: 'Former students visiting campus for the annual alumni gathering'
  },
  {
    src: '/images/event-6.jpg',
    alt: 'Graduation Day',
    title: 'Graduation Ceremony',
    description: 'Students receiving their degrees during the graduation ceremony'
  }
];

// Sample Tech SAFARI images
const techSafariImages = [
  {
    src: '/images/tech-1.jpg',
    alt: 'Tech SAFARI',
    title: 'Tech SAFARI 2K24 Inauguration',
    description: 'Opening ceremony of the annual technical fest'
  },
  {
    src: '/images/tech-2.jpg',
    alt: 'Tech SAFARI Project Exhibition',
    title: 'Project Exhibition',
    description: 'Students showcasing their innovative projects'
  },
  {
    src: '/images/tech-3.jpg',
    alt: 'Tech SAFARI Hackathon',
    title: 'Hackathon',
    description: 'Students participating in the 24-hour coding challenge'
  },
  {
    src: '/images/tech-4.jpg',
    alt: 'Tech SAFARI Workshop',
    title: 'Technical Workshop',
    description: 'Hands-on workshop on emerging technologies'
  },
  {
    src: '/images/tech-5.jpg',
    alt: 'Tech SAFARI Guest Lecture',
    title: 'Expert Talk',
    description: 'Industry expert sharing insights with students'
  },
  {
    src: '/images/tech-6.jpg',
    alt: 'Tech SAFARI Prize Distribution',
    title: 'Prize Distribution Ceremony',
    description: 'Winners of various competitions receiving awards'
  }
];

// Sample workshop images
const workshopImages = [
  {
    src: '/images/workshop-1.jpg',
    alt: 'AI Workshop',
    title: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop on artificial intelligence and machine learning'
  },
  {
    src: '/images/workshop-2.jpg',
    alt: 'Robotics Workshop',
    title: 'Robotics Workshop',
    description: 'Students learning to design and program robots'
  },
  {
    src: '/images/workshop-3.jpg',
    alt: 'Web Development Workshop',
    title: 'Web Development Workshop',
    description: 'Training session on modern web development technologies'
  },
  {
    src: '/images/workshop-4.jpg',
    alt: 'IoT Workshop',
    title: 'Internet of Things Workshop',
    description: 'Practical session on IoT applications and implementation'
  },
  {
    src: '/images/workshop-5.jpg',
    alt: 'Industry Training',
    title: 'Industry Training Program',
    description: 'Industry professionals conducting specialized training'
  },
  {
    src: '/images/workshop-6.jpg',
    alt: 'CAD Workshop',
    title: 'CAD/CAM Workshop',
    description: 'Training on computer-aided design and manufacturing'
  }
];

// Sample sports images
const sportsImages = [
  {
    src: '/images/sports-1.jpg',
    alt: 'Cricket Match',
    title: 'Inter-College Cricket Tournament',
    description: 'Students participating in the annual cricket tournament'
  },
  {
    src: '/images/sports-2.jpg',
    alt: 'Basketball Match',
    title: 'Basketball Match',
    description: 'Exciting basketball match between college teams'
  },
  {
    src: '/images/sports-3.jpg',
    alt: 'Sports Day',
    title: 'Annual Sports Day',
    description: 'Students participating in various athletic events'
  },
  {
    src: '/images/sports-4.jpg',
    alt: 'Football Match',
    title: 'Football Tournament',
    description: 'Inter-departmental football competition'
  },
  {
    src: '/images/sports-5.jpg',
    alt: 'Volleyball',
    title: 'Volleyball Match',
    description: 'Students playing volleyball in the college court'
  },
  {
    src: '/images/sports-6.jpg',
    alt: 'Indoor Games',
    title: 'Indoor Sports Competition',
    description: 'Students participating in various indoor games'
  }
];

export default Gallery; 