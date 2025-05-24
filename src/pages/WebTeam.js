import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import webTeamData from '../data/webTeam.json';
import '../assets/WebTeam.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WebTeam = () => {
  const { generalInfo, members } = webTeamData;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <div className="web-team-page">
      {/* Hero Section */}
      <section className="web-hero">
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content" data-aos="fade-up">
            <h1>{generalInfo.title}</h1>
            <p>{generalInfo.description}</p>
          </div>
        </Container>
      </section>

      {/* Team Members Section */}
      <section className="section team-section">
        <Container>
          <div className="section-heading text-center mb-5" data-aos="fade-up">
            <h2>Our Team</h2>
            <p>Meet our talented developers who work tirelessly to maintain and enhance the college website</p>
          </div>
          <Row className="justify-content-center">
            {members.map((member, index) => (
              <Col lg={4} md={6} className="mb-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="team-card h-100">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} className="img-fluid" />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <div className="skills-list">
                          {member.skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <p className="role">{member.role}</p>
                    <p className="department">{member.department}</p>
                    <p className="year-branch">{member.year} - {member.branch}</p>
                    <div className="social-links">
                      {member.name === "John Doe" ? (
                        <>
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin" title="LinkedIn Profile">
                              <i className="fab fa-linkedin"></i>
                            </a>
                          )}
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="social-link email" title="Email">
                              <i className="fas fa-envelope"></i>
                            </a>
                          )}
                        </>
                      ) : (
                        <>
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin" title="LinkedIn Profile">
                              <i className="fab fa-linkedin"></i>
                            </a>
                          )}
                          {member.github && (
                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link github" title="GitHub Profile">
                              <i className="fab fa-github"></i>
                            </a>
                          )}
                          {member.portfolio && (
                            <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="social-link portfolio" title="Portfolio Website">
                              <i className="fas fa-globe"></i>
                            </a>
                          )}
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="social-link email" title="Email">
                              <i className="fas fa-envelope"></i>
                            </a>
                          )}
                        </>
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
      <section className="section contact-section">
        <Container>
          <div className="section-heading text-center mb-5" data-aos="fade-up">
            <h2>Get in Touch</h2>
            <p>Have questions or suggestions? We'd love to hear from you!</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8} data-aos="fade-up">
              <Card className="contact-card">
                <Card.Body>
                  <div className="contact-info">
                    <div className="info-item" data-aos="fade-right" data-aos-delay="100">
                      <i className="fas fa-envelope"></i>
                      <p>webteam@gecbarmer.ac.in</p>
                    </div>
                    <div className="info-item" data-aos="fade-right" data-aos-delay="200">
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Government Engineering College, Barmer, Rajasthan</p>
                    </div>
                    <div className="info-item" data-aos="fade-right" data-aos-delay="300">
                      <i className="fas fa-clock"></i>
                      <p>Available 24/7 for website maintenance and updates</p>
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

export default WebTeam; 