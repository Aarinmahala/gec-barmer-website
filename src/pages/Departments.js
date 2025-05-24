import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import departmentsData from '../data/departments.json';

const Departments = () => {
  // Convert departments object to array
  const departments = Object.values(departmentsData.departments);

  return (
    <div className="departments-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>Our Departments</h1>
            <p>Explore our specialized engineering programs</p>
          </div>
        </Container>
      </section>

      {/* Departments Section */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Academic Programs</h6>
            <h2 className="heading">Engineering Departments</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row>
            {departments.map((dept) => (
              <Col lg={4} md={6} className="mb-4" key={dept.id}>
                <Card className="department-card h-100">
                  <Card.Img variant="top" src={dept.hero.image} alt={dept.name} />
                  <Card.Body>
                    <Card.Title>{dept.name}</Card.Title>
                    <Card.Text>{dept.overview.introduction}</Card.Text>
                    <Link to={`/departments/${dept.id}`} className="btn btn-outline-primary">Learn More</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Departments; 