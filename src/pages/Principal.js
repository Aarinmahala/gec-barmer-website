import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import '../assets/Principal.css';
import ImageLinks from '../utils/ImageLinks';

const Principal = () => {
  return (
    <div className="principal-page">
      <section className="page-hero bg-primary text-white">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content text-center py-5">
            <h1>Principal's Corner</h1>
            <p>Leadership and Vision for Excellence</p>
          </div>
        </Container>
      </section>

      <section className="section profile-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={4} className="text-center text-lg-start mb-4 mb-lg-0">
              <div className="principal-image-container">
                <img 
                  src={ImageLinks.principal} 
                  alt="Dr. Sandeep Rankawat" 
                  className="principal-image"
                />
              </div>
            </Col>
            <Col lg={8}>
              <div className="principal-info">
                <h2 className="principal-name">Dr. Sandeep Rankawat</h2>
                <p className="principal-designation">Principal, Government Engineering College Barmer</p>
                <p className="principal-qualification">Ph.D. in  Mechanical Engineering</p>  
                <div className="principal-contact mt-4">
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>principal@gecbarmer.ac.in</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>+91-8118898267</span>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>Govt. Engineering College Barmer, Govt. Polytechnic College Campus, N.H. 68, Jaisalmer Road, Barmer (Raj.)</span>
                  </div>
                </div>
                
                <div className="principal-social mt-3">
                  <a href="https://www.linkedin.com/school/government-engineering-college-barmer/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="social-link" 
                     aria-label="LinkedIn Profile">
                    <FaLinkedin />
                  </a>
                  <a href="https://twitter.com/gecbarmer" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="social-link" 
                     aria-label="Twitter Profile">
                    <FaTwitter />
                  </a>
                  <a href="https://www.facebook.com/gecbarmer" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="social-link" 
                     aria-label="Facebook Profile">
                    <FaFacebookSquare />
                  </a>
                  <a href="https://www.instagram.com/gecbarmer/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="social-link" 
                     aria-label="Instagram Profile">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section message-section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="message-card">
                <Card.Body>
                  <h3 className="section-title text-center mb-4">Principal's Message</h3>
                  <div className="message-content">
                    <p>Dear Students and Visitors,</p>
                    <p>Welcome to Government Engineering College, Barmer, an institution committed to excellence in engineering education. As the Principal, it is my privilege to lead this esteemed institution that aims to nurture the next generation of engineers and innovators.</p>
                    <p>At GEC Barmer, we believe in providing a holistic educational experience that combines strong theoretical foundations with practical skills. Our curriculum is designed to meet the evolving demands of the industry while fostering critical thinking, problem-solving abilities, and a spirit of innovation among our students.</p>
                    <p>We are proud of our dedicated faculty members who bring their expertise and passion to the classroom, creating an environment that encourages intellectual growth and academic excellence. Our state-of-the-art facilities and laboratories provide students with hands-on experience, preparing them for real-world challenges.</p>
                    <p>Our collaborations with industry partners like Rajasthan ILD Skill University, KAMTECH, Cairn Vedanta, JSW Energy, and Ultratech offer our students valuable exposure to industry practices and enhance their employability.</p>
                    <p>I encourage you to explore our website to learn more about our academic programs, facilities, and campus life. Whether you are a prospective student, a parent, or an industry partner, we welcome your interest in GEC Barmer.</p>
                    <p>Together, let us build a future where our graduates contribute meaningfully to technological advancement and societal progress.</p>
                    <p className="message-signature">Dr. Sandeep Rankawat<br/>Principal, GEC Barmer</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section achievements-section">
        <Container>
          <h3 className="section-title text-center mb-4">Leadership Initiatives & Achievements</h3>
          <Row className="achievements-list">
            <Col md={6} lg={4} className="mb-4">
              <Card className="achievement-card h-100">
                <Card.Body>
                  <h4 className="achievement-title">Academic Excellence</h4>
                  <p>Implemented new teaching methodologies and curriculum enhancements to improve academic outcomes across all departments.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="achievement-card h-100">
                <Card.Body>
                  <h4 className="achievement-title">Industry Partnerships</h4>
                  <p>Established strategic partnerships with leading companies to provide real-world exposure and internship opportunities to students.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="achievement-card h-100">
                <Card.Body>
                  <h4 className="achievement-title">Infrastructure Development</h4>
                  <p>Led significant campus infrastructure improvements including new laboratories and learning spaces.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="achievement-card h-100">
                <Card.Body>
                  <h4 className="achievement-title">Research Promotion</h4>
                  <p>Encouraged faculty and students to engage in research activities, leading to increased publications and project work.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="achievement-card h-100">
                <Card.Body>
                  <h4 className="achievement-title">Student Development</h4>
                  <p>Initiated various student development programs focusing on technical skills, soft skills, and entrepreneurship.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <Card className="achievement-card h-100">
                <Card.Body>
                  <h4 className="achievement-title">Recognition</h4>
                  <p>Led the college to achieve recognition in various educational rankings and competitions at state and national levels.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Principal; 