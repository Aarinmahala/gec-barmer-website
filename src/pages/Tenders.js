import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form } from 'react-bootstrap';
import { FaFileDownload, FaCalendarAlt, FaTag } from 'react-icons/fa';
import tenderData from '../data/tenders.json';
import '../assets/Tenders.css';

const Tenders = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenders = tenderData.tenders.filter(tender => {
    const matchesCategory = selectedCategory === 'All' || tender.category === selectedCategory;
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="tenders-page">
      <div className="tenders-hero">
        <Container>
          <h1>{tenderData.title}</h1>
          <p>{tenderData.description}</p>
        </Container>
      </div>

      <Container className="tenders-content">
        <Row className="mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search tenders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </Col>
          <Col md={6}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="All">All Categories</option>
              {tenderData.categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Row>
          {filteredTenders.map((tender) => (
            <Col key={tender.id} lg={6} className="mb-4">
              <Card className="tender-card h-100">
                <Card.Body>
                  <div className="tender-header">
                    <Badge bg="primary" className="tender-reference">
                      {tender.reference}
                    </Badge>
                    <Badge bg={tender.status === 'Active' ? 'success' : 'secondary'}>
                      {tender.status}
                    </Badge>
                  </div>
                  
                  <Card.Title className="mt-3">{tender.title}</Card.Title>
                  
                  <div className="tender-meta">
                    <div className="meta-item">
                      <FaCalendarAlt className="me-2" />
                      <span>Publish Date: {new Date(tender.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <FaCalendarAlt className="me-2" />
                      <span>Last Date: {new Date(tender.lastDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <FaTag className="me-2" />
                      <span>{tender.category}</span>
                    </div>
                  </div>

                  <Card.Text className="mt-3">{tender.description}</Card.Text>

                  <div className="tender-documents mt-3">
                    <h6>Documents:</h6>
                    {tender.documents.map((doc, index) => (
                      <Button
                        key={index}
                        variant="outline-primary"
                        size="sm"
                        className="me-2 mb-2"
                        href={doc.url}
                        target="_blank"
                      >
                        <FaFileDownload className="me-1" />
                        {doc.name}
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Tenders; 