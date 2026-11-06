import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import '../assets/Gallery.css';
import galleryData from '../data/galleryData.json';

const Gallery = () => {
  const handleAlbumClick = (driveLink) => {
    window.open(driveLink, '_blank');
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <h1>Event Gallery</h1>
            <p>Relive the memories of our college events through these photo albums</p>
          </div>
        </Container>
      </section>

      {/* Event Albums Section */}
      <section className="event-albums py-5">
        <Container>
          <Row className="g-4">
            {galleryData.events.map((event) => (
              <Col key={event.id} lg={4} md={6}>
                <Card 
                  className="event-card h-100"
                  onClick={() => handleAlbumClick(event.driveLink)}
                >
                  <div className="card-image-container">
                    <Card.Img 
                      variant="top" 
                      src={event.image} 
                      alt={event.title}
                      className="card-image"
                    />
                    <div className="image-overlay">
                      <FaExternalLinkAlt className="icon" />
                          </div>
                        </div>
                  <Card.Body>
                    <div className="event-date">
                      <FaCalendarAlt className="me-2" />
                      {event.date}
                      </div>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
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

export default Gallery; 