import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../assets/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>Contact Us</h1>
            <p>Get in touch with us for inquiries and information</p>
          </div>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="section">
        <Container>
          <Row className="g-5">
            <Col lg={6}>
              <div className="contact-form-section">
                <div className="section-heading mb-4">
                  <h6 className="sub-heading">Reach Out</h6>
                  <h2 className="heading">Send Us a Message</h2>
                  <div className="heading-line"></div>
                </div>
                
                <Form className="contact-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Enter subject" required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Your message" required />
                  </Form.Group>
                  <Button type="submit" className="btn-primary">
                    Send Message
                  </Button>
                </Form>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="contact-info-section">
                <div className="section-heading mb-4">
                  <h6 className="sub-heading">Information</h6>
                  <h2 className="heading">Contact Details</h2>
                  <div className="heading-line"></div>
                </div>
                
                <div className="contact-info">
                  <div className="contact-info-item">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="content">
                      <h5>Our Location</h5>
                      <p>Govt. Engineering College Barmer,<br />
                      Govt. Polytechnic College Campus,<br />
                      N.H. 68, Jaisalmer Road, Barmer (Raj.)</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="content">
                      <h5>Call Us</h5>
                      <p>+91-8118898267, +91-8290521985<br />
                      +91-8290466983, +91-9462723142</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="content">
                      <h5>Email Us</h5>
                      <p>principal@gecbarmer.ac.in<br />
                      admissions@gecbarmer.ac.in</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="content">
                      <h5>Office Hours</h5>
                      <p>Monday to Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links mt-4">
                  <h5>Connect With Us</h5>
                  <div className="social-icons">
                    <a href="https://facebook.com" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://instagram.com" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.8801992193393!2d71.35344281502075!3d25.247019183876086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394258f7749343d9%3A0xa8c0c68ac7bac757!2sGovernment%20Engineering%20College%20Barmer!5e0!3m2!1sen!2sin!4v1620819234745!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="GEC Barmer Location"
          ></iframe>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Have Questions?</h6>
            <h2 className="heading">Frequently Asked Questions</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="faq-item">
                <h4>How can I apply for admission to GEC Barmer?</h4>
                <p>Admissions to GEC Barmer are through the REAP (Rajasthan Engineering Admission Process) counseling. You need to qualify JEE Main and register for REAP counseling. For detailed information, please visit our Admissions page or contact the Admission Cell.</p>
              </div>
              
              <div className="faq-item">
                <h4>What are the hostel facilities available for students?</h4>
                <p>GEC Barmer provides separate hostel facilities for boys and girls with well-furnished rooms, mess facilities, Wi-Fi connectivity, and recreational areas. For more details, please visit our Hostel Facilities page.</p>
              </div>
              
              <div className="faq-item">
                <h4>How can I reach GEC Barmer?</h4>
                <p>GEC Barmer is located on N.H. 68, Jaisalmer Road, Barmer. It is well-connected by road. The nearest railway station is Barmer Railway Station, and the nearest airport is Jodhpur Airport.</p>
              </div>
              
              <div className="faq-item">
                <h4>Does GEC Barmer provide placement assistance?</h4>
                <p>Yes, GEC Barmer has a dedicated Training & Placement Cell that facilitates campus placements, internships, and industry exposure for students. We have collaborations with various companies for placements and training programs.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact; 