import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import '../assets/Header.css';
import ImageLinks from '../utils/ImageLinks';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [cloudinaryError, setCloudinaryError] = useState(false);
  const [secondLogoError, setSecondLogoError] = useState(false);

  const closeNav = () => setExpanded(false);
  
  const handleCloudinaryError = () => {
    setCloudinaryError(true);
  };
  
  const handleLogoError = () => {
    setLogoError(true);
  };
  
  const handleSecondLogoError = () => {
    setSecondLogoError(true);
  };

  return (
    <header className="site-header">
      {/* Main Navigation */}
      <Navbar bg="light" expand="lg" expanded={expanded} className="py-1 compact-navbar">
        <Container className="header-container">
          <div className="d-flex align-items-center navbar-left flex-grow-1">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center compact-brand flex-grow-1" onClick={closeNav}>
              {logoError ? (
                <div className="logo-placeholder">GEC</div>
              ) : cloudinaryError ? (
                <img 
                  src={`${process.env.PUBLIC_URL}/logo192.png`}
                  alt="GEC Barmer Logo" 
                  className="college-logo"
                  onError={handleLogoError}
                />
              ) : (
                <img 
                  src={ImageLinks.logo}
                  alt="GEC Barmer Logo" 
                  className="college-logo"
                  onError={handleCloudinaryError}
                />
              )}
              <div className="brand-text">
                <div className="college-name">Government Engineering College</div>
                <div className="college-tagline">Barmer, Rajasthan</div>
              </div>
            </Navbar.Brand>
          </div>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="mx-auto compact-nav">
              <Nav.Link as={Link} to="/about" onClick={closeNav}>About Us</Nav.Link>
              <NavDropdown title="Community" id="community-dropdown">
                <NavDropdown.Item as={Link} to="/principal">Principal</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/vice-chancellor">Vice Chancellor</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/registrar">Registrar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faculty">Faculty</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/student-activity-council" onClick={closeNav}>
                  Student Activity Council
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="Academics" id="academics-dropdown">
                <NavDropdown.Item as={Link} to="/academics/syllabus" onClick={closeNav}>
                  Syllabus
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/academics/calendar" onClick={closeNav}>
                  Academic Calendar
                </NavDropdown.Item>
                <NavDropdown.Item href="https://mbmiums.in/(S(xcreh05gjntf5jivoqp2jivn))/Results/ExamResult.aspx" target="_blank" rel="noopener noreferrer" onClick={closeNav}>
                  Results
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/announcements" onClick={closeNav}>
                  Announcements
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="Departments" id="departments-dropdown">
                <NavDropdown.Item as={Link} to="/departments/cse" onClick={closeNav}>
                  Computer Science Engineering
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/departments/chemical" onClick={closeNav}>
                  Chemical Engineering
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/departments/civil" onClick={closeNav}>
                  Civil Engineering
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/departments/electrical" onClick={closeNav}>
                  Electrical Engineering
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/departments/electronics" onClick={closeNav}>
                  Electronics & Communication
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/departments/mechanical" onClick={closeNav}>
                  Mechanical Engineering
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/departments/petroleum" onClick={closeNav}>
                  Petroleum Engineering
                </NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link as={Link} to="/admission" onClick={closeNav}>Admission</Nav.Link>
              <Nav.Link as={Link} to="/tp-cell" onClick={closeNav}>T & P Cell</Nav.Link>
              <NavDropdown title="Campus Life" id="campus-dropdown">
                <NavDropdown.Item as={Link} to="/student-clubs" onClick={closeNav}>Student Clubs</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/nss" onClick={closeNav}>NSS</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ncc" onClick={closeNav}>NCC</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/library" onClick={closeNav}>Library</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/hostel" onClick={closeNav}>Hostel</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Engage" id="engage-dropdown">
                <NavDropdown.Item as={Link} to="/gallery" onClick={closeNav}>Gallery</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/media-coverage" onClick={closeNav}>Media Coverage</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/industry-associations" onClick={closeNav}>Industry Associations</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/web-team" onClick={closeNav}>Web Development Team</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tenders" onClick={closeNav}>Tenders & Orders</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/careers" onClick={closeNav}>Careers</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact" onClick={closeNav}>Contact Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="navbar-right">
              <Link to="/" className="small-logo-link">
                {secondLogoError ? (
                  <div className="logo-placeholder">MBM</div>
                ) : (
                  <img 
                    src={ImageLinks.secondLogo} 
                    className="small-logo" 
                    alt="MBM Logo" 
                    onError={handleSecondLogoError}
                  />
                )}
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; 