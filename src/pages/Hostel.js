import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import hostelData from '../data/hostel.json';
import '../assets/Hostel.css';

const Hostel = () => {
  const { generalInfo, facilities, amenities, rules, fees } = hostelData;

  return (
    <div className="hostel-page">
      {/* Hero Section */}
      <section className="hostel-hero">
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
                <h2>About Our Hostel</h2>
                <p>{generalInfo.description}</p>
                <div className="contact-info">
                  <h4>Contact Information</h4>
                  <p><strong>Hostel Warden:</strong> {generalInfo.contact.warden}</p>
                  <p><strong>Email:</strong> {generalInfo.contact.email}</p>
                  <p><strong>Phone:</strong> {generalInfo.contact.phone}</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="info-image">
                <img src={generalInfo.image} alt="Hostel Building" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Facilities Section */}
      <section className="section facilities-section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Hostel Facilities</h2>
            <p>Comfortable living spaces for our students</p>
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
                    <ul className="features-list">
                      {facility.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Amenities Section */}
      <section className="section amenities-section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Additional Amenities</h2>
            <p>Extra facilities for your comfort</p>
          </div>
          <Row>
            {amenities.map((amenity, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="amenity-card h-100">
                  <Card.Body>
                    <div className="amenity-icon">
                      <i className={amenity.icon}></i>
                    </div>
                    <Card.Title>{amenity.title}</Card.Title>
                    <Card.Text>{amenity.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Fees Section */}
      <section className="section fees-section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Hostel Fees</h2>
            <p>Academic Year {fees.academicYear}</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="fees-card">
                <Card.Body>
                  <div className="fees-details">
                    <h4>Fee Structure</h4>
                    <ul className="fees-list">
                      <li><strong>Room Rent:</strong> {fees.charges.roomRent}</li>
                      <li><strong>Mess Charges:</strong> {fees.charges.messCharges}</li>
                      <li><strong>Security Deposit:</strong> {fees.charges.securityDeposit}</li>
                      <li><strong>Maintenance Charges:</strong> {fees.charges.maintenanceCharges}</li>
                    </ul>
                    <h4 className="mt-4">Payment Schedule</h4>
                    <ul className="payment-schedule">
                      {fees.paymentSchedule.map((schedule, index) => (
                        <li key={index}>{schedule}</li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rules Section */}
      <section className="section rules-section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h2>Hostel Rules</h2>
            <p>Guidelines for a better hostel experience</p>
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

export default Hostel; 