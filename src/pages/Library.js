import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import libraryData from '../data/library.json';
import '../assets/Library.css';

const Library = () => {
  const { generalInfo, facilities, collections, services, rules } = libraryData;

  return (
    <div className="library-page">
      {/* Hero Section */}
      <section className="library-hero">
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <h1>{generalInfo.title}</h1>
            <p>{generalInfo.description}</p>
          </div>
        </Container>
      </section>

      {/* General Info Section */}
      <section className="section general-info-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="info-content">
                <h2>About Our Library</h2>
                <p>{generalInfo.description}</p>
                <div className="working-hours">
                  <h4>Working Hours</h4>
                  <ul>
                    <li><strong>Weekdays:</strong> {generalInfo.workingHours.weekdays}</li>
                    <li><strong>Saturday:</strong> {generalInfo.workingHours.saturday}</li>
                    <li><strong>Sunday:</strong> {generalInfo.workingHours.sunday}</li>
                  </ul>
                </div>
                <div className="contact-info">
                  <h4>Contact Information</h4>
                  <p><strong>Librarian:</strong> {generalInfo.contact.librarian}</p>
                  <p><strong>Email:</strong> {generalInfo.contact.email}</p>
                  <p><strong>Phone:</strong> {generalInfo.contact.phone}</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="info-image">
                <img src={generalInfo.image} alt="Library Building" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Facilities Section */}
      <section className="section facilities-section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Library Facilities</h2>
            <p>Modern amenities to enhance your learning experience</p>
          </div>
          <Row>
            {facilities.map((facility, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="facility-card h-100">
                  <Card.Body>
                    <div className="facility-icon">
                      <i className={facility.icon}></i>
                    </div>
                    <Card.Title>{facility.title}</Card.Title>
                    <Card.Text>{facility.description}</Card.Text>
                    <p className="capacity"><strong>Capacity:</strong> {facility.capacity}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Collections Section */}
      <section className="section collections-section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Our Collections</h2>
            <p>Extensive resources for academic excellence</p>
          </div>
          <Row>
            <Col lg={4} className="mb-4">
              <Card className="collection-card h-100">
                <Card.Body>
                  <h3>Books</h3>
                  <div className="collection-stats">
                    <h4>{collections.books.total.toLocaleString()}</h4>
                    <p>Total Books</p>
                  </div>
                  <div className="categories">
                    <h5>Categories</h5>
                    <ul>
                      {collections.books.categories.map((category, index) => (
                        <li key={index}>{category}</li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="collection-card h-100">
                <Card.Body>
                  <h3>Journals</h3>
                  <div className="collection-stats">
                    <div className="stat-item">
                      <h4>{collections.journals.print}</h4>
                      <p>Print Journals</p>
                    </div>
                    <div className="stat-item">
                      <h4>{collections.journals.online}</h4>
                      <p>Online Journals</p>
                    </div>
                  </div>
                  <div className="categories">
                    <h5>Subjects</h5>
                    <ul>
                      {collections.journals.subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="collection-card h-100">
                <Card.Body>
                  <h3>Digital Resources</h3>
                  <div className="digital-resources">
                    <ul>
                      {collections.digitalResources.map((resource, index) => (
                        <li key={index}>
                          <i className="fas fa-check-circle"></i>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="section services-section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Library Services</h2>
            <p>Comprehensive support for your academic needs</p>
          </div>
          <Row>
            {services.map((service, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="service-card h-100">
                  <Card.Body>
                    <div className="service-icon">
                      <i className={service.icon}></i>
                    </div>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Rules Section */}
      <section className="section rules-section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Library Rules</h2>
            <p>Guidelines for a better library experience</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="rules-card">
                <Card.Body>
                  <ul className="rules-list">
                    {rules.map((rule, index) => (
                      <li key={index}>
                        <i className="fas fa-angle-right"></i>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Library; 