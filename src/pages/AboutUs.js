import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/AboutUs.css';
import ImageLinks from '../utils/ImageLinks';
import leadershipData from '../data/leadership.json';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <div className="hero-content text-center">
            <h1>About GEC Barmer</h1>
            <p>Empowering students through quality technical education and innovative research</p>
          </div>
        </Container>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="mb-4">
              <Card className="vision-card h-100">
                <Card.Body>
                  <div className="section-icon">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h3>Vision</h3>
                  <p>To be a premier institution of technical education, fostering innovation, research, and excellence in engineering education while contributing to the development of society.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="mission-card h-100">
                <Card.Body>
                  <div className="section-icon">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <h3>Mission</h3>
                  <ul>
                    <li>Provide quality technical education through innovative teaching-learning methods</li>
                    <li>Foster research and development activities</li>
                    <li>Develop industry-academia collaboration</li>
                    <li>Promote entrepreneurship and innovation</li>
                    <li>Create responsible citizens and leaders</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="leadership-section py-5 bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Our Leadership</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            {Object.entries(leadershipData).map(([key, leader]) => (
              <Col lg={4} md={6} className="mb-4" key={key}>
                <Card className="leadership-card h-100">
                  <div className="leadership-image-container">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="leadership-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = ImageLinks.placeholder;
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{leader.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{leader.position}</Card.Subtitle>
                    <Card.Text className="qualifications">
                      <strong>Qualifications:</strong> {leader.qualifications}
                    </Card.Text>
                    <Card.Text className="experience">
                      <strong>Experience:</strong> {leader.experience}
                    </Card.Text>
                    <Card.Text className="message">
                      {leader.message}
                    </Card.Text>
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

export default AboutUs; 