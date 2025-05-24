import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav, Alert, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { FaImages, FaBullhorn, FaLink, FaChartBar, FaUsers, FaCog, FaSignOutAlt, FaUserTie, FaDownload, FaDatabase, FaUserGraduate, FaFlag, FaHandsHelping, FaUniversity } from 'react-icons/fa';
import '../assets/AdminPanel.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  
  const handleLogout = () => {
    logout();
    setShowLogoutAlert(true);
    setTimeout(() => {
      navigate('/admin/login');
    }, 1500);
  };
  
  const adminModules = [
    {
      id: 'faculty',
      title: 'Faculty Manager',
      description: 'Add, edit and manage faculty information with advanced options',
      icon: <FaUserGraduate size={30} />,
      link: '/admin/faculty',
      color: 'info'
    },
    {
      id: 'ncc',
      title: 'NCC',
      description: 'Manage National Cadet Corps information and activities',
      icon: <FaFlag size={30} />,
      link: '/admin/ncc',
      color: 'danger'
    },
    {
      id: 'nss',
      title: 'NSS',
      description: 'Manage National Service Scheme information and activities',
      icon: <FaHandsHelping size={30} />,
      link: '/admin/nss',
      color: 'success'
    },
    {
      id: 'studentClubs',
      title: 'Student Clubs',
      description: 'Manage student clubs, activities, and organization details',
      icon: <FaUniversity size={30} />,
      link: '/admin/student-clubs',
      color: 'warning'
    },
    {
      id: 'announcements',
      title: 'Announcements',
      description: 'Create, edit and manage website announcements',
      icon: <FaBullhorn size={30} />,
      link: '/admin/announcements',
      color: 'success'
    },
    {
      id: 'links',
      title: 'Important Links',
      description: 'Manage external and internal links displayed throughout the site',
      icon: <FaLink size={30} />,
      link: '/admin/links',
      color: 'info'
    },
    {
      id: 'leadership',
      title: 'Leadership',
      description: 'Edit principal, registrar and dean of academics details',
      icon: <FaUserTie size={30} />,
      link: '/admin/leadership',
      color: 'warning'
    },
    {
      id: 'export',
      title: 'Make Changes Permanent',
      description: 'Save your admin panel changes permanently to the website code',
      icon: <FaDownload size={30} />,
      link: '/admin/export',
      color: 'success',
      featured: true
    },
    {
      id: 'backup',
      title: 'Backup & Restore',
      description: 'Backup, restore and manage website data',
      icon: <FaDatabase size={30} />,
      link: '/admin/backup',
      color: 'secondary'
    },
    {
      id: 'stats',
      title: 'Website Analytics',
      description: 'View website statistics and visitor information',
      icon: <FaChartBar size={30} />,
      link: '/admin/analytics',
      color: 'secondary',
      disabled: true
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage admin users and permissions',
      icon: <FaUsers size={30} />,
      link: '/admin/users',
      color: 'danger',
      disabled: true
    },
    {
      id: 'settings',
      title: 'Site Settings',
      description: 'Configure general website settings',
      icon: <FaCog size={30} />,
      link: '/admin/settings',
      color: 'dark',
      disabled: true
    }
  ];

  return (
    <div className="admin-dashboard-page">
      <section className="page-hero bg-dark text-white">
        <Container>
          <div className="py-5">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {user?.loginMethod === 'google' && user?.avatar && (
                  <Image 
                    src={user.avatar} 
                    roundedCircle 
                    className="me-3" 
                    width={50} 
                    height={50}
                    alt="User avatar" 
                  />
                )}
                <div>
                  <h1>Admin Dashboard</h1>
                  <p>
                    Welcome, {user?.username || 'Administrator'}
                    {user?.loginMethod === 'google' && user?.email && (
                      <span className="text-light-emphasis d-block small">
                        {user.email}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline-light" 
                onClick={handleLogout}
                className="d-flex align-items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      <section className="py-5">
        <Container>
          {showLogoutAlert && (
            <Alert variant="success" className="mb-4">
              Successfully logged out. Redirecting...
            </Alert>
          )}
          
          <Card className="mb-4">
            <Card.Body>
              <Nav className="admin-dashboard-nav">
                {adminModules.filter(module => !module.disabled).map(module => (
                  <Nav.Item key={module.id}>
                    <Nav.Link as={Link} to={module.link}>{module.title}</Nav.Link>
                  </Nav.Item>
                ))}
                <Nav.Item className="ms-auto">
                  <Nav.Link as={Link} to="/">
                    <i className="fas fa-eye me-1"></i> View Website
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
          
          <Alert variant="success" className="mb-4 d-flex align-items-center">
            <div className="me-3">
              <FaDownload size={24} />
            </div>
            <div className="flex-grow-1">
              <h5 className="mb-1">Want to make your changes permanent?</h5>
              <p className="mb-0">
                After making changes in the admin panel, use the <strong>Make Changes Permanent</strong> tool 
                to save them directly to the website code.
              </p>
            </div>
            <div>
              <Link to="/admin/export" className="btn btn-success">
                Save Changes
              </Link>
            </div>
          </Alert>
          
          <Row>
            {adminModules.map(module => (
              <Col md={6} lg={4} className="mb-4" key={module.id}>
                <Card className={`h-100 ${module.disabled ? 'opacity-50' : ''} ${module.featured ? 'border-success' : ''}`}>
                  <Card.Body className="d-flex flex-column">
                    <div className={`module-icon mb-3 text-${module.color}`}>
                      {module.icon}
                    </div>
                    <Card.Title>{module.title}</Card.Title>
                    <Card.Text className="mb-4">{module.description}</Card.Text>
                    <div className="mt-auto">
                      {module.disabled ? (
                        <Button variant="secondary" disabled>Coming Soon</Button>
                      ) : (
                        <Link to={module.link} className={`btn btn-${module.featured ? 'success' : module.color}`}>
                          {module.featured ? 'Save Changes Permanently' : `Manage ${module.title}`}
                        </Link>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <Card className="mb-4 mt-5">
            <Card.Header>
              <h4 className="mb-0">Recent Activity</h4>
            </Card.Header>
            <Card.Body>
              <p className="text-muted text-center py-3">Activity tracking will be available in a future update.</p>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default AdminDashboard; 