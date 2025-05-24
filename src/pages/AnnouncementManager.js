import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Modal, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useAnnouncements } from '../utils/AnnouncementContext';
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
        <Link to="/announcements" className="btn btn-sm btn-outline-primary">
          <i className="fas fa-eye me-1"></i>View Public Page
        </Link>
      </Card.Header>
      <Card.Body>
        <Nav className="admin-nav">
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          {/* Image Links management disabled - all images are controlled by ImageLinks.js file */}
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/announcements" active>Announcements</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/links">Important Links</Nav.Link>
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

const AnnouncementManager = () => {
  // Use the announcements context instead of local state
  const { announcements, isLoading, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncements();
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'academics',
    important: false,
    link: ''
  });
  
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [saveSourceStatus, setSaveSourceStatus] = useState(null);
  const [saveSourceLoading, setSaveSourceLoading] = useState(false);

  const categories = [
    { value: 'academics', label: 'Academics' },
    { value: 'admissions', label: 'Admissions' },
    { value: 'exams', label: 'Examinations' },
    { value: 'placements', label: 'Placements' },
    { value: 'events', label: 'Events' },
    { value: 'general', label: 'General' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnnouncement({
      ...newAnnouncement,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    
    if (!newAnnouncement.title || !newAnnouncement.content) {
      setMessage({ text: 'Please provide both title and content', type: 'danger' });
      return;
    }
    
    // Use the context function to add the announcement
    addAnnouncement(newAnnouncement);
    setMessage({ text: 'Announcement added successfully', type: 'success' });
    
    // Reset form
    setNewAnnouncement({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'academics',
      important: false,
      link: ''
    });
  };

  const handleEdit = (id) => {
    const announcement = announcements.find(a => a.id === id);
    setEditingAnnouncement(announcement);
    setNewAnnouncement(announcement);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Use the context function to update the announcement
    updateAnnouncement({ ...newAnnouncement, id: editingAnnouncement.id });
    setMessage({ text: 'Announcement updated successfully', type: 'success' });
    
    // Reset form
    setNewAnnouncement({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'academics',
      important: false,
      link: ''
    });
    
    setEditingAnnouncement(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // Use the context function to delete the announcement
    deleteAnnouncement(deleteId);
    setMessage({ text: 'Announcement deleted successfully', type: 'success' });
    setShowDeleteModal(false);
  };

  const cancelEdit = () => {
    setEditingAnnouncement(null);
    setNewAnnouncement({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'academics',
      important: false,
      link: ''
    });
  };

  // Function to make changes permanent
  const handleSaveToSource = async () => {
    setSaveSourceLoading(true);
    try {
      // Send the current announcements data to the server to update source files
      const result = await updateSourceFiles('announcements', announcements);
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
    <div className="announcement-manager-page admin-page">
      <section className="page-hero bg-success text-white">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content text-center py-5">
            <h1>Announcement Manager</h1>
            <p>Create, edit and manage website announcements</p>
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
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading announcements from server...</p>
            </div>
          ) : (
            <Row>
              <Col lg={4} className="mb-4">
                <Card>
                  <Card.Header as="h5">
                    {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={editingAnnouncement ? handleUpdate : handleAddAnnouncement}>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="title"
                          placeholder="Enter announcement title"
                          value={newAnnouncement.title}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={4}
                          name="content"
                          placeholder="Enter announcement content"
                          value={newAnnouncement.content}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="date"
                          value={newAnnouncement.date}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select 
                          name="category"
                          value={newAnnouncement.category}
                          onChange={handleInputChange}
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Link (Optional)</Form.Label>
                        <Form.Control 
                          type="url" 
                          name="link"
                          placeholder="Enter optional URL for more information"
                          value={newAnnouncement.link}
                          onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted">
                          If provided, the announcement will include a link to this URL
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Check 
                          type="checkbox" 
                          label="Mark as important" 
                          name="important"
                          checked={newAnnouncement.important}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      
                      <div className="d-flex gap-2">
                        <Button variant="primary" type="submit">
                          {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
                        </Button>
                        
                        {editingAnnouncement && (
                          <Button variant="secondary" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={8}>
                <Card>
                  <Card.Header as="h5">Current Announcements</Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th width="25%">Title</th>
                            <th width="25%">Content</th>
                            <th width="15%">Date & Category</th>
                            <th width="15%">Link</th>
                            <th width="20%">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {announcements.length > 0 ? (
                            announcements.map(announcement => (
                              <tr key={announcement.id} className={announcement.important ? 'bg-light-warning' : ''}>
                                <td>
                                  {announcement.important && <span className="badge bg-warning me-2">Important</span>}
                                  {announcement.title}
                                </td>
                                <td>
                                  <div className="announcement-content-preview">
                                    {announcement.content}
                                  </div>
                                </td>
                                <td>
                                  <div>{new Date(announcement.date).toLocaleDateString()}</div>
                                  <small className="text-muted text-capitalize">{announcement.category}</small>
                                </td>
                                <td>
                                  {announcement.link ? (
                                    <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="text-truncate d-inline-block" style={{maxWidth: "100%"}}>
                                      {announcement.link}
                                    </a>
                                  ) : (
                                    <span className="text-muted">No link</span>
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <Button 
                                      variant="outline-primary" 
                                      size="sm"
                                      onClick={() => handleEdit(announcement.id)}
                                    >
                                      <i className="fas fa-edit"></i> Edit
                                    </Button>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm"
                                      onClick={() => confirmDelete(announcement.id)}
                                    >
                                      <i className="fas fa-trash-alt"></i> Delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">No announcements yet</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="success"
              onClick={handleSaveToSource}
              disabled={saveSourceLoading}
              className="me-2"
            >
              {saveSourceLoading ? 'Saving...' : 'Make Changes Permanent'}
            </Button>
            <Link to="/admin/dashboard" className="btn btn-secondary">
              Back to Dashboard
            </Link>
          </div>
        </Container>
      </section>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this announcement? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnnouncementManager; 