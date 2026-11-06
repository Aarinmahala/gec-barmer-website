import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ImageLinks from '../utils/ImageLinks';

const IndustryAssociations = () => {
  return (
    <div className="industry-associations-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>Industry Associations</h1>
            <p>Bridging the gap between academia and industry</p>
          </div>
        </Container>
      </section>

      {/* Associations Section */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Partnerships</h6>
            <h2 className="heading">We Are Associated With</h2>
            <div className="heading-line"></div>
          </div>
          
          <p className="text-center mb-5">
            Government Engineering College Barmer maintains strong ties with industry leaders to provide students with real-world exposure and enhance their employability. These partnerships enable internships, industry visits, guest lectures, and collaborative research opportunities.
          </p>
          
          <Row>
            {associations.map((company, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="association-card h-100">
                  <div className="association-logo-container">
                    <img src={company.logo} alt={company.name} className="association-logo" />
                  </div>
                  <Card.Body>
                    <Card.Title>{company.name}</Card.Title>
                    <Card.Text>{company.description}</Card.Text>
                    <div className="association-type">
                      {company.associationType}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Benefits Section */}
      <section className="section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Advantages</h6>
            <h2 className="heading">Benefits of Industry Associations</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <h4>Internship Opportunities</h4>
                <p>Students gain hands-on experience through internships with our industry partners</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h4>Expert Sessions</h4>
                <p>Industry experts conduct guest lectures, workshops, and training sessions</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h4>Placement Support</h4>
                <p>Preferential recruitment opportunities with associated companies</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-flask"></i>
                </div>
                <h4>Research Collaborations</h4>
                <p>Joint research projects addressing real industry challenges</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

// Industry associations data
const associations = [
  {
    name: 'Rajasthan ILD Skill University',
    logo: ImageLinks.associations.risu,
    description: 'A strategic partnership focused on enhancing skills and employability of engineering graduates through specialized training programs and certification courses.',
    associationType: 'Educational Partnership'
  },
  {
    name: 'KAMTECH',
    logo: ImageLinks.associations.kamtech,
    description: 'Collaboration for advanced technical training in automation, robotics, and industrial systems for mechanical and electrical engineering students.',
    associationType: 'Technical Training Partner'
  },
  {
    name: 'Cairn Vedanta',
    logo: ImageLinks.associations.vedanta,
    description: 'Major collaboration with one of India\'s largest oil and gas companies providing internships, field visits, and specialized knowledge sharing particularly for petroleum engineering students.',
    associationType: 'Industry Partner'
  },
  {
    name: 'JSW Energy (Barmer) Ltd.',
    logo: ImageLinks.associations.jsw,
    description: 'Partnership with leading power generation company offering exposure to power plant operations and energy systems for electrical engineering students.',
    associationType: 'Energy Sector Partner'
  },
  {
    name: 'Ultratech',
    logo: ImageLinks.associations.ultratech,
    description: 'Collaboration with India\'s largest cement manufacturer providing industrial exposure for civil, mechanical and chemical engineering students.',
    associationType: 'Manufacturing Partner'
  }
];

export default IndustryAssociations; 