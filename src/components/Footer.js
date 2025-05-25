import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useLinks } from '../utils/LinkContext';
import '../assets/Footer.css';

const Footer = () => {
  const { getLinksByCategory } = useLinks();
  
  // Get important links from the context
  const importantLinks = getLinksByCategory('important');
  
  return (
    <footer className="site-footer">
      <Container>
        <Row className="py-5">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">GEC Barmer</h5>
            <p className="footer-text">
              Government Engineering College Barmer is committed to excellence in technical education, 
              research, and innovation.
            </p>
            <div className="contact-info">
              <p><strong>Address:</strong> Govt. Engineering College Barmer,<br />
              Govt. Polytechnic College Campus,<br />
              N.H. 68, Jaisalmer Road, Barmer (Raj.)</p>
              <p><strong>Phone:</strong> +91-8118898267, +91-8290521985</p>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/principal">Principal</Link></li>
              <li><Link to="/departments">Departments</Link></li>
              <li><Link to="/academics">Academics</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Campus Life</h5>
            <ul className="footer-links">
              <li><Link to="/student-clubs">Student Clubs</Link></li>
              <li><Link to="/nss">NSS</Link></li>
              <li><Link to="/ncc">NCC</Link></li>
              <li><Link to="/library">Library</Link></li>
              <li><Link to="/hostel">Hostel</Link></li>
              <li><Link to="/student-activity-council">Student Activity Council</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Engage</h5>
            <ul className="footer-links">
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/media-coverage">Media Coverage</Link></li>
              <li><Link to="/industry-associations">Industry Associations</Link></li>
              <li><Link to="/web-team">Web Development Team</Link></li>
              <li><Link to="/tenders">Tenders & Orders</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row className="py-3">
          <Col md={6} className="text-center text-md-start d-flex align-items-center">
            <p className="copyright">© {new Date().getFullYear()} | All Rights Reserved by GEC Barmer</p>
            <a href="https://aarinmahala.vercel.app/" target="_blank" rel="noopener noreferrer" className="developer-link">
              <span className="developer-text">Developed by Aarin Mahala</span>
              <svg className="developer-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 