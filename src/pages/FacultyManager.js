import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Tab, Tabs, Table, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useFaculty } from '../utils/FacultyContext';
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
            <Nav.Link as={Link} to="/admin/ncc">NCC</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/nss">NSS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/student-clubs">Student Clubs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/faculty" active>Faculty</Nav.Link>
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

// Faculty Manager Component
const FacultyManager = () => {
  const { facultyData, updateFacultyData } = useFaculty();
  const [formData, setFormData] = useState(facultyData);
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('departments');
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(false);
  
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState({
    id: '',
    name: '',
    designation: '',
    qualification: '',
    specialization: '',
    experience: '',
    email: '',
    photo: '',
    bio: '',
    researchAreas: [],
    courses: [],
    achievements: []
  });
  const [editingFaculty, setEditingFaculty] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  
  const [saveSourceStatus, setSaveSourceStatus] = useState(null);
  const [saveSourceLoading, setSaveSourceLoading] = useState(false);
  
  // Handler for department form changes
  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setCurrentDepartment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handler for faculty form changes
  const handleFacultyChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaculty(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle array field changes (research areas, courses, achievements)
  const handleArrayChange = (field, index, value) => {
    setCurrentFaculty(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  
  // Add new item to array field
  const handleAddArrayItem = (field) => {
    setCurrentFaculty(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };
  
  // Remove item from array field
  const handleRemoveArrayItem = (field, index) => {
    setCurrentFaculty(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
  // Save department changes
  const handleSaveDepartment = () => {
    if (!currentDepartment.name || !currentDepartment.shortName) {
      setSaveStatus({
        type: 'danger',
        message: 'Department name and short name are required'
      });
      return;
    }
    
    let updatedDepartments;
    
    if (editingDepartment) {
      // Update existing department
      updatedDepartments = formData.departments.map(dept => 
        dept.id === currentDepartment.id ? currentDepartment : dept
      );
    } else {
      // Add new department
      const newId = Math.max(0, ...formData.departments.map(d => d.id)) + 1;
      updatedDepartments = [
        ...formData.departments,
        { 
          ...currentDepartment, 
          id: newId,
          faculty: [] 
        }
      ];
    }
    
    setFormData(prev => ({
      ...prev,
      departments: updatedDepartments
    }));
    
    setShowDepartmentModal(false);
    setCurrentDepartment(null);
    setEditingDepartment(false);
    
    setSaveStatus({
      type: 'success',
      message: `Department ${editingDepartment ? 'updated' : 'added'} successfully`
    });
    
    setTimeout(() => setSaveStatus(null), 3000);
  };
  
  // Save faculty changes
  const handleSaveFaculty = () => {
    if (!currentFaculty.name || !selectedDeptId) {
      setSaveStatus({
        type: 'danger',
        message: 'Faculty name and department are required'
      });
      return;
    }
    
    // Find selected department
    const deptIndex = formData.departments.findIndex(d => d.id === selectedDeptId);
    
    if (deptIndex === -1) {
      setSaveStatus({
        type: 'danger',
        message: 'Selected department not found'
      });
      return;
    }
    
    const updatedDepartments = [...formData.departments];
    
    if (editingFaculty) {
      // Update existing faculty
      const facultyIndex = updatedDepartments[deptIndex].faculty.findIndex(
        f => f.id === currentFaculty.id
      );
      
      if (facultyIndex === -1) {
        setSaveStatus({
          type: 'danger',
          message: 'Faculty not found in department'
        });
        return;
      }
      
      updatedDepartments[deptIndex].faculty[facultyIndex] = currentFaculty;
    } else {
      // Generate faculty ID if not provided
      const facultyId = currentFaculty.id || 
        `${updatedDepartments[deptIndex].shortName.toLowerCase()}-${String(
          updatedDepartments[deptIndex].faculty.length + 1
        ).padStart(3, '0')}`;
      
      // Add new faculty
      updatedDepartments[deptIndex].faculty.push({
        ...currentFaculty,
        id: facultyId
      });
    }
    
    setFormData(prev => ({
      ...prev,
      departments: updatedDepartments
    }));
    
    setShowFacultyModal(false);
    setCurrentFaculty({
      id: '',
      name: '',
      designation: '',
      qualification: '',
      specialization: '',
      experience: '',
      email: '',
      photo: '',
      bio: '',
      researchAreas: [],
      courses: [],
      achievements: []
    });
    setEditingFaculty(false);
    setSelectedDeptId(null);
    
    setSaveStatus({
      type: 'success',
      message: `Faculty ${editingFaculty ? 'updated' : 'added'} successfully`
    });
    
    setTimeout(() => setSaveStatus(null), 3000);
  };
  
  // Delete department
  const handleDeleteDepartment = (deptId) => {
    if (!window.confirm('Are you sure you want to delete this department? All faculty in this department will also be deleted.')) {
      return;
    }
    
    const updatedDepartments = formData.departments.filter(d => d.id !== deptId);
    
    setFormData(prev => ({
      ...prev,
      departments: updatedDepartments
    }));
    
    setSaveStatus({
      type: 'success',
      message: 'Department deleted successfully'
    });
    
    setTimeout(() => setSaveStatus(null), 3000);
  };
  
  // Delete faculty
  const handleDeleteFaculty = (deptId, facultyId) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) {
      return;
    }
    
    const updatedDepartments = [...formData.departments];
    const deptIndex = updatedDepartments.findIndex(d => d.id === deptId);
    
    if (deptIndex !== -1) {
      updatedDepartments[deptIndex].faculty = updatedDepartments[deptIndex].faculty.filter(
        f => f.id !== facultyId
      );
      
      setFormData(prev => ({
        ...prev,
        departments: updatedDepartments
      }));
      
      setSaveStatus({
        type: 'success',
        message: 'Faculty deleted successfully'
      });
      
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };
  
  // Save all changes
  const handleSaveChanges = () => {
    updateFacultyData(formData);
    setSaveStatus({
      type: 'success',
      message: 'Faculty data saved successfully'
    });
    
    setTimeout(() => setSaveStatus(null), 3000);
  };
  
  // Make changes permanent
  const handleSaveToSource = async () => {
    setSaveSourceLoading(true);
    try {
      // Make sure we're using the current data from formData, not the context
      const result = await updateSourceFiles('faculty', formData);
      setSaveSourceStatus({
        type: result.success ? 'success' : 'danger',
        message: result.message || 'Changes saved to source files successfully'
      });
      
      // If successful, update the context as well to keep them in sync
      if (result.success) {
        updateFacultyData(formData);
        console.log('Faculty data updated in context');
      }
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
    <Container className="py-4 admin-page">
      <h1 className="mb-4">Faculty Manager</h1>
      
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
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="departments" title="Departments">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Departments</h5>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setCurrentDepartment({ name: '', shortName: '' });
                  setEditingDepartment(false);
                  setShowDepartmentModal(true);
                }}
              >
                Add Department
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Short Name</th>
                    <th>Faculty Count</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.departments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No departments found</td>
                    </tr>
                  ) : (
                    formData.departments.map(dept => (
                      <tr key={dept.id}>
                        <td>{dept.id}</td>
                        <td>{dept.name}</td>
                        <td>{dept.shortName}</td>
                        <td>{dept.faculty?.length || 0}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => {
                              setCurrentDepartment(dept);
                              setEditingDepartment(true);
                              setShowDepartmentModal(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteDepartment(dept.id)}
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
        
        <Tab eventKey="faculty" title="Faculty Members">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Faculty Members</h5>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (formData.departments.length === 0) {
                    setSaveStatus({
                      type: 'warning',
                      message: 'Please add at least one department first'
                    });
                    return;
                  }
                  
                  setCurrentFaculty({
                    id: '',
                    name: '',
                    designation: '',
                    qualification: '',
                    specialization: '',
                    experience: '',
                    email: '',
                    photo: '',
                    bio: '',
                    researchAreas: [],
                    courses: [],
                    achievements: []
                  });
                  setEditingFaculty(false);
                  setSelectedDeptId(formData.departments[0].id);
                  setShowFacultyModal(true);
                }}
              >
                Add Faculty
              </Button>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Filter by Department</Form.Label>
                <Form.Select
                  onChange={(e) => setSelectedDeptId(e.target.value ? Number(e.target.value) : null)}
                  value={selectedDeptId || ''}
                >
                  <option value="">All Departments</option>
                  {formData.departments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.departments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No departments found</td>
                    </tr>
                  ) : (
                    formData.departments
                      .filter(dept => !selectedDeptId || dept.id === selectedDeptId)
                      .flatMap(dept => 
                        (dept.faculty || []).map(faculty => ({
                          ...faculty,
                          departmentName: dept.name,
                          departmentId: dept.id
                        }))
                      )
                      .map(faculty => (
                        <tr key={`${faculty.departmentId}-${faculty.id}`}>
                          <td>{faculty.id}</td>
                          <td>{faculty.name}</td>
                          <td>{faculty.departmentName}</td>
                          <td>{faculty.designation}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => {
                                setCurrentFaculty(faculty);
                                setEditingFaculty(true);
                                setSelectedDeptId(faculty.departmentId);
                                setShowFacultyModal(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteFaculty(faculty.departmentId, faculty.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                  )}
                  
                  {formData.departments.length > 0 && 
                   formData.departments
                    .filter(dept => !selectedDeptId || dept.id === selectedDeptId)
                    .flatMap(dept => dept.faculty || []).length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No faculty members found 
                        {selectedDeptId ? ' in selected department' : ''}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
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
      
      {/* Department Modal */}
      <Modal
        show={showDepartmentModal}
        onHide={() => setShowDepartmentModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDepartment ? 'Edit Department' : 'Add Department'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Department Name*</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentDepartment?.name || ''}
                onChange={handleDepartmentChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Short Name*</Form.Label>
              <Form.Control
                type="text"
                name="shortName"
                value={currentDepartment?.shortName || ''}
                onChange={handleDepartmentChange}
                required
              />
              <Form.Text className="text-muted">
                Short form of department name (e.g., CSE, ECE, ME)
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDepartmentModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveDepartment}>
            {editingDepartment ? 'Update' : 'Add'} Department
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Faculty Modal */}
      <Modal
        show={showFacultyModal}
        onHide={() => setShowFacultyModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingFaculty ? 'Edit Faculty Member' : 'Add Faculty Member'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentFaculty.name}
                    onChange={handleFacultyChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department*</Form.Label>
                  <Form.Select
                    name="department"
                    value={selectedDeptId || ''}
                    onChange={(e) => setSelectedDeptId(Number(e.target.value))}
                    required
                  >
                    <option value="">Select Department</option>
                    {formData.departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={currentFaculty.designation}
                    onChange={handleFacultyChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ID (Auto-generated if empty)</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={currentFaculty.id}
                    onChange={handleFacultyChange}
                    disabled={editingFaculty}
                  />
                  <Form.Text className="text-muted">
                    Unique identifier (e.g., cse-001)
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    type="text"
                    name="qualification"
                    value={currentFaculty.qualification}
                    onChange={handleFacultyChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={currentFaculty.experience}
                    onChange={handleFacultyChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentFaculty.email}
                    onChange={handleFacultyChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={currentFaculty.specialization}
                    onChange={handleFacultyChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                name="photo"
                value={currentFaculty.photo}
                onChange={handleFacultyChange}
              />
              <Form.Text className="text-muted">
                URL to faculty photo (e.g., /images/faculty/name.jpg)
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={currentFaculty.bio}
                onChange={handleFacultyChange}
              />
            </Form.Group>
            
            <hr />
            
            <Form.Group className="mb-3">
              <Form.Label>Research Areas</Form.Label>
              {(currentFaculty.researchAreas || []).map((area, index) => (
                <Row key={`research-${index}`} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      value={area}
                      onChange={(e) => handleArrayChange('researchAreas', index, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveArrayItem('researchAreas', index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleAddArrayItem('researchAreas')}
              >
                Add Research Area
              </Button>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Courses</Form.Label>
              {(currentFaculty.courses || []).map((course, index) => (
                <Row key={`course-${index}`} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      value={course}
                      onChange={(e) => handleArrayChange('courses', index, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveArrayItem('courses', index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleAddArrayItem('courses')}
              >
                Add Course
              </Button>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Achievements</Form.Label>
              {(currentFaculty.achievements || []).map((achievement, index) => (
                <Row key={`achievement-${index}`} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      value={achievement}
                      onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveArrayItem('achievements', index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleAddArrayItem('achievements')}
              >
                Add Achievement
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFacultyModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveFaculty}>
            {editingFaculty ? 'Update' : 'Add'} Faculty
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FacultyManager; 