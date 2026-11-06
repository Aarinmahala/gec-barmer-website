import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useLeadership } from '../utils/LeadershipContext';
import { updateSourceFiles } from '../utils/ApiUtils';
import '../assets/AdminCommon.css';

const AdminNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Admin Dashboard</Card.Header>
      <Card.Body>
        <Nav className="admin-nav">
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/image-links">Image Links</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/announcements">Announcements</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/links">Important Links</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/leadership" active>Leadership</Nav.Link>
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

const LeadershipManager = () => {
  const { leadershipData, isLoading, updateLeader, resetToDefaults } = useLeadership();
  const [selectedRole, setSelectedRole] = useState('principal');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showResetModal, setShowResetModal] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [saveSourceStatus, setSaveSourceStatus] = useState(null);
  const [saveSourceLoading, setSaveSourceLoading] = useState(false);

  const leaderRoles = {
    principal: 'Principal',
    registrar: 'Registrar',
    dean: 'Dean of Academics'
  };

  const fields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'position', label: 'Position', type: 'text' },
    { key: 'image', label: 'Image URL', type: 'url' },
    { key: 'qualifications', label: 'Qualifications', type: 'text' },
    { key: 'experience', label: 'Experience', type: 'text' },
    { key: 'message', label: 'Message', type: 'textarea' }
  ];

  const handleInputChange = (field, value) => {
    updateLeader(selectedRole, field, value);
    
    // Show preview for image URLs
    if (field === 'image') {
      try {
        new URL(value); // Validate URL
        setPreviewImageUrl(value);
      } catch (error) {
        setPreviewImageUrl('');
      }
    }
    
    setMessage({ text: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`, type: 'success' });
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setPreviewImageUrl(leadershipData[role].image);
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    setShowResetModal(false);
    setMessage({ text: 'All leadership information has been reset to defaults', type: 'success' });
    setPreviewImageUrl(leadershipData[selectedRole].image);
  };

  // Function to make changes permanent
  const handleSaveToSource = async () => {
    setSaveSourceLoading(true);
    try {
      // Send the current leadership data to the server to update source files
      const result = await updateSourceFiles('leadership', leadershipData);
      setSaveSourceStatus({
        type: result.success ? 'success' : 'danger',
        message: result.message || 'Changes saved to source files successfully'
      });
    } catch (error) {
      console.error('Error saving to source:', error);
      setSaveSourceStatus({
        type: 'danger',
        message: 'Error saving to source: ' + (error.message || 'Unknown error')
      });
    } finally {
      setSaveSourceLoading(false);
    }
  };

  return (
    <div className="leadership-manager-page admin-page">
      <section className="page-hero bg-warning text-white">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content text-center py-5">
            <h1>Leadership Manager</h1>
            <p>Edit principal, registrar and dean of academics details</p>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <AdminNav />
          
          {message.text && (
            <Alert 
              variant={message.type} 
              dismissible 
              onClose={() => setMessage({ text: '', type: '' })}
            >
              {message.text}
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
          
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading leadership data from server...</p>
            </div>
          ) : (
            <>
              <Row className="mb-4">
                <Col>
                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => setShowResetModal(true)}
                    >
                      <i className="fas fa-sync-alt me-1"></i> Reset to Defaults
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleSaveToSource}
                      disabled={saveSourceLoading}
                    >
                      {saveSourceLoading ? 'Saving...' : 'Make Changes Permanent'}
                    </Button>
                  </div>
                </Col>
              </Row>
              
              <Row>
                <Col md={4} className="mb-4">
                  <Card>
                    <Card.Header as="h5">Leadership Roles</Card.Header>
                    <Card.Body>
                      <Nav className="flex-column">
                        {Object.entries(leaderRoles).map(([role, title]) => (
                          <Nav.Link 
                            key={role}
                            className={`leadership-role-link ${selectedRole === role ? 'active' : ''}`}
                            onClick={() => handleRoleChange(role)}
                          >
                            {title}
                          </Nav.Link>
                        ))}
                      </Nav>
                    </Card.Body>
                  </Card>
                  
                  <Card className="mt-4">
                    <Card.Header as="h5">Preview</Card.Header>
                    <Card.Body className="text-center">
                      {previewImageUrl ? (
                        <div className="mb-3">
                          <img 
                            src={previewImageUrl}
                            alt={leadershipData[selectedRole].name}
                            className="leadership-preview-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/200x250?text=No+Image';
                            }}
                          />
                        </div>
                      ) : (
                        <p className="text-muted">No image preview available</p>
                      )}
                      
                      <h5>{leadershipData[selectedRole].name}</h5>
                      <p className="text-muted mb-0">{leadershipData[selectedRole].position}</p>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={8}>
                  <Card>
                    <Card.Header as="h5">
                      Edit {leaderRoles[selectedRole]} Information
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        {fields.map(field => (
                          <Form.Group key={field.key} className="mb-3">
                            <Form.Label>{field.label}</Form.Label>
                            {field.type === 'textarea' ? (
                              <Form.Control 
                                as="textarea" 
                                rows={4}
                                value={leadershipData[selectedRole][field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                              />
                            ) : (
                              <Form.Control 
                                type={field.type}
                                value={leadershipData[selectedRole][field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                              />
                            )}
                          </Form.Group>
                        ))}
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
          
          {/* Reset Confirmation Modal */}
          <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Reset to Defaults</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to reset all leadership information to the default values? This will discard all your changes.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowResetModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleResetToDefaults}>
                Reset All
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </section>
    </div>
  );
};

export default LeadershipManager; 