import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/Academics.css';
import academicData from '../data/academics.json';

const Academics = () => {
  const { calendarEvents, announcements } = academicData;

  return (
    <div className="academics-page">
      {/* Hero Section */}
      <section className="academics-hero">
        <Container>
          <div className="hero-content text-center">
            <h1>Academics</h1>
            <p>Excellence in Engineering Education</p>
          </div>
        </Container>
      </section>

      {/* Programs Section */}
      <section className="programs-section py-5">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Our Programs</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={4} md={6} className="mb-4">
              <Card className="program-card h-100">
                <Card.Body>
                  <div className="program-icon">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <Card.Title>Computer Science Engineering</Card.Title>
                  <Card.Text>
                    A comprehensive program covering software development, algorithms, and computer systems.
                  </Card.Text>
                  <Link to="/cse" className="btn btn-primary">Learn More</Link>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <Card className="program-card h-100">
                <Card.Body>
                  <div className="program-icon">
                    <i className="fas fa-microchip"></i>
                  </div>
                  <Card.Title>Electronics Engineering</Card.Title>
                  <Card.Text>
                    Focus on electronic systems, communication, and embedded systems.
                  </Card.Text>
                  <Link to="/ece" className="btn btn-primary">Learn More</Link>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <Card className="program-card h-100">
                <Card.Body>
                  <div className="program-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <Card.Title>Mechanical Engineering</Card.Title>
                  <Card.Text>
                    Study of mechanical systems, thermodynamics, and manufacturing processes.
                  </Card.Text>
                  <Link to="/me" className="btn btn-primary">Learn More</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Academic Calendar Section */}
      <section className="calendar-section py-5 bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Academic Calendar</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              <ListGroup className="calendar-events">
                {calendarEvents.map((event, index) => (
                  <ListGroup.Item key={index} className="calendar-event">
                    <div className="event-date">{new Date(event.date).toLocaleDateString()}</div>
                    <div className="event-content">
                      <h5>{event.title}</h5>
                      <p>{event.description}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Announcements Section */}
      <section className="announcements-section py-5">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Announcements</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              <ListGroup className="announcements-list">
                {announcements.map((announcement, index) => (
                  <ListGroup.Item key={index} className="announcement-item">
                    <div className="announcement-date">{new Date(announcement.date).toLocaleDateString()}</div>
                    <div className="announcement-content">
                      <h5>{announcement.title}</h5>
                      <p>{announcement.description}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section py-5 bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Quick Links</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <div className="quick-links-card">
                <h4>Academic Resources</h4>
                <ul>
                  <li><Link to="/syllabus">Syllabus</Link></li>
                  <li><Link to="/timetable">Timetable</Link></li>
                  <li><Link to="/exam-schedule">Exam Schedule</Link></li>
                  <li><Link to="/results">Results</Link></li>
                </ul>
              </div>
            </Col>
            
            <Col md={4} className="mb-4">
              <div className="quick-links-card">
                <h4>Student Support</h4>
                <ul>
                  <li><Link to="/scholarships">Scholarships</Link></li>
                  <li><Link to="/counseling">Counseling</Link></li>
                  <li><Link to="/placement">Placement</Link></li>
                  <li><Link to="/alumni">Alumni</Link></li>
                </ul>
              </div>
            </Col>
            
            <Col md={4} className="mb-4">
              <div className="quick-links-card">
                <h4>Downloads</h4>
                <ul>
                  <li><Link to="/forms">Forms</Link></li>
                  <li><Link to="/guidelines">Guidelines</Link></li>
                  <li><Link to="/policies">Policies</Link></li>
                  <li><Link to="/brochure">Brochure</Link></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Academics; 