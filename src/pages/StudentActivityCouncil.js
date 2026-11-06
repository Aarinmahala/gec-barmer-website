import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';
import councilData from '../data/studentActivityCouncil.json';
import '../assets/StudentActivityCouncil.css';

const StudentActivityCouncil = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState('');

  // Get unique posts
  const posts = [...new Set(councilData.council.map(m => m.post))];

  // Filter council members based on search term and post
  const filteredCouncil = councilData.council.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPost = !selectedPost || member.post === selectedPost;
    return matchesSearch && matchesPost;
  });

  return (
    <div className="council-page">
      {/* Hero Section */}
      <section className="page-hero" style={{ backgroundImage: `url(${councilData.hero.image})` }}>
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>{councilData.hero.title}</h1>
            <p>{councilData.hero.subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search by name or branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                value={selectedPost}
                onChange={(e) => setSelectedPost(e.target.value)}
              >
                <option value="">All Posts</option>
                {posts.map((post, index) => (
                  <option key={index} value={post}>{post}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Council Grid Section */}
      <section className="council-grid-section">
        <Container>
          <Row>
            {filteredCouncil.map((member) => (
              <Col lg={4} md={6} className="mb-4" key={member.id}>
                <Card className="council-card">
                  <div className="council-image-container">
                    <img 
                      src={member.photo}
                      alt={member.name}
                      className="council-image"
                    />
                    <div className="council-social-links">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {member.post}
                    </Card.Subtitle>
                    <Card.Text className="branch">
                      <i className="fas fa-graduation-cap me-2"></i>
                      {member.branch}
                    </Card.Text>
                    <Card.Text className="year">
                      <strong>Year:</strong> {member.year}
                    </Card.Text>
                    <div className="council-actions">
                      <Button 
                        variant="outline-primary" 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-btn"
                      >
                        <FaLinkedin className="me-2" />
                        Connect on LinkedIn
                      </Button>
                    </div>
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

export default StudentActivityCouncil; 