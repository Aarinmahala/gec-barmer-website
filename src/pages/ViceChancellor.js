import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import viceChancellorData from '../data/viceChancellor.json';
import '../assets/ViceChancellor.css';

const ViceChancellor = () => {
  return (
    <div className="vice-chancellor-page">
      <PageHero 
        title="Vice Chancellor's Office" 
        subtitle="Academic Leadership"
        bgImage="https://via.placeholder.com/1920x400?text=Vice+Chancellor's+Office"
      />
      
      <section className="section">
        <Container>
          <Row className="mb-5">
            <Col lg={4} className="text-center text-lg-start mb-4 mb-lg-0">
              <div className="vc-image-container">
                <img 
                  src={viceChancellorData.image} 
                  alt={viceChancellorData.name}
                  className="vc-image"
                />
              </div>
            </Col>
            <Col lg={8}>
              <div className="vc-info">
                <h2 className="vc-name">{viceChancellorData.name}</h2>
                <p className="vc-designation">{viceChancellorData.position}, Government Engineering College Barmer</p>
                <p className="vc-qualification">{viceChancellorData.qualifications}</p>
                
                <div className="vc-message mt-4">
                  <p>{viceChancellorData.message}</p>
                </div>
                
                <div className="vc-contact mt-4">
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>{viceChancellorData.contact.email}</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>{viceChancellorData.contact.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>Govt. Engineering College Barmer, Govt. Polytechnic College Campus, N.H. 68, Jaisalmer Road, Barmer (Raj.)</span>
                  </div>
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
                    {viceChancellorData.responsibilities.map((responsibility, index) => (
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

export default ViceChancellor; 