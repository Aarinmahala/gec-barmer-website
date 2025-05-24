import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImageLinks from '../utils/ImageLinks';
import PageHero from '../components/PageHero';

const DepartmentDetail = () => {
  const { id } = useParams();
  const departmentsData = require('../data/departments.json');
  const department = departmentsData.departments[id];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!department) {
    return (
      <div className="page-content">
        <Container>
          <h1>Department not found</h1>
      </Container>
      </div>
    );
  }
  
  return (
    <div className="department-detail-page page-content">
      <PageHero 
        title={department.name}
        subtitle={department.tagline}
        bgImage={department.hero.image}
        bgColor="primary"
      />
      
      {/* Department Overview */}
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="department-image">
                <img src={department.hero.image} alt={department.name} className="img-fluid rounded" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="section-heading mb-4">
                <h6 className="sub-heading">Overview</h6>
                <h2 className="heading">About {department.name}</h2>
                <div className="heading-line"></div>
              </div>
              <div className="department-content">
                <p className="lead">{department.overview.introduction}</p>
                <p>{department.overview.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Programs Offered */}
      <section className="section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Education</h6>
            <h2 className="heading">Programs Offered</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row>
            {department.programs.map((program, index) => (
              <Col md={6} lg={4} className="mb-4" key={index}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{program.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{program.duration}</Card.Subtitle>
                    <Card.Text>{program.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Labs & Facilities */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Infrastructure</h6>
            <h2 className="heading">Labs & Facilities</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row>
            {department.labs.map((lab, index) => (
              <Col md={6} className="mb-4" key={index}>
                <Card className="lab-card h-100">
                  <Card.Body>
                    <Card.Title>{lab.name}</Card.Title>
                    <Card.Text>{lab.description}</Card.Text>
                    <ListGroup variant="flush">
                      {lab.equipment.map((item, i) => (
                        <ListGroup.Item key={i}>{item}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Achievements */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Recognition</h6>
            <h2 className="heading">Department Achievements</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row>
            <Col md={8} className="mx-auto">
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    {department.achievements.map((achievement, index) => (
                      <ListGroup.Item key={index}>
                        <i className="fas fa-trophy text-warning me-2"></i>
                        {achievement}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Get in Touch</h6>
            <h2 className="heading">Contact Information</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="contact-card">
                <Card.Body className="text-center">
                  <div className="contact-info">
                    <p><i className="fas fa-envelope me-2"></i> {department.contact.email}</p>
                    <p><i className="fas fa-phone me-2"></i> {department.contact.phone}</p>
                    <p><i className="fas fa-map-marker-alt me-2"></i> {department.contact.location}</p>
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

export default DepartmentDetail; 