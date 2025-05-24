import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <div className="courses-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content">
            <h1>Academic Programs</h1>
            <p>Discover our comprehensive engineering courses</p>
          </div>
        </Container>
      </section>

      {/* Courses Overview */}
      <section className="section">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Programs</h6>
            <h2 className="heading">Undergraduate Programs</h2>
            <div className="heading-line"></div>
            <p className="mt-4 text-center mx-auto" style={{ maxWidth: '800px' }}>
              GEC Barmer offers four-year B.Tech programs in various disciplines of engineering. 
              Our programs are designed to provide a strong foundation in engineering principles 
              along with practical skills needed for industry or higher education.
            </p>
          </div>
          
          <div className="program-details">
            <Card className="mb-5">
              <Card.Body>
                <h3 className="mb-4">B.Tech Program Details</h3>
                <Row>
                  <Col md={6}>
                    <div className="program-info">
                      <p><strong>Duration:</strong> 4 Years (8 Semesters)</p>
                      <p><strong>Eligibility:</strong> 10+2 with Physics, Chemistry and Mathematics</p>
                      <p><strong>Admission Process:</strong> Through REAP (Rajasthan Engineering Admission Process)</p>
                      <p><strong>Academic Year:</strong> July to May</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="program-info">
                      <p><strong>Medium of Instruction:</strong> English</p>
                      <p><strong>Evaluation:</strong> Semester system with continuous assessment</p>
                      <p><strong>Accreditation:</strong> AICTE Approved</p>
                      <p><strong>University:</strong> BTU (Bikaner Technical University)</p>
                    </div>
                  </Col>
                </Row>
                <div className="mt-3">
                  <Link to="/admission" className="btn btn-primary">Admission Details</Link>
                </div>
              </Card.Body>
            </Card>
          </div>
          
          <Row>
            {programs.map((program, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="course-card h-100">
                  <Card.Img variant="top" src={program.image} alt={program.name} />
                  <Card.Body>
                    <Card.Title>{program.name}</Card.Title>
                    <Card.Text>{program.description}</Card.Text>
                    <Link to={program.link} className="btn btn-outline-primary">Program Details</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Curriculum Overview */}
      <section className="section bg-light">
        <Container>
          <div className="section-heading text-center mb-5">
            <h6 className="sub-heading">Academics</h6>
            <h2 className="heading">Curriculum Highlights</h2>
            <div className="heading-line"></div>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>First Year (Common for all branches)</Accordion.Header>
                  <Accordion.Body>
                    <p>The first year curriculum is common for all engineering disciplines, providing a strong foundation in basic sciences, mathematics, and fundamental engineering concepts.</p>
                    <p><strong>Key Subjects:</strong></p>
                    <ul>
                      <li>Engineering Mathematics I & II</li>
                      <li>Engineering Physics</li>
                      <li>Engineering Chemistry</li>
                      <li>Basic Electrical & Electronics Engineering</li>
                      <li>Programming for Problem Solving</li>
                      <li>Engineering Graphics & Design</li>
                      <li>Engineering Mechanics</li>
                      <li>Environmental Science</li>
                      <li>Communication Skills & Professional Ethics</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Second Year</Accordion.Header>
                  <Accordion.Body>
                    <p>In the second year, students begin specialized courses in their chosen branch while continuing to develop core engineering skills.</p>
                    <p><strong>Key Components:</strong></p>
                    <ul>
                      <li>Branch-specific foundational courses</li>
                      <li>Advanced Mathematics</li>
                      <li>Data Structures & Algorithms (for CSE)</li>
                      <li>Circuit Theory (for EE/ECE)</li>
                      <li>Thermodynamics (for ME/ChE)</li>
                      <li>Structural Analysis (for CE)</li>
                      <li>Petroleum Geology (for PE)</li>
                      <li>Laboratory courses</li>
                      <li>Mini projects</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Third Year</Accordion.Header>
                  <Accordion.Body>
                    <p>Third year focuses on advanced topics in the chosen specialization, with increased laboratory work and design projects.</p>
                    <p><strong>Key Components:</strong></p>
                    <ul>
                      <li>Advanced branch-specific courses</li>
                      <li>Elective courses</li>
                      <li>Design projects</li>
                      <li>Industrial training during summer</li>
                      <li>Technical communication skills</li>
                      <li>Interdisciplinary courses</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Fourth Year</Accordion.Header>
                  <Accordion.Body>
                    <p>The final year emphasizes practical application of knowledge through projects, electives, and industry exposure.</p>
                    <p><strong>Key Components:</strong></p>
                    <ul>
                      <li>Major Project/Thesis</li>
                      <li>Specialized elective courses</li>
                      <li>Professional practice courses</li>
                      <li>Industry internships</li>
                      <li>Seminar presentations</li>
                      <li>Comprehensive viva voce</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <div className="text-center mt-4">
                <Link to="/academics/syllabus" className="btn btn-primary">View Detailed Syllabus</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

// Sample program data
const programs = [
  {
    name: 'B.Tech in Computer Science & Engineering (AI & ML)',
    description: 'A specialized program focusing on artificial intelligence, machine learning, data science, and other advanced computing technologies.',
    image: '/images/cse-dept.jpg',
    link: '/departments/cse'
  },
  {
    name: 'B.Tech in Chemical Engineering',
    description: 'Study of chemical processes, equipment design, and plant operations with emphasis on sustainable and efficient chemical technologies.',
    image: '/images/chemical-dept.jpg',
    link: '/departments/chemical'
  },
  {
    name: 'B.Tech in Civil Engineering',
    description: 'Program covering structural design, construction management, transportation, water resources, and environmental engineering.',
    image: '/images/civil-dept.jpg',
    link: '/departments/civil'
  },
  {
    name: 'B.Tech in Electrical Engineering',
    description: 'Study of electrical systems, power generation, transmission, distribution, control systems, and electrical machines.',
    image: '/images/electrical-dept.jpg',
    link: '/departments/electrical'
  },
  {
    name: 'B.Tech in Electronics & Communication',
    description: 'Program focusing on electronic devices, circuits, communication systems, signal processing, and embedded systems.',
    image: '/images/ec-dept.jpg',
    link: '/departments/electronics'
  },
  {
    name: 'B.Tech in Mechanical Engineering',
    description: 'Study of mechanical systems, thermal engineering, design, manufacturing processes, and industrial engineering.',
    image: '/images/mechanical-dept.jpg',
    link: '/departments/mechanical'
  },
  {
    name: 'B.Tech in Petroleum Engineering',
    description: 'Specialized program for oil and gas exploration, drilling, production, reservoir engineering, and petroleum economics.',
    image: '/images/petroleum-dept.jpg',
    link: '/departments/petroleum'
  }
];

export default Courses; 