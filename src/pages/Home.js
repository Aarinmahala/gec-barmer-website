import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/Home.css';
import ImageLinks from '../utils/ImageLinks';
import { useFileAnnouncements } from '../utils/FileAnnouncementLoader';
import FileAnnouncementDisplay from '../components/FileAnnouncementDisplay';
import PDFLinks from '../utils/PDFLinks';

const Home = () => {
  // Get latest announcements from file
  const { getLatestAnnouncements } = useFileAnnouncements();
  const latestAnnouncements = getLatestAnnouncements(3);
  
  // Format date for announcements
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="home-page page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <Carousel fade interval={5000} pause={false}>
          <Carousel.Item>
            <div 
              className="carousel-image" 
              style={{ 
                backgroundImage: `url(${ImageLinks.carousel[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="carousel-overlay"></div>
              <Container>
                <div className="carousel-content">
                  <h1>Welcome to Government Engineering College Barmer</h1>
                  <p>Empowering students through quality technical education and innovative research</p>
                  <div className="hero-buttons">
                    <Link to="/admission" className="btn btn-primary me-3">Apply Now</Link>
                    <Link to="/about" className="btn btn-outline-primary">Learn More</Link>
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div 
              className="carousel-image" 
              style={{ 
                backgroundImage: `url(${ImageLinks.carousel[1]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="carousel-overlay"></div>
              <Container>
                <div className="carousel-content">
                  <h1>Why Choose GEC Barmer?</h1>
                  <p>Experience excellence in technical education with our comprehensive programs and modern infrastructure</p>
                  <div className="hero-buttons">
                    <Link to="/departments" className="btn btn-primary me-3">Explore Departments</Link>
                    <Link to="/admission" className="btn btn-outline-light">Apply Now</Link>
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div 
              className="carousel-image" 
              style={{ 
                backgroundImage: `url(${ImageLinks.carousel[2]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="carousel-overlay"></div>
              <Container>
                <div className="carousel-content">
                  <h1>Research & Innovation</h1>
                  <p>Pushing boundaries through cutting-edge research and industry collaborations</p>
                  <div className="hero-buttons">
                    <Link to="/research" className="btn btn-primary me-3">Research</Link>
                    <Link to="/gallery" className="btn btn-outline-light">Gallery</Link>
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div 
              className="carousel-image" 
              style={{ 
                backgroundImage: `url(${ImageLinks.carousel[3]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="carousel-overlay"></div>
              <Container>
                <div className="carousel-content">
                  <h1>Student Life</h1>
                  <p>Experience a vibrant campus life with diverse activities and opportunities</p>
                  <div className="hero-buttons">
                    <Link to="/student-clubs" className="btn btn-primary me-3">Student Clubs</Link>
                    <Link to="/facilities" className="btn btn-outline-light">Campus Facilities</Link>
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div 
              className="carousel-image" 
              style={{ 
                backgroundImage: `url(${ImageLinks.carousel[4]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="carousel-overlay"></div>
              <Container>
                <div className="carousel-content">
                  <h1>Academic Excellence</h1>
                  <p>Committed to providing quality education and fostering intellectual growth</p>
                  <div className="hero-buttons">
                    <Link to="/academics" className="btn btn-primary me-3">Academics</Link>
                    <Link to="/academics/syllabus" className="btn btn-outline-light">Syllabus</Link>
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Announcement Section */}
      <section className="announcement-section py-4">
        <Container>
          <div className="announcement-container">
            <div className="announcement-heading">
              <h5>Latest Announcements</h5>
            </div>
            <div className="announcement-content">
              <FileAnnouncementDisplay count={3} showCarousel={true} />
            </div>
            <div className="announcement-link">
              <Link to="/announcements">View All</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">About Us</h6>
            <h2 className="heading">Excellence in Engineering Education</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="about-image">
                <img src={ImageLinks.aboutCollege} alt="GEC Barmer" className="img-fluid rounded" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-content">
                <p className="lead">Government Engineering College Barmer is a premier institution dedicated to providing quality technical education and fostering innovation.</p>
                <p>Established with a vision to empower students with technical knowledge and skills, we are committed to academic excellence, research, and industry collaboration. Our state-of-the-art infrastructure and experienced faculty create an ideal environment for learning and growth.</p>
                <div className="about-stats">
                  <div className="stat-item">
                    <h3>7</h3>
                    <p>Engineering Streams</p>
                  </div>
                  <div className="stat-item">
                    <h3>50+</h3>
                    <p>Faculty Members</p>
                  </div>
                  <div className="stat-item">
                    <h3>1000+</h3>
                    <p>Students</p>
                  </div>
                </div>
                <Link to="/about" className="btn btn-primary mt-3">Learn More</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Departments Section */}
      <section className="section departments-section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Academic Programs</h6>
            <h2 className="heading">Our Departments</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row>
            {departments.map((dept, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="department-card h-100">
                  <div className="department-placeholder" style={{ backgroundColor: dept.color }}>
                    <i className={dept.icon}></i>
                  </div>
                  <Card.Body>
                    <Card.Title>{dept.name}</Card.Title>
                    <Card.Text>{dept.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0">
                    <Link to={dept.link} className="btn btn-outline-primary">Learn More</Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Campus Life Section */}
      <section className="section campus-life-section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Student Experience</h6>
            <h2 className="heading">Campus Life</h2>
            <div className="heading-line"></div>
            <p className="section-description mt-4">
              Discover a vibrant campus environment that nurtures talent, leadership, and personal growth
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="campus-life-card">
                <div className="card-content">
                  <div className="card-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <h3>Sports</h3>
                  <p>State-of-the-art sports facilities and regular inter-college tournaments. Join our teams and represent the college in various sports competitions.</p>
                </div>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="campus-life-card">
                <div className="card-content">
                  <div className="card-icon">
                  <i className="fas fa-users"></i>
                </div>
                  <h3>NCC</h3>
                  <p>Leadership training and military discipline through NCC activities. Develop leadership skills and participate in national-level camps and parades.</p>
                </div>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="campus-life-card">
                <div className="card-content">
                  <div className="card-icon">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h3>NSS</h3>
                  <p>Community service and social development through NSS initiatives. Make a difference in society through various social service activities.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resources & Support Section */}
      <section className="section resources-section">
        <Container>
          <div className="section-heading text-center mb-5">
            <div className="section-icon-wrapper mb-3">
              <div className="section-icon">
                <i className="fas fa-university"></i>
              </div>
            </div>
            <h6 className="sub-heading">STUDENT RESOURCES</h6>
            <h2 className="heading">Campus Resources & Support</h2>
            <div className="heading-line"></div>
            <p className="section-description mt-4">
              Access essential academic resources and support services to enhance your educational journey
            </p>
          </div>
          
          <Row>
            <Col lg={5} className="mb-5 mb-lg-0">
              <div className="section-heading mb-4">
                <div className="resource-heading">
                  <div className="resource-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h5>Academic Resources</h5>
          </div>
              </div>
              
              <Row>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <h4>Syllabus</h4>
                    <p>Access syllabus of all programs and semesters</p>
                    <a href={PDFLinks.getAcademicResourceLink('syllabus')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">View Syllabus</a>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <h4>Academic Calendar</h4>
                    <p>Important dates for exams, events, and academic activities</p>
                    <a href={PDFLinks.getAcademicResourceLink('academicCalendar')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">View Calendar</a>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-chart-bar"></i>
                    </div>
                    <h4>Results</h4>
                    <p>Semester examination results and grade cards for students</p>
                    <a href={PDFLinks.getAcademicResourceLink('results')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">Check Results</a>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-bullhorn"></i>
                    </div>
                    <h4>Announcements</h4>
                    <p>Latest updates, notices, and important information. </p>
                    <Link to="/announcements" className="btn btn-sm btn-outline-primary mt-2">View Announcements</Link>
                  </div>
                </Col>
              </Row>
            </Col>
            
            <Col lg={7}>
              <div className="section-heading mb-4">
                <div className="resource-heading">
                  <div className="resource-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h5>Student Support Services</h5>
                </div>
              </div>
              
              <Row>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-comment-dots"></i>
                    </div>
                    <h4>Grievance Redressal</h4>
                    <p>Submit and track complaints through our transparent grievance system</p>
                    <a href={PDFLinks.getStudentSupportLink('grievanceRedressal')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">Learn More</a>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-hand-paper"></i>
                    </div>
                    <h4>Anti-Ragging Cell</h4>
                    <p>Ensuring a safe and respectful campus environment for all students</p>
                    <a href={PDFLinks.getStudentSupportLink('antiRagging')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">Learn More</a>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-venus"></i>
                    </div>
                    <h4>Women & Gender Cell</h4>
                    <p>Promoting gender equality and addressing women's welfare issues</p>
                    <a href={PDFLinks.getStudentSupportLink('womenGenderCell')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">Learn More</a>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="campus-feature support-feature">
                    <div className="feature-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <h4>SC-ST Cell</h4>
                    <p>Supporting and empowering SC-ST students through dedicated programs</p>
                    <a href={PDFLinks.getStudentSupportLink('scstCell')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">Learn More</a>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

// Sample data for departments
const departments = [
  {
    name: 'Computer Science Engineering (AI & ML)',
    description: 'Cutting-edge curriculum focused on Artificial Intelligence and Machine Learning technologies.',
    color: 'rgba(79, 70, 229, 0.2)',
    icon: 'fas fa-laptop-code',
    link: '/departments/cse'
  },
  {
    name: 'Electrical Engineering',
    description: 'A comprehensive program covering power systems, control systems, and electrical machines.',
    color: 'rgba(245, 158, 11, 0.2)',
    icon: 'fas fa-bolt',
    link: '/departments/electrical'
  },
  {
    name: 'Mechanical Engineering',
    description: 'Study of design, manufacturing, and maintenance of mechanical systems.',
    color: 'rgba(16, 185, 129, 0.2)',
    icon: 'fas fa-cogs',
    link: '/departments/mechanical'
  },
  {
    name: 'Civil Engineering',
    description: 'Comprehensive study of infrastructure development, structural design, and construction management.',
    color: 'rgba(59, 130, 246, 0.2)',
    icon: 'fas fa-building',
    link: '/departments/civil'
  },
  {
    name: 'Chemical Engineering',
    description: 'Focus on chemical processes, industrial chemistry, and process optimization.',
    color: 'rgba(236, 72, 153, 0.2)',
    icon: 'fas fa-flask',
    link: '/departments/chemical'
  },
  {
    name: 'Electronics Engineering',
    description: 'Study of electronic devices, circuits, and communication systems.',
    color: 'rgba(139, 92, 246, 0.2)',
    icon: 'fas fa-microchip',
    link: '/departments/electronics'
  },
  {
    name: 'Petroleum Engineering',
    description: 'Specialized program in oil and gas exploration, production, and processing.',
    color: 'rgba(239, 68, 68, 0.2)',
    icon: 'fas fa-oil-well',
    link: '/departments/petroleum'
  }
];

export default Home; 