import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Tab, Tabs, Table, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useNCC } from '../utils/NCCContext';
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
        <Link to="/ncc" className="btn btn-sm btn-outline-primary">
          <i className="fas fa-eye me-1"></i>View NCC Page
        </Link>
      </Card.Header>
      <Card.Body>
        <Nav className="admin-nav">
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/ncc" active>NCC</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/nss">NSS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/student-clubs">Student Clubs</Nav.Link>
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

// NCC Manager Component
const NCCManager = () => {
  const { nccData, updateNCCData } = useNCC();
  const [formData, setFormData] = useState(nccData);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [currentActivity, setCurrentActivity] = useState({ id: 0, title: '', description: '', image: '' });
  const [currentAchievement, setCurrentAchievement] = useState({ id: 0, year: '', title: '', description: '' });
  const [editingActivity, setEditingActivity] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(false);
  const [saveSourceStatus, setSaveSourceStatus] = useState(null);
  const [saveSourceLoading, setSaveSourceLoading] = useState(false);
  
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
  
  // Handle activity input change
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setCurrentActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle achievement input change
  const handleAchievementChange = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save activity
  const handleSaveActivity = () => {
    if (!currentActivity.title || !currentActivity.description) {
      return;
    }
    
    let updatedActivities;
    
    if (editingActivity) {
      // Update existing activity
      updatedActivities = formData.activities.map(activity => 
        activity.id === currentActivity.id ? currentActivity : activity
      );
    } else {
      // Add new activity with a unique ID
      const newId = Math.max(0, ...formData.activities.map(a => a.id)) + 1;
      updatedActivities = [
        ...formData.activities,
        { ...currentActivity, id: newId }
      ];
    }
    
    setFormData(prev => ({
      ...prev,
      activities: updatedActivities
    }));
    
    setShowActivityModal(false);
    setCurrentActivity({ id: 0, title: '', description: '', image: '' });
    setEditingActivity(false);
  };
  
  // Save achievement
  const handleSaveAchievement = () => {
    if (!currentAchievement.title || !currentAchievement.year) {
      return;
    }
    
    let updatedAchievements;
    
    if (editingAchievement) {
      // Update existing achievement
      updatedAchievements = formData.achievements.map(achievement => 
        achievement.id === currentAchievement.id ? currentAchievement : achievement
      );
    } else {
      // Add new achievement with a unique ID
      const newId = Math.max(0, ...formData.achievements.map(a => a.id)) + 1;
      updatedAchievements = [
        ...formData.achievements,
        { ...currentAchievement, id: newId }
      ];
    }
    
    setFormData(prev => ({
      ...prev,
      achievements: updatedAchievements
    }));
    
    setShowAchievementModal(false);
    setCurrentAchievement({ id: 0, year: '', title: '', description: '' });
    setEditingAchievement(false);
  };
  
  // Edit activity
  const handleEditActivity = (activity) => {
    setCurrentActivity(activity);
    setEditingActivity(true);
    setShowActivityModal(true);
  };
  
  // Edit achievement
  const handleEditAchievement = (achievement) => {
    setCurrentAchievement(achievement);
    setEditingAchievement(true);
    setShowAchievementModal(true);
  };
  
  // Delete activity
  const handleDeleteActivity = (id) => {
    const updatedActivities = formData.activities.filter(activity => activity.id !== id);
    setFormData(prev => ({
      ...prev,
      activities: updatedActivities
    }));
  };
  
  // Delete achievement
  const handleDeleteAchievement = (id) => {
    const updatedAchievements = formData.achievements.filter(achievement => achievement.id !== id);
    setFormData(prev => ({
      ...prev,
      achievements: updatedAchievements
    }));
  };
  
  // Save all changes
  const handleSaveChanges = () => {
    updateNCCData(formData);
    setSaveStatus({
      type: 'success',
      message: 'NCC data updated successfully'
    });
    
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };
  
  // Make changes permanent in source code
  const handleSaveToSource = async () => {
    setSaveSourceLoading(true);
    try {
      const result = await updateSourceFiles('ncc', nccData);
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
      <h1 className="mb-4">NCC Manager</h1>
      
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
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mission</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="mission" 
                        value={formData.mission} 
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Vision</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="vision" 
                        value={formData.vision} 
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="activities" title="Activities">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5>NCC Activities</h5>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    setCurrentActivity({ id: 0, title: '', description: '', image: '' });
                    setEditingActivity(false);
                    setShowActivityModal(true);
                  }}
                >
                  Add New Activity
                </Button>
              </div>
              
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>#</th>
                    <th style={{ width: '20%' }}>Title</th>
                    <th style={{ width: '45%' }}>Description</th>
                    <th style={{ width: '15%' }}>Image</th>
                    <th style={{ width: '15%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.activities.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No activities added yet</td>
                    </tr>
                  ) : (
                    formData.activities.map((activity) => (
                      <tr key={activity.id}>
                        <td>{activity.id}</td>
                        <td>{activity.title}</td>
                        <td>{activity.description}</td>
                        <td>
                          {activity.image && (
                            <div style={{ maxWidth: '100px' }}>
                              {activity.image}
                            </div>
                          )}
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleEditActivity(activity)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteActivity(activity.id)}
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
        
        <Tab eventKey="achievements" title="Achievements">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5>NCC Achievements</h5>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    setCurrentAchievement({ id: 0, year: '', title: '', description: '' });
                    setEditingAchievement(false);
                    setShowAchievementModal(true);
                  }}
                >
                  Add New Achievement
                </Button>
              </div>
              
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>#</th>
                    <th style={{ width: '15%' }}>Year</th>
                    <th style={{ width: '25%' }}>Title</th>
                    <th style={{ width: '40%' }}>Description</th>
                    <th style={{ width: '15%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.achievements.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No achievements added yet</td>
                    </tr>
                  ) : (
                    formData.achievements.map((achievement) => (
                      <tr key={achievement.id}>
                        <td>{achievement.id}</td>
                        <td>{achievement.year}</td>
                        <td>{achievement.title}</td>
                        <td>{achievement.description}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleEditAchievement(achievement)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteAchievement(achievement.id)}
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
        
        <Tab eventKey="enrollment" title="Enrollment">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Eligibility</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="eligibility" 
                        value={formData.enrollment?.eligibility || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'enrollment')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Process</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="process" 
                        value={formData.enrollment?.process || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'enrollment')}
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
                        value={formData.enrollment?.benefits || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'enrollment')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="contacts" title="Contact Information">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Officer Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="officer" 
                        value={formData.contacts?.officer || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'contacts')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.contacts?.email || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'contacts')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="phone" 
                        value={formData.contacts?.phone || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'contacts')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Office Location</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="office" 
                        value={formData.contacts?.office || ''} 
                        onChange={(e) => handleNestedInputChange(e, 'contacts')}
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
      
      {/* Activity Modal */}
      <Modal show={showActivityModal} onHide={() => setShowActivityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                value={currentActivity.title} 
                onChange={handleActivityChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description" 
                value={currentActivity.description} 
                onChange={handleActivityChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="image" 
                value={currentActivity.image} 
                onChange={handleActivityChange}
              />
              <Form.Text className="text-muted">
                Enter the URL path to the activity image
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowActivityModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveActivity}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Achievement Modal */}
      <Modal show={showAchievementModal} onHide={() => setShowAchievementModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control 
                type="text" 
                name="year" 
                value={currentAchievement.year} 
                onChange={handleAchievementChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                value={currentAchievement.title} 
                onChange={handleAchievementChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description" 
                value={currentAchievement.description} 
                onChange={handleAchievementChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAchievementModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAchievement}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NCCManager; 