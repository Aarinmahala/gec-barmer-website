import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Tab, Tabs, Table, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useStudentClubs } from '../utils/StudentClubsContext';
import { updateSourceFiles } from '../utils/ApiUtils';
import '../assets/AdminPanel.css';

// Common AdminNav component
const AdminNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  return (
    <Card className="mb-4">
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        <div>Admin Dashboard</div>
        <Link to="/student-clubs" className="btn btn-sm btn-outline-primary">
          <i className="fas fa-eye me-1"></i>View Student Clubs Page
        </Link>
      </Card.Header>
      <Card.Body>
        <Nav className="admin-nav">
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/ncc">NCC</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/nss">NSS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/student-clubs" active>Student Clubs</Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-auto">
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i> Logout
            </Button>
          </Nav.Item>
        </Nav>
      </Card.Body>
    </Card>
  );
};

// Student Clubs Manager Component
const StudentClubsManager = () => {
  const { clubsData, updateClubsData } = useStudentClubs();
  const [formData, setFormData] = useState(clubsData);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showClubModal, setShowClubModal] = useState(false);
  const [currentClub, setCurrentClub] = useState({
    id: 0,
    name: '',
    logo: '',
    description: '',
    activities: [],
    achievements: [],
    contactPerson: '',
    email: '',
    meetingSchedule: '',
    location: ''
  });
  const [editingClub, setEditingClub] = useState(false);
  const [saveSourceStatus, setSaveSourceStatus] = useState(null);
  const [saveSourceLoading, setSaveSourceLoading] = useState(false);
  const [currentActivity, setCurrentActivity] = useState('');
  const [currentAchievement, setCurrentAchievement] = useState('');
  
  // Handle input change for general info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle input change for nested objects
  const handleNestedInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };
  
  // Handle club input change
  const handleClubChange = (e) => {
    const { name, value } = e.target;
    setCurrentClub(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add activity to club
  const handleAddActivity = () => {
    if (!currentActivity) return;
    
    setCurrentClub(prev => ({
      ...prev,
      activities: [...prev.activities, currentActivity]
    }));
    
    setCurrentActivity('');
  };
  
  // Remove activity from club
  const handleRemoveActivity = (index) => {
    setCurrentClub(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };
  
  // Add achievement to club
  const handleAddAchievement = () => {
    if (!currentAchievement) return;
    
    setCurrentClub(prev => ({
      ...prev,
      achievements: [...prev.achievements, currentAchievement]
    }));
    
    setCurrentAchievement('');
  };
  
  // Remove achievement from club
  const handleRemoveAchievement = (index) => {
    setCurrentClub(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };
  
  // Save club
  const handleSaveClub = () => {
    if (!currentClub.name || !currentClub.description) {
      return;
    }
    
    let updatedClubs;
    
    if (editingClub) {
      // Update existing club
      updatedClubs = formData.clubs.map(club => 
        club.id === currentClub.id ? currentClub : club
      );
    } else {
      // Add new club with a unique ID
      const newId = Math.max(0, ...formData.clubs.map(c => c.id)) + 1;
      updatedClubs = [
        ...formData.clubs,
        { ...currentClub, id: newId }
      ];
    }
    
    setFormData(prev => ({
      ...prev,
      clubs: updatedClubs
    }));
    
    setShowClubModal(false);
    setCurrentClub({
      id: 0,
      name: '',
      logo: '',
      description: '',
      activities: [],
      achievements: [],
      contactPerson: '',
      email: '',
      meetingSchedule: '',
      location: ''
    });
    setEditingClub(false);
  };
  
  // Edit club
  const handleEditClub = (club) => {
    setCurrentClub(club);
    setEditingClub(true);
    setShowClubModal(true);
  };
  
  // Delete club
  const handleDeleteClub = (id) => {
    const updatedClubs = formData.clubs.filter(club => club.id !== id);
    setFormData(prev => ({
      ...prev,
      clubs: updatedClubs
    }));
  };
  
  // Save all changes
  const handleSaveChanges = () => {
    updateClubsData(formData);
    setSaveStatus({
      type: 'success',
      message: 'Student Clubs data updated successfully'
    });
    
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };
  
  // Make changes permanent in source code
  const handleSaveToSource = async () => {
    setSaveSourceLoading(true);
    try {
      const result = await updateSourceFiles('studentClubs', clubsData);
      setSaveSourceStatus({
        type: result.success ? 'success' : 'danger',
        message: result.message
      });
    } catch (error) {
      setSaveSourceStatus({
        type: 'danger',
        message: 'Error saving to source: ' + error.message
      });
    } finally {
      setSaveSourceLoading(false);
    }
  };
  
  return (
    <Container className="py-4 admin-page">
      <h1 className="mb-4">Student Clubs Manager</h1>
      
      <AdminNav />
      
      {saveStatus && (
        <Alert 
          variant={saveStatus.type} 
          onClose={() => setSaveStatus(null)} 
          dismissible
        >
          {saveStatus.message}
        </Alert>
      )}
      
      {saveSourceStatus && (
        <Alert 
          variant={saveSourceStatus.type} 
          onClose={() => setSaveSourceStatus(null)} 
          dismissible
        >
          {saveSourceStatus.message}
        </Alert>
      )}
      
      <Tabs defaultActiveKey="general" className="mb-4">
        <Tab eventKey="general" title="General Information">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Page Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="pageTitle" 
                        value={formData.pageTitle} 
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Page Description</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="pageDescription" 
                        value={formData.pageDescription} 
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Main Image URL</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="mainImage" 
                        value={formData.mainImage} 
                        onChange={handleInputChange}
                      />
                      <Form.Text className="text-muted">
                        Enter the URL path to the main banner image
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Overview</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="overview" 
                        value={formData.overview} 
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="clubs" title="Clubs">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5>Student Clubs</h5>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    setCurrentClub({
                      id: 0,
                      name: '',
                      logo: '',
                      description: '',
                      activities: [],
                      achievements: [],
                      contactPerson: '',
                      email: '',
                      meetingSchedule: '',
                      location: ''
                    });
                    setEditingClub(false);
                    setShowClubModal(true);
                  }}
                >
                  Add New Club
                </Button>
              </div>
              
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>#</th>
                    <th style={{ width: '20%' }}>Name</th>
                    <th style={{ width: '45%' }}>Description</th>
                    <th style={{ width: '15%' }}>Contact</th>
                    <th style={{ width: '15%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.clubs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No clubs added yet</td>
                    </tr>
                  ) : (
                    formData.clubs.map((club) => (
                      <tr key={club.id}>
                        <td>{club.id}</td>
                        <td>{club.name}</td>
                        <td>{club.description.substring(0, 100)}...</td>
                        <td>{club.contactPerson}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleEditClub(club)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteClub(club.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="join" title="Join Process">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>How To Join</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="howToJoin" 
                        value={formData.joinProcess?.howToJoin || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'joinProcess')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Requirements</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="requirements" 
                        value={formData.joinProcess?.requirements || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'joinProcess')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fees</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="fees" 
                        value={formData.joinProcess?.fees || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'joinProcess')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Benefits</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="benefits" 
                        value={formData.joinProcess?.benefits || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'joinProcess')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="new-club" title="Start New Club">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Process</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="process" 
                        value={formData.startNewClub?.process || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'startNewClub')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Guidelines</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="guidelines" 
                        value={formData.startNewClub?.guidelines || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'startNewClub')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Support</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="support" 
                        value={formData.startNewClub?.support || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'startNewClub')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
      
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" as={Link} to="/admin/dashboard">
          Back to Dashboard
        </Button>
        <div>
          <Button 
            variant="success" 
            onClick={handleSaveToSource}
            className="me-2"
            disabled={saveSourceLoading}
          >
            {saveSourceLoading ? 'Saving to Source...' : 'Make Changes Permanent'}
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
      
      {/* Club Modal */}
      <Modal show={showClubModal} onHide={() => setShowClubModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingClub ? 'Edit Club' : 'Add New Club'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Club Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    value={currentClub.name} 
                    onChange={handleClubChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Logo URL</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="logo" 
                    value={currentClub.logo} 
                    onChange={handleClubChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description" 
                value={currentClub.description} 
                onChange={handleClubChange}
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="contactPerson" 
                    value={currentClub.contactPerson} 
                    onChange={handleClubChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={currentClub.email} 
                    onChange={handleClubChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Meeting Schedule</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="meetingSchedule" 
                    value={currentClub.meetingSchedule} 
                    onChange={handleClubChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="location" 
                    value={currentClub.location} 
                    onChange={handleClubChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <hr />
            
            <h5>Activities</h5>
            <Row className="mb-3">
              <Col md={9}>
                <Form.Control 
                  type="text" 
                  placeholder="Enter activity" 
                  value={currentActivity} 
                  onChange={(e) => setCurrentActivity(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Button 
                  variant="outline-primary" 
                  onClick={handleAddActivity}
                  className="w-100"
                >
                  Add Activity
                </Button>
              </Col>
            </Row>
            
            <ul className="list-group mb-4">
              {currentClub.activities.length === 0 ? (
                <li className="list-group-item text-muted">No activities added yet</li>
              ) : (
                currentClub.activities.map((activity, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {activity}
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveActivity(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))
              )}
            </ul>
            
            <h5>Achievements</h5>
            <Row className="mb-3">
              <Col md={9}>
                <Form.Control 
                  type="text" 
                  placeholder="Enter achievement" 
                  value={currentAchievement} 
                  onChange={(e) => setCurrentAchievement(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Button 
                  variant="outline-primary" 
                  onClick={handleAddAchievement}
                  className="w-100"
                >
                  Add Achievement
                </Button>
              </Col>
            </Row>
            
            <ul className="list-group">
              {currentClub.achievements.length === 0 ? (
                <li className="list-group-item text-muted">No achievements added yet</li>
              ) : (
                currentClub.achievements.map((achievement, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {achievement}
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveAchievement(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClubModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClub}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StudentClubsManager; 