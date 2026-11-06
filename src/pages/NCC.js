import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useImageLinks } from '../utils/ImageLinkContext';
import PageHero from '../components/PageHero';
import Loader from '../components/Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/PageHero.css';
import '../assets/NCC.css';
import '../assets/Gallery.css';

// Custom CSS for NCC page
const nccStyles = {
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

const NCC = () => {
  const { imageLinks, isLoading } = useImageLinks();
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  if (isLoading) {
    return <Loader />;
  }
  
  // Access NCC images from the imageLinks context
  const nccHero = imageLinks.ncc?.hero || 'https://via.placeholder.com/1200x400?text=NCC+Hero+Image';
  const nccSecondary = imageLinks.ncc?.secondary || 'https://via.placeholder.com/600x400?text=NCC+Secondary+Image';
  const nccAlbum = imageLinks.ncc?.album || [];
  
  // Separate the last image (16:9 group picture) from the rest of the album
  const regularImages = nccAlbum.slice(0, -1);
  const groupPicture = nccAlbum.length > 0 ? nccAlbum[nccAlbum.length - 1] : null;
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="ncc-page page-content">
      <PageHero 
        title="National Cadet Corps (NCC)" 
        subtitle="Unity and Discipline" 
        bgImage={nccHero}
        bgColor="primary"
        subtitleClassName="ncc-subtitle"
      />
      
      <section className="section">
        <Container>
          <Row className="mb-5 align-items-center">
            <Col md={7} data-aos="fade-right">
              <h2 className="section-title">About NCC</h2>
              <p className="lead">
                The National Cadet Corps (NCC) is a youth development movement in India that aims to develop character, 
                discipline, leadership, secular outlook, spirit of adventure, and ideals of selfless service among the youth.
              </p>
              <p>
                At Government Engineering College, Barmer, the NCC unit provides opportunities for cadets to engage in various 
                activities that promote discipline, leadership, and patriotism through regular parades, camps, and social service activities.
              </p>
              <p>
                Our NCC cadets participate in Annual Training Camps, Republic Day Parades, Combined Annual Training Camps, 
                and various adventure activities like trekking, mountaineering, and obstacle courses.
              </p>
            </Col>
            <Col md={5} data-aos="fade-left">
              <div className="ncc-image-container">
                <img 
                  src={nccSecondary} 
                  alt="NCC Activities" 
                  className="ncc-responsive-image"
                />
              </div>
            </Col>
          </Row>
          
          <div className="mt-5">
            <h2 className="section-title text-center mb-4" data-aos="fade-up">NCC Photo Gallery</h2>
            <Row>
              {regularImages.length > 0 ? (
                regularImages.map((image, index) => (
                  <Col key={index} md={4} sm={6} className="mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                    <Card className="gallery-card h-100 shadow-sm" onClick={() => handleImageClick(image)}>
                      <div style={{height: '240px', overflow: 'hidden'}}>
                        <Card.Img 
                          variant="top" 
                          src={image} 
                          alt={`NCC Activity ${index + 1}`} 
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
              <div className="mt-4" data-aos="fade-up">
                <h3 className="text-center mb-3">NCC Group Photo</h3>
                <div className="d-flex justify-content-center">
                  <div className="ncc-group-photo-container">
                    <img 
                      src={groupPicture} 
                      alt="NCC Group Photo"
                      className="ncc-group-photo shadow"
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
          <h2 className="section-title text-center mb-4" data-aos="fade-up">Benefits of NCC</h2>
          <Row>
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h4>Military Training</h4>
                  <p>Basic military training in weapons, map reading, parades, and field craft to develop discipline and leadership.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h4>Career Opportunities</h4>
                  <p>Preference in armed forces, paramilitary forces, and government jobs, with reserved seats in military academies.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="300">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h4>Personal Development</h4>
                  <p>Develops character, camaraderie, discipline, leadership qualities, and a secular outlook among cadets.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Lightbox Modal */}
      <Modal show={selectedImage !== null} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>NCC Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="NCC Photo" className="img-fluid" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NCC; 