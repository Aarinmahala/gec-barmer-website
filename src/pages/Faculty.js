import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { FaLinkedin, FaEnvelope, FaBuilding, FaGraduationCap } from 'react-icons/fa';
import facultyData from '../data/faculty.json';
import '../assets/Faculty.css';

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Get unique departments
  const departments = [...new Set(facultyData.faculty.map(f => f.department))];

  // Filter faculty based on search term and department
  const filteredFaculty = facultyData.faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="faculty-page">
      {/* Hero Section */}
      <section className="page-hero" style={{ backgroundImage: `url(${facultyData.hero.image})` }}>
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>{facultyData.hero.title}</h1>
            <p>{facultyData.hero.subtitle}</p>
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
                  placeholder="Search by name or specialization..."
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
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Faculty Grid Section */}
      <section className="faculty-grid-section">
        <Container>
          <Row>
            {filteredFaculty.map((member) => (
              <Col lg={4} md={6} className="mb-4" key={member.id}>
                <Card className="faculty-card">
                  <div className="faculty-image-container">
                    <img 
                      src={member.photo}
                      alt={member.name}
                      className="faculty-image"
                    />
                    <div className="faculty-social-links">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                        <FaLinkedin />
                      </a>
                      <a href={`mailto:${member.email}`} className="social-link email">
                        <FaEnvelope />
                      </a>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {member.designation}
                    </Card.Subtitle>
                    <Card.Text className="department">
                      <FaBuilding className="me-2" />
                      {member.department}
                    </Card.Text>
                    <Card.Text className="specialization">
                      <FaGraduationCap className="me-2" />
                      {member.specialization}
                    </Card.Text>
                    <div className="faculty-actions">
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

export default Faculty; 