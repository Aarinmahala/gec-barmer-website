import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import tpCellData from '../data/tpCell.json';
import '../assets/TPCell.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TPCell = () => {
  const { generalInfo, leadership, coordinators, contactInfo } = tpCellData;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <div className="tp-cell-page">
      {/* Hero Section */}
      <section className="tp-hero">
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content" data-aos="fade-up">
            <h1>{generalInfo.title}</h1>
            <p>{generalInfo.description}</p>
          </div>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="section leadership-section">
        <Container>
          <div className="section-heading text-center mb-5" data-aos="fade-up">
            <h2>Leadership Team</h2>
            <p>Meet our dedicated team of professionals</p>
          </div>
          <Row>
            {leadership.map((member, index) => (
              <Col lg={4} md={6} className="mb-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="leadership-card h-100">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} className="img-fluid" />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <p className="description">{member.description}</p>
                      </div>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{member.title}</Card.Title>
                    <h4>{member.name}</h4>
                    <p className="department">{member.department}</p>
                    <div className="contact-details">
                      <p><i className="fas fa-envelope"></i> {member.email}</p>
                      <p><i className="fas fa-phone"></i> {member.phone}</p>
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                          <i className="fab fa-linkedin"></i> LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Coordinators Section */}
      <section className="section coordinators-section bg-light">
        <Container>
          <div className="section-heading text-center mb-5" data-aos="fade-up">
            <h2>{coordinators.title}</h2>
            <p>{coordinators.description}</p>
          </div>
          <Row>
            {coordinators.members.map((member, index) => (
              <Col lg={3} md={6} className="mb-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="coordinator-card h-100">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} className="img-fluid" />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <p className="role">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <p className="department">{member.department}</p>
                    <p className="year-branch">{member.year} - {member.branch}</p>
                    <div className="contact-details">
                      <p><i className="fas fa-envelope"></i> {member.email}</p>
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                          <i className="fab fa-linkedin"></i> LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section contact-section bg-light">
        <Container>
          <div className="section-heading text-center mb-5" data-aos="fade-up">
            <h2>Contact Information</h2>
            <p>Get in touch with us</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8} data-aos="fade-up">
              <Card className="contact-card">
                <Card.Body>
                  <div className="contact-info">
                    <div className="info-item" data-aos="fade-right" data-aos-delay="100">
                      <i className="fas fa-map-marker-alt"></i>
                      <p>{contactInfo.address}</p>
                    </div>
                    <div className="info-item" data-aos="fade-right" data-aos-delay="200">
                      <i className="fas fa-envelope"></i>
                      <p>{contactInfo.email}</p>
                    </div>
                    <div className="info-item" data-aos="fade-right" data-aos-delay="300">
                      <i className="fas fa-phone"></i>
                      <p>{contactInfo.phone}</p>
                    </div>
                    <div className="info-item" data-aos="fade-right" data-aos-delay="400">
                      <i className="fas fa-clock"></i>
                      <p>{contactInfo.workingHours}</p>
                    </div>
                    <div className="info-item" data-aos="fade-right" data-aos-delay="500">
                      <i className="fab fa-linkedin"></i>
                      <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        Connect with us on LinkedIn
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default TPCell; 