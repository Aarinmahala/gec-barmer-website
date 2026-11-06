import React from 'react';
import { Container, Row, Col, Card, Tab, Nav } from 'react-bootstrap';

const Leadership = () => {
  return (
    <div className="leadership-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>Leadership</h1>
            <p>Meet the dedicated team guiding our institution</p>
          </div>
        </Container>
      </section>

      {/* Leadership Tabs */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Administration</h6>
            <h2 className="heading">Our Leadership Team</h2>
            <div className="heading-line"></div>
          </div>
          
          <Tab.Container id="leadership-tabs" defaultActiveKey="administration">
            <Nav className="justify-content-center mb-5">
              <Nav.Item>
                <Nav.Link eventKey="administration">Administration</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="bog">Board of Governors</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="coordinators">Branch Coordinators</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Tab.Content>
              <Tab.Pane eventKey="administration">
                <Row>
                  {administration.map((person, index) => (
                    <Col lg={4} md={6} className="mb-4" key={index}>
                      <Card className="leadership-card h-100">
                        <Card.Img variant="top" src={person.image} alt={person.name} />
                        <Card.Body>
                          <Card.Title>{person.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{person.position}</Card.Subtitle>
                          <Card.Text>{person.qualification}</Card.Text>
                          <Card.Text>{person.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              
              <Tab.Pane eventKey="bog">
                <div className="bog-section">
                  <p className="lead text-center mb-5">
                    The Board of Governors (BOG) is the apex body responsible for the overall governance
                    and policy formulation for Government Engineering College Barmer.
                  </p>
                  
                  <div className="bog-table">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Designation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bog.map((member, index) => (
                          <tr key={index}>
                            <td>{member.name}</td>
                            <td>{member.position}</td>
                            <td>{member.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab.Pane>
              
              <Tab.Pane eventKey="coordinators">
                <Row>
                  {coordinators.map((person, index) => (
                    <Col lg={4} md={6} className="mb-4" key={index}>
                      <Card className="leadership-card h-100">
                        <Card.Img variant="top" src={person.image} alt={person.name} />
                        <Card.Body>
                          <Card.Title>{person.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{person.position}</Card.Subtitle>
                          <Card.Text>{person.qualification}</Card.Text>
                          <Card.Text>{person.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>
    </div>
  );
};

// Sample administration data
const administration = [
  {
    name: 'Dr. Sandeep Rankawat',
    position: 'Principal',
    qualification: 'Ph.D in Mechanical Engineering',
    description: 'Leading the institution with over 20 years of experience in academia and research, focusing on academic excellence and innovation.',
    image: '/images/principal.jpg'
  },
  {
    name: "Mr. Kamal Panwar",
    position: "Registrar",
    qualification: 'Ph.D in Civil Engineering',
    description: "Expertise in administration and academic governance",
    image: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747222365/OIP_leveho.jpg"
  },
  {
    name: 'Dr. Priya Sharma',
    position: 'Dean of Academics',
    qualification: 'Ph.D in Electronics Engineering',
    description: 'Overseeing academic programs and curriculum development, with a focus on maintaining high academic standards.',
    image: '/images/dean.jpg'
  }
];

// Board of Governors data
const bog = [
  {
    name: 'Dr. [Name]',
    position: 'Chairman',
    designation: 'Director, Technical Education'
  },
  {
    name: 'Dr. [Name]',
    position: 'Member',
    designation: 'Principal, GEC Barmer'
  },
  {
    name: 'Mr. [Name]',
    position: 'Member',
    designation: 'Industry Representative'
  }
];

// Branch Coordinators data
const coordinators = [
  {
    name: 'Dr. [Name]',
    position: 'CSE Coordinator',
    qualification: 'Ph.D in Computer Science',
    description: 'Leading the Computer Science department with expertise in software engineering and artificial intelligence.',
    image: '/images/cse-coordinator.jpg'
  },
  {
    name: 'Dr. [Name]',
    position: 'ECE Coordinator',
    qualification: 'Ph.D in Electronics',
    description: 'Specializing in communication systems and signal processing.',
    image: '/images/ece-coordinator.jpg'
  },
  {
    name: 'Dr. [Name]',
    position: 'ME Coordinator',
    qualification: 'Ph.D in Mechanical Engineering',
    description: 'Expert in thermal engineering and manufacturing processes.',
    image: '/images/me-coordinator.jpg'
  }
];

export default Leadership; 