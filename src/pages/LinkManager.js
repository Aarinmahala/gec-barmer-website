import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Modal, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useLinks } from '../utils/LinkContext';
import { updateSourceFiles } from '../utils/ApiUtils';
import '../assets/AdminPanel.css';

// Common AdminNav component (reused from AnnouncementManager)
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
        <Link to="/" className="btn btn-sm btn-outline-primary">
          <i className="fas fa-eye me-1"></i>View Website
        </Link>
      </Card.Header>
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
            <Nav.Link as={Link} to="/admin/links" active>Important Links</Nav.Link>
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

const LinkManager = () => {
  const { 
    links, 
    isLoading,
    addLink, 
    updateLink, 
    deleteLink, 
    reorderLinks 
  } = useLinks();
  
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    category: 'important'
  });
  
  const [editingLink, setEditingLink] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [saveSourceStatus, setSaveSourceStatus] = useState(null);
  const [saveSourceLoading, setSaveSourceLoading] = useState(false);

  const categories = [
    { value: 'important', label: 'Important Links' },
    { value: 'student', label: 'Student Links' },
    { value: 'academic', label: 'Academic Links' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink({
      ...newLink,
      [name]: value
    });
  };

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    
    if (!newLink.title || !newLink.url) {
      setMessage({ text: 'Please provide both title and URL', type: 'danger' });
      return;
    }
    
    if (!validateUrl(newLink.url)) {
      setMessage({ text: 'Please enter a valid URL starting with http:// or https://', type: 'danger' });
      return;
    }
    
    // Use the context function to add the link
    addLink(newLink);
    setMessage({ text: 'Link added successfully', type: 'success' });
    
    // Reset form
    setNewLink({
      title: '',
      url: '',
      category: 'important'
    });
  };

  const handleEdit = (id) => {
    const link = links.find(l => l.id === id);
    setEditingLink(link);
    setNewLink(link);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (!newLink.title || !newLink.url) {
      setMessage({ text: 'Please provide both title and URL', type: 'danger' });
      return;
    }
    
    if (!validateUrl(newLink.url)) {
      setMessage({ text: 'Please enter a valid URL starting with http:// or https://', type: 'danger' });
      return;
    }
    
    // Use the context function to update the link
    updateLink({ ...newLink, id: editingLink.id });
    setMessage({ text: 'Link updated successfully', type: 'success' });
    
    // Reset form
    setNewLink({
      title: '',
      url: '',
      category: 'important'
    });
    
    setEditingLink(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // Use the context function to delete the link
    deleteLink(deleteId);
    setMessage({ text: 'Link deleted successfully', type: 'success' });
    setShowDeleteModal(false);
  };

  const cancelEdit = () => {
    setEditingLink(null);
    setNewLink({
      title: '',
      url: '',
      category: 'important'
    });
  };

  // Function to make changes permanent
  const handleSaveToSource = async () => {
    setSaveSourceLoading(true);
    try {
      // Send the current links data to the server to update source files
      const result = await updateSourceFiles('links', links);
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
    <div className="link-manager-page admin-page">
      <section className="page-hero bg-info text-white">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content text-center py-5">
            <h1>Important Links Manager</h1>
            <p>Manage external and internal links displayed throughout the site</p>
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
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading links from server...</p>
            </div>
          ) : (
            <Row>
              <Col lg={4} className="mb-4">
                <Card>
                  <Card.Header as="h5">
                    {editingLink ? 'Edit Link' : 'Add New Link'}
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={editingLink ? handleUpdate : handleAddLink}>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="title"
                          placeholder="Enter link title"
                          value={newLink.title}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>URL</Form.Label>
                        <Form.Control 
                          type="url" 
                          name="url"
                          placeholder="Enter link URL (e.g., https://example.com)"
                          value={newLink.url}
                          onChange={handleInputChange}
                          required
                        />
                        <Form.Text className="text-muted">
                          URL must start with http:// or https://
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Category</Form.Label>
                        <Form.Select 
                          name="category"
                          value={newLink.category}
                          onChange={handleInputChange}
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      
                      <div className="d-flex gap-2">
                        <Button variant="primary" type="submit">
                          {editingLink ? 'Update Link' : 'Add Link'}
                        </Button>
                        
                        {editingLink && (
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
                  <Card.Header as="h5">Current Links</Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th width="25%">Title</th>
                            <th width="45%">URL</th>
                            <th width="15%">Category</th>
                            <th width="15%">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {links.length > 0 ? (
                            links.map(link => (
                              <tr key={link.id}>
                                <td>{link.title}</td>
                                <td>
                                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-truncate d-inline-block" style={{maxWidth: "100%"}}>
                                    {link.url}
                                  </a>
                                </td>
                                <td className="text-capitalize">
                                  {link.category.replace('_', ' ')}
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <Button 
                                      variant="outline-primary" 
                                      size="sm"
                                      onClick={() => handleEdit(link.id)}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm"
                                      onClick={() => confirmDelete(link.id)}
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">No links yet</td>
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
          Are you sure you want to delete this link? This action cannot be undone.
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

export default LinkManager; 