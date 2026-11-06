import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Accordion, Form } from 'react-bootstrap';
import { FaCalendarAlt, FaBuilding, FaGraduationCap, FaList, FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import careersData from '../data/careers.json';
import '../assets/Careers.css';

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPositions = careersData.positions.filter(position => {
    const matchesCategory = selectedCategory === 'All' || position.category === selectedCategory;
    const matchesSearch = position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         position.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="careers-page">
      <div className="careers-hero">
        <Container>
          <h1>{careersData.title}</h1>
          <p>{careersData.description}</p>
        </Container>
      </div>

      <Container className="careers-content">
        <Row className="mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </Col>
          <Col md={6}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="All">All Categories</option>
              {careersData.categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <h2 className="section-title">Open Positions</h2>
            {filteredPositions.map((position) => (
              <Card key={position.id} className="position-card mb-4">
                <Card.Body>
                  <div className="position-header">
                    <Badge bg="primary" className="position-category">
                      {position.category}
                    </Badge>
                    <Badge bg={position.status === 'Active' ? 'success' : 'secondary'}>
                      {position.status}
                    </Badge>
                  </div>
                  
                  <Card.Title className="mt-3">{position.title}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    <FaBuilding className="me-2" />
                    {position.department}
                  </Card.Subtitle>
                  
                  <div className="position-meta">
                    <div className="meta-item">
                      <FaCalendarAlt className="me-2" />
                      <span>Publish Date: {new Date(position.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <FaCalendarAlt className="me-2" />
                      <span>Last Date: {new Date(position.lastDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="position-details mt-4">
                    <div className="detail-section">
                      <h6><FaGraduationCap className="me-2" />Qualifications</h6>
                      <ul>
                        {position.qualifications.map((qual, index) => (
                          <li key={index}>{qual}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h6><FaList className="me-2" />Responsibilities</h6>
                      <ul>
                        {position.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h6><FaStar className="me-2" />Benefits</h6>
                      <ul>
                        {position.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col lg={4}>
            <div className="sidebar">
              <Card className="faq-card mb-4">
                <Card.Body>
                  <h3 className="sidebar-title">Frequently Asked Questions</h3>
                  <Accordion>
                    {Object.entries(careersData.faqs).map(([category, faqs], index) => (
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>{category.charAt(0).toUpperCase() + category.slice(1)}</Accordion.Header>
                        <Accordion.Body>
                          {faqs.map((faq, faqIndex) => (
                            <div key={faqIndex} className="faq-item">
                              <h6>{faq.question}</h6>
                              <p>{faq.answer}</p>
                            </div>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>

              <Card className="contact-card">
                <Card.Body>
                  <h3 className="sidebar-title">Contact Us</h3>
                  <div className="contact-info">
                    <p>
                      <FaEnvelope className="me-2" />
                      <a href={`mailto:${careersData.contact.email}`}>{careersData.contact.email}</a>
                    </p>
                    <p>
                      <FaPhone className="me-2" />
                      <a href={`tel:${careersData.contact.phone}`}>{careersData.contact.phone}</a>
                    </p>
                    <p>
                      <FaMapMarkerAlt className="me-2" />
                      {careersData.contact.address}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Careers; 