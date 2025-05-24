import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaNewspaper, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import mediaData from '../data/mediaCoverage.json';
import '../assets/MediaCoverage.css';

const MediaCoverage = () => {
  return (
    <div className="media-coverage-page">
      <div className="media-hero">
        <Container>
          <h1>{mediaData.title}</h1>
          <p>{mediaData.description}</p>
        </Container>
      </div>

      <Container className="media-content">
        <section className="newspaper-articles">
          <h2 className="section-title">Newspaper Articles</h2>
          <Row>
            {mediaData.articles.map((article) => (
              <Col key={article.id} md={6} lg={4} className="mb-4">
                <Card className="media-card h-100">
                  <div className="media-image-container">
                    <Card.Img variant="top" src={article.image} alt={article.title} />
                  </div>
                  <Card.Body>
                    <div className="article-meta">
                      <Badge bg="primary" className="me-2">
                        <FaNewspaper className="me-1" />
                        {article.source}
                      </Badge>
                      <Badge bg="secondary">
                        <FaCalendarAlt className="me-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.summary}</Card.Text>
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more-link">
                      Read More <FaExternalLinkAlt />
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="media-gallery mt-5">
          <h2 className="section-title">Media Gallery</h2>
          <Row>
            {mediaData.mediaGallery.map((gallery) => (
              <Col key={gallery.id} md={6} className="mb-4">
                <Card className="gallery-card">
                  <Card.Body>
                    <h3>{gallery.title}</h3>
                    <p className="gallery-date">{new Date(gallery.date).toLocaleDateString()}</p>
                    <p>{gallery.description}</p>
                    <div className="gallery-images">
                      {gallery.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${gallery.title} - Image ${index + 1}`}
                          className="gallery-image"
                        />
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default MediaCoverage; 