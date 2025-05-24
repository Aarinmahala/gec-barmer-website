import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useImageLinks } from '../utils/ImageLinkContext';
import PageHero from '../components/PageHero';
import Loader from '../components/Loader';
import '../assets/PageHero.css';
import '../assets/NSS.css';

// Custom CSS for NSS page
const nssStyles = {
  subtitleStyle: {
    marginTop: '50px'  // Increase from 30px to 50px for more space
  },
  imageContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  responsiveImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  fullWidthImage: {
    width: '3356px',
    height: '1888px',
    maxWidth: '100%',
    margin: '0 auto',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    marginTop: '20px',
    marginBottom: '20px'
  },
  fullWidthImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  }
};

const NSS = () => {
  const { imageLinks, isLoading } = useImageLinks();
  const [selectedImage, setSelectedImage] = useState(null);
  
  if (isLoading) {
    return <Loader />;
  }
  
  // Access NSS images from the imageLinks context
  const nssHero = imageLinks.nss?.hero || 'https://via.placeholder.com/1200x400?text=NSS+Hero+Image';
  const nssSecondary = imageLinks.nss?.secondary || 'https://via.placeholder.com/600x400?text=NSS+Secondary+Image';
  const nssAlbum = imageLinks.nss?.album || [];
  
  // Separate the last image (16:9 group picture) from the rest of the album
  const regularImages = nssAlbum.slice(0, -1);
  const groupPicture = nssAlbum.length > 0 ? nssAlbum[nssAlbum.length - 1] : null;
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="nss-page page-content">
      <PageHero 
        title="National Service Scheme (NSS)" 
        subtitle="Not Me But You" 
        bgImage={nssHero}
        bgColor="primary"
        subtitleClassName="nss-subtitle"
      />
      
      <section className="section">
        <Container>
          <Row className="mb-5 align-items-center">
            <Col md={7}>
              <h2 className="section-title">About NSS</h2>
              <p className="lead">
                The National Service Scheme (NSS) is a public service program sponsored by the Government of India that aims to develop 
                the personality and character of students through community service.
              </p>
              <p>
                At Government Engineering College, Barmer, the NSS unit actively engages students in various social service activities 
                that benefit the community while fostering a sense of social responsibility and leadership among participants.
              </p>
              <p>
                Our NSS volunteers participate in blood donation camps, cleanliness drives, awareness campaigns, and other community 
                service activities that contribute to the betterment of society.
              </p>
            </Col>
            <Col md={5}>
              <div style={nssStyles.imageContainer}>
                <img 
                  src={nssSecondary} 
                  alt="NSS Activities" 
                  style={nssStyles.responsiveImage}
                />
              </div>
            </Col>
          </Row>
          
          <div className="mt-5">
            <h2 className="section-title text-center mb-4">NSS Photo Gallery</h2>
            <Row>
              {regularImages.length > 0 ? (
                regularImages.map((image, index) => (
                  <Col key={index} md={4} sm={6} className="mb-4">
                    <Card className="gallery-card h-100 shadow-sm" onClick={() => handleImageClick(image)}>
                      <div style={{height: '240px', overflow: 'hidden'}}>
                        <Card.Img 
                          variant="top" 
                          src={image} 
                          alt={`NSS Activity ${index + 1}`} 
                          className="gallery-img"
                          style={{height: '100%', objectFit: 'cover'}}
                        />
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col className="text-center">
                  <p>No gallery images available yet.</p>
                </Col>
              )}
            </Row>
            
            {/* Full width 16:9 group picture */}
            {groupPicture && (
              <div className="mt-4">
                <h3 className="text-center mb-3">NSS Group Photo</h3>
                <div className="d-flex justify-content-center">
                  <div className="nss-group-photo-container">
                    <img 
                      src={groupPicture} 
                      alt="NSS Group Photo"
                      className="nss-group-photo shadow"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
      
      <section className="section bg-light">
        <Container>
          <h2 className="section-title text-center mb-4">Benefits of NSS</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h4>Community Service</h4>
                  <p>Engage in meaningful community service activities that benefit society and develop a sense of social responsibility.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h4>Leadership Skills</h4>
                  <p>Develop leadership, teamwork, and organizational skills through planning and executing community service projects.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h4>Personal Growth</h4>
                  <p>Enhance personal growth, empathy, and understanding of social issues through direct community engagement.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Lightbox Modal */}
      <Modal show={selectedImage !== null} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>NSS Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="NSS Photo" style={{ width: '100%', height: 'auto' }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NSS; 