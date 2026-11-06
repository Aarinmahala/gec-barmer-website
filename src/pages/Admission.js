import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import admissionData from '../data/admission.json';

const Admission = () => {
  return (
    <div className="admission-page">
      {/* Hero Section */}
      <section className="page-hero" style={{ backgroundImage: `url(${admissionData.hero.image})` }}>
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content text-center">
            <h1>{admissionData.hero.title}</h1>
            <p>{admissionData.hero.subtitle}</p>
            <Button variant="primary" href="#current-admissions" size="lg" className="mt-3">
              Current Admissions
            </Button>
          </div>
        </Container>
      </section>

      {/* Current Admissions Section */}
      <section id="current-admissions" className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">{admissionData.currentAdmission.subtitle}</h6>
            <h2 className="heading">{admissionData.currentAdmission.title}</h2>
            <div className="heading-line"></div>
          </div>

          <Alert variant="info" className="text-center mb-5">
            <h5 className="alert-heading">{admissionData.currentAdmission.notice.heading}</h5>
            <p className="mb-0">{admissionData.currentAdmission.notice.text}</p>
          </Alert>
          
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="admission-content">
                <h3>{admissionData.currentAdmission.process.title}</h3>
                <p className="lead">{admissionData.currentAdmission.process.description}</p>
                <p>{admissionData.currentAdmission.process.details}</p>
                <h4 className="mt-4">{admissionData.currentAdmission.process.eligibility.title}</h4>
                <ul>
                  {admissionData.currentAdmission.process.eligibility.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
                <Button variant="outline-primary" href={admissionData.currentAdmission.process.portalLink} target="_blank" className="mt-3">
                  Visit REAP Portal
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <Card className="h-100">
                <Card.Header as="h4" className="text-center">Important Dates</Card.Header>
                <Card.Body>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Dates</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissionData.currentAdmission.importantDates.map((date, index) => (
                        <tr key={index}>
                          <td>{date.event}</td>
                          <td>{date.date}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-muted small mt-3">
                    * Dates are tentative and subject to change. Please check the official REAP website for the latest information.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <div className="documents-required mt-5">
            <h3 className="text-center mb-4">Documents Required</h3>
            <Row>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <h5><i className="fas fa-file-alt me-2"></i> {admissionData.documents.academic.title}</h5>
                    <ul className="list-unstyled">
                      {admissionData.documents.academic.items.map((item, index) => (
                        <li key={index}><i className="fas fa-check-circle text-success me-2"></i> {item}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <h5><i className="fas fa-id-card me-2"></i> {admissionData.documents.personal.title}</h5>
                    <ul className="list-unstyled">
                      {admissionData.documents.personal.items.map((item, index) => (
                        <li key={index}><i className="fas fa-check-circle text-success me-2"></i> {item}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      
      {/* Fee Structure */}
      <section className="section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">{admissionData.feeStructure.subtitle}</h6>
            <h2 className="heading">{admissionData.feeStructure.title}</h2>
            <div className="heading-line"></div>
          </div>
          
          <div className="fee-structure">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Particulars</th>
                  <th>Amount (₹)</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {admissionData.feeStructure.fees.map((fee, index) => (
                  <tr key={index}>
                    <td>{fee.particular}</td>
                    <td>{fee.amount.toLocaleString()}</td>
                    <td>{fee.frequency}</td>
                </tr>
                ))}
              </tbody>
              <tfoot className="table-secondary">
                <tr>
                  <th>Total (First Semester)</th>
                  <th>₹{admissionData.feeStructure.totals.firstSemester.toLocaleString()}</th>
                  <th></th>
                </tr>
                <tr>
                  <th>Total (Subsequent Semesters)</th>
                  <th>₹{admissionData.feeStructure.totals.subsequentSemesters.toLocaleString()}</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
            <p className="text-muted small mt-3">
              * Fee structure is subject to change as per government regulations.
            </p>
            
            <div className="text-center mt-5">
              <Link to="/pay-fee" className="btn btn-primary">
                Pay Fee Online
              </Link>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Help Desk */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">{admissionData.helpDesk.subtitle}</h6>
            <h2 className="heading">{admissionData.helpDesk.title}</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="contact-card">
                <Card.Body className="text-center">
                  <i className="fas fa-headset display-4 text-primary mb-3"></i>
                  <h4>{admissionData.helpDesk.title}</h4>
                  <p>{admissionData.helpDesk.description}</p>
                  
                  <hr className="my-4" />
                  
                  <div className="contact-info">
                    <p><i className="fas fa-phone me-2"></i> {admissionData.helpDesk.contact.phone}</p>
                    <p><i className="fas fa-envelope me-2"></i> {admissionData.helpDesk.contact.email}</p>
                    <p><i className="fas fa-map-marker-alt me-2"></i> {admissionData.helpDesk.contact.address}</p>
                    <p><i className="fas fa-clock me-2"></i> {admissionData.helpDesk.contact.timing}</p>
                  </div>
                  
                  <Button variant="outline-primary" className="mt-3" as={Link} to="/contact">
                    Contact Us
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Admission; 