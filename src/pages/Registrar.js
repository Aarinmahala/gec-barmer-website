import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageHero from '../components/PageHero';
import registrarData from '../data/registrar.json';
import '../assets/Registrar.css';

const Registrar = () => {
  return (
    <div className="registrar-page">
      <PageHero 
        title="Registrar's Office" 
        subtitle="Academic Administration"
        bgImage="https://via.placeholder.com/1920x400?text=Registrar's+Office"
      />
      
      <section className="section">
        <Container>
          <Row className="mb-5">
            <Col lg={4} className="mb-4 mb-lg-0">
              <div className="registrar-image-container">
                <img 
                  src={registrarData.image} 
                  alt={registrarData.name}
                  className="img-fluid rounded"
                />
              </div>
            </Col>
            <Col lg={8}>
              <div className="registrar-info">
                <h2 className="registrar-name">{registrarData.name}</h2>
                <h4 className="registrar-position">{registrarData.position}</h4>
                
                <div className="registrar-details mt-4">
                  <p><strong>Qualifications:</strong> {registrarData.qualifications}</p>
                  <p><strong>Experience:</strong> {registrarData.experience}</p>
                </div>
                
                <div className="registrar-message mt-4">
                  <p>{registrarData.message}</p>
                </div>
                
                <div className="registrar-contact mt-4">
                  <h5>Contact Information</h5>
                  <p><strong>Email:</strong> {registrarData.contact.email}</p>
                  <p><strong>Phone:</strong> {registrarData.contact.phone}</p>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col lg={12}>
              <Card className="responsibilities-card">
                <Card.Body>
                  <h3 className="card-title">Key Responsibilities</h3>
                  <ul className="responsibilities-list">
                    {registrarData.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
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

export default Registrar; 