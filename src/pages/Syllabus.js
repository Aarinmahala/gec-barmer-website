import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import syllabusData from '../data/syllabus.json';
import PageHero from '../components/PageHero';
import '../assets/Syllabus.css';

const Syllabus = () => {
  return (
    <div className="syllabus-page">
      <PageHero title="Syllabus" subtitle="View syllabus PDFs by year" />
      <Container className="py-5">
        <Row className="justify-content-center">
          {syllabusData.years.map((item) => (
            <Col md={6} lg={4} className="mb-4" key={item.year}>
              <Card className="h-100 syllabus-card">
                <Card.Body>
                  <Card.Title>{item.year}</Card.Title>
                  <Card.Text>
                    <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-primary view-pdf-btn">View PDF</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Syllabus; 