import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Tab, Tabs, Alert, Nav, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useImageLinks } from '../utils/ImageLinkContext';
import { updateSourceFiles } from '../utils/ApiUtils';
import '../assets/ImageLinkManager.css';

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
            <Nav.Link as={Link} to="/admin/image-links" active>Image Links</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/announcements">Announcements</Nav.Link>
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

const ImageLinkManager = () => {
  const { 
    imageLinks, 
    isLoading,
    updateImageLink, 
    addImageToArray, 
    addImageToObject, 
    removeImage,
    addCategory,
    resetToDefaults
  } = useImageLinks();

  const [selectedCategory, setSelectedCategory] = useState('departments');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageKey, setNewImageKey] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ category: '', key: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showResetModal, setShowResetModal] = useState(false);
  const [saveSourceStatus, setSaveSourceStatus] = useState(null);
  const [saveSourceLoading, setSaveSourceLoading] = useState(false);

  // Convert nested object to flat array for display
  const getFlatImageList = (category) => {
    if (!category || !imageLinks[category]) return [];
    
    // Handle array type (like gallery, events)
    if (Array.isArray(imageLinks[category])) {
      return imageLinks[category].map((url, index) => ({ key: index.toString(), url }));
    }
    
    // Handle object type (like departments, faculty)
    if (typeof imageLinks[category] === 'object') {
      return Object.entries(imageLinks[category]).map(([key, url]) => ({ key, url }));
    }
    
    // Handle string type (like logo, principal)
    if (typeof imageLinks[category] === 'string') {
      return [{ key: category, url: imageLinks[category] }];
    }
    
    return [];
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    
    if (!newImageUrl) {
      setMessage({ text: 'Please provide an image URL', type: 'danger' });
      return;
    }
    
    try {
      // Validate URL by trying to create a URL object
      new URL(newImageUrl);
      
      // Different handling based on category data structure
      if (Array.isArray(imageLinks[selectedCategory])) {
        // For array categories like gallery, just add to the array
        addImageToArray(selectedCategory, newImageUrl);
        setMessage({ text: 'Image added successfully!', type: 'success' });
      } else if (typeof imageLinks[selectedCategory] === 'object') {
        // For object categories, need a key
        if (!newImageKey) {
          setMessage({ text: 'Please provide a key name for this image', type: 'danger' });
          return;
        }
        
        // Check if key already exists
        if (imageLinks[selectedCategory][newImageKey]) {
          setMessage({ text: 'This key already exists. Please use a different one or update the existing image.', type: 'warning' });
          return;
        }
        
        addImageToObject(selectedCategory, newImageKey, newImageUrl);
        setMessage({ text: 'Image added successfully!', type: 'success' });
      } else {
        // For direct string properties like logo
        updateImageLink(selectedCategory, null, newImageUrl);
        setMessage({ text: 'Image updated successfully!', type: 'success' });
      }
      
      // Reset form
      setNewImageKey('');
      setNewImageUrl('');
      
    } catch (error) {
      setMessage({ text: 'Please enter a valid URL starting with http:// or https://', type: 'danger' });
    }
  };
  
  const handleUpdateImage = (category, key, newUrl) => {
    try {
      // Validate URL
      new URL(newUrl);
      
      updateImageLink(category, key, newUrl);
      setMessage({ text: 'Image updated successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Please enter a valid URL', type: 'danger' });
    }
  };
  
  const confirmDelete = (category, key) => {
    setDeleteInfo({ category, key });
    setShowDeleteModal(true);
  };
  
  const handleDeleteImage = () => {
    const { category, key } = deleteInfo;
    
    removeImage(category, key);
    setShowDeleteModal(false);
    setMessage({ text: 'Image removed successfully!', type: 'success' });
  };
  
  const handleAddCategory = () => {
    if (!newCategoryName) {
      setMessage({ text: 'Please provide a category name', type: 'danger' });
      return;
    }
    
    // Validate category name - alphanumeric and no spaces
    if (!/^[a-zA-Z0-9]+$/.test(newCategoryName)) {
      setMessage({ text: 'Category name should only contain letters and numbers, no spaces or special characters', type: 'danger' });
      return;
    }
    
    addCategory(newCategoryName);
    setShowAddCategoryModal(false);
    setSelectedCategory(newCategoryName);
    setNewCategoryName('');
    setMessage({ text: 'New category added successfully!', type: 'success' });
  };
  
  const handleResetToDefaults = () => {
    resetToDefaults();
    setShowResetModal(false);
    setMessage({ text: 'All image links have been reset to defaults', type: 'success' });
  };

  // Add function to make changes permanent
  const handleSaveToSource = async () => {
    setSaveSourceLoading(true);
    try {
      // Send the current imageLinks data to the server to update source files
      const result = await updateSourceFiles('imageLinks', imageLinks);
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
    <div className="image-link-manager-page">
      <section className="page-hero bg-primary text-white">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content text-center py-5">
            <h1>Image Link Manager</h1>
            <p>Manage all website images from a central location</p>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <AdminNav />
          
          {message.text && (
            <Alert variant={message.type} dismissible onClose={() => setMessage({ text: '', type: '' })}>
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
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading image data from server...</p>
            </div>
          ) : (
            <>
              <Row className="mb-4">
                <Col>
                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => setShowAddCategoryModal(true)}
                    >
                      <i className="fas fa-plus me-1"></i> Add New Category
                    </Button>
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
                <Col lg={4} className="mb-4">
                  <Card>
                    <Card.Header as="h5">Add/Update Image Link</Card.Header>
                    <Card.Body>
                      <Form onSubmit={handleAddImage}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                            {Object.keys(imageLinks).map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        
                        {/* Show key field only if selected category is an object */}
                        {typeof imageLinks[selectedCategory] === 'object' && !Array.isArray(imageLinks[selectedCategory]) && (
                          <Form.Group className="mb-3">
                            <Form.Label>Key/Name</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter image key or name"
                              value={newImageKey}
                              onChange={(e) => setNewImageKey(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                              This will be the identifier for the image in this category
                            </Form.Text>
                          </Form.Group>
                        )}
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Image URL</Form.Label>
                          <Form.Control 
                            type="url" 
                            placeholder="Enter image URL"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            URL must start with http:// or https://
                          </Form.Text>
                        </Form.Group>
                        
                        <div className="d-flex gap-2">
                          <Button variant="primary" type="submit">
                            {Array.isArray(imageLinks[selectedCategory]) ? "Add Image" : 
                              (typeof imageLinks[selectedCategory] === 'object' ? "Add Image" : "Update Image")}
                          </Button>
                          
                          {newImageUrl && (
                            <div className="image-preview-small">
                              <img 
                                src={newImageUrl} 
                                alt="Preview" 
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = imageLinks.placeholder;
                                  e.target.style.opacity = "0.5";
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col lg={8}>
                  <Card>
                    <Card.Header as="h5">Current Image Links</Card.Header>
                    <Card.Body>
                      <Tabs
                        activeKey={selectedCategory}
                        onSelect={(k) => setSelectedCategory(k)}
                        className="mb-4"
                      >
                        {Object.keys(imageLinks).map(category => (
                          <Tab key={category} eventKey={category} title={category.charAt(0).toUpperCase() + category.slice(1)}>
                            {/* Tab content will be rendered based on the active tab */}
                          </Tab>
                        ))}
                      </Tabs>
                      
                      <div className="image-links-table">
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width="20%">Key</th>
                              <th width="50%">URL</th>
                              <th width="15%">Preview</th>
                              <th width="15%">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFlatImageList(selectedCategory).map((item, index) => (
                              <tr key={index}>
                                <td>{item.key}</td>
                                <td>
                                  <div className="url-cell">
                                    {item.url}
                                    <Button 
                                      variant="link" 
                                      size="sm" 
                                      onClick={() => {navigator.clipboard.writeText(item.url)}}
                                      className="copy-btn"
                                    >
                                      <i className="fas fa-copy"></i>
                                    </Button>
                                  </div>
                                </td>
                                <td>
                                  <div className="image-preview">
                                    <img 
                                      src={item.url} 
                                      alt={item.key} 
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = imageLinks.placeholder;
                                        e.target.style.opacity = "0.5";
                                      }}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex flex-column gap-2">
                                    <Button 
                                      variant="outline-primary" 
                                      size="sm"
                                      onClick={() => {
                                        setNewImageKey(item.key);
                                        setNewImageUrl(item.url);
                                      }}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm"
                                      onClick={() => confirmDelete(selectedCategory, item.key)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {getFlatImageList(selectedCategory).length === 0 && (
                              <tr>
                                <td colSpan="4" className="text-center">No images in this category</td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
      
      {/* Add Category Modal */}
      <Modal show={showAddCategoryModal} onHide={() => setShowAddCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter new category name (e.g. teamPhotos)"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <Form.Text className="text-muted">
              Use camelCase naming without spaces or special characters
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCategoryModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this image? Any pages using this image will be affected.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteImage}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Reset Confirmation Modal */}
      <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset to Defaults</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reset all image links to their default values? This will discard all your changes.
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
    </div>
  );
};

export default ImageLinkManager; 