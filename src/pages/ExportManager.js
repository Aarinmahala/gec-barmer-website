import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { exportImageLinks, exportAnnouncements, exportLinks, exportLeadership, exportAllData } from '../utils/ExportUtils';
import { updateSourceFiles, updateAllSourceFiles } from '../utils/ApiUtils';
import { useAuth } from '../utils/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const ExportManager = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState({});
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/admin-login" />;
  }
  
  // Handle exports for specific data type
  const handleExport = (type) => {
    let result;
    
    switch (type) {
      case 'imageLinks':
        result = exportImageLinks();
        break;
      case 'announcements':
        result = exportAnnouncements();
        break;
      case 'links':
        result = exportLinks();
        break;
      case 'leadership':
        result = exportLeadership();
        break;
      case 'all':
        result = exportAllData();
        break;
      default:
        result = { success: false, message: 'Invalid export type' };
    }
    
    setMessages({ ...messages, [type]: result });
  };
  
  // Handle direct update to source files
  const handleUpdateSource = async (type) => {
    setLoading(true);
    setServerStatus(null);
    
    try {
      let result;
      
      if (type === 'all') {
        result = await updateAllSourceFiles();
      } else {
        // Get data from localStorage for the specific type
        const storageKey = `college_website_${type === 'imageLinks' ? 'image_links' : type}`;
        const data = JSON.parse(localStorage.getItem(storageKey));
        
        if (!data) {
          setServerStatus({
            success: false,
            message: `No data found for ${type} in localStorage`,
          });
          setLoading(false);
          return;
        }
        
        result = await updateSourceFiles(type, data);
      }
      
      setServerStatus(result);
    } catch (error) {
      setServerStatus({
        success: false,
        message: error.message || 'Failed to update source files',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Export Website Data</h2>
      <p className="text-center mb-5">
        This page allows you to make changes permanent by either downloading code files or
        directly updating the source code.
      </p>
      
      {serverStatus && (
        <Alert 
          variant={serverStatus.success ? "success" : "danger"}
          dismissible
          onClose={() => setServerStatus(null)}
          className="mb-4"
        >
          {serverStatus.message}
          {serverStatus.success && (
            <div className="mt-2">
              <strong>Your changes are now permanent in the codebase!</strong>
            </div>
          )}
        </Alert>
      )}
      
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">Make Changes Permanent (Recommended)</h4>
            </Card.Header>
            <Card.Body>
              <p className="mb-4">
                This method directly updates the source code files in the codebase, making your changes permanent.
                Changes will persist even if localStorage is cleared or across different browsers.
              </p>
              
              <Row className="mb-4">
                <Col>
                  <Button 
                    variant="success" 
                    size="lg" 
                    className="w-100"
                    onClick={() => handleUpdateSource('all')}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Updating Source Files...
                      </>
                    ) : (
                      'Save All Changes to Codebase'
                    )}
                  </Button>
                  <div className="text-center mt-2 text-muted">
                    <small>Recommended option - updates all data types at once</small>
                  </div>
                </Col>
              </Row>
              
              <Row className="mb-3 g-3">
                <Col md={6}>
                  <Button 
                    variant="outline-success" 
                    className="w-100"
                    onClick={() => handleUpdateSource('imageLinks')}
                    disabled={loading}
                  >
                    Update Image Links
                  </Button>
                </Col>
                <Col md={6}>
                  <Button 
                    variant="outline-success" 
                    className="w-100"
                    onClick={() => handleUpdateSource('announcements')}
                    disabled={loading}
                  >
                    Update Announcements
                  </Button>
                </Col>
                <Col md={6}>
                  <Button 
                    variant="outline-success" 
                    className="w-100"
                    onClick={() => handleUpdateSource('links')}
                    disabled={loading}
                  >
                    Update Links
                  </Button>
                </Col>
                <Col md={6}>
                  <Button 
                    variant="outline-success" 
                    className="w-100"
                    onClick={() => handleUpdateSource('leadership')}
                    disabled={loading}
                  >
                    Update Leadership Data
                  </Button>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="bg-light">
              <p className="mb-0 small">
                <strong>Note:</strong> For this to work, the update server must be running. If you're getting connection errors,
                use the manual download method below.
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Export Data Files (Manual Method)</h4>
            </Card.Header>
            <Card.Body>
              <p className="mb-4">
                The alternative method is to download JavaScript files that you can manually replace in your codebase.
                Use this if the direct update method doesn't work.
              </p>
              
              <div className="d-grid gap-3">
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={() => handleExport('imageLinks')}
                >
                  Export Image Links
                </Button>
                
                {messages.imageLinks && (
                  <Alert variant={messages.imageLinks.success ? "success" : "danger"}>
                    {messages.imageLinks.message}
                  </Alert>
                )}
                
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={() => handleExport('announcements')}
                >
                  Export Announcements
                </Button>
                
                {messages.announcements && (
                  <Alert variant={messages.announcements.success ? "success" : "danger"}>
                    {messages.announcements.message}
                  </Alert>
                )}
                
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={() => handleExport('links')}
                >
                  Export Links
                </Button>
                
                {messages.links && (
                  <Alert variant={messages.links.success ? "success" : "danger"}>
                    {messages.links.message}
                  </Alert>
                )}
                
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={() => handleExport('leadership')}
                >
                  Export Leadership Data
                </Button>
                
                {messages.leadership && (
                  <Alert variant={messages.leadership.success ? "success" : "danger"}>
                    {messages.leadership.message}
                  </Alert>
                )}
                
                <hr />
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => handleExport('all')}
                >
                  Export All Data
                </Button>
                
                {messages.all && Object.keys(messages.all).map(key => (
                  <Alert 
                    key={key}
                    variant={messages.all[key].success ? "success" : "danger"}
                  >
                    <strong>{key}:</strong> {messages.all[key].message}
                  </Alert>
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="bg-light">
              <p className="mb-0 text-muted">
                <strong>Note:</strong> After downloading, you'll need to manually replace the appropriate files in your codebase.
              </p>
            </Card.Footer>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <h4 className="mb-0">Installation Instructions</h4>
            </Card.Header>
            <Card.Body>
              <h5>Making your changes permanent in the codebase:</h5>
              <ol>
                <li>For the easiest method, use the "Save All Changes to Codebase" button at the top of this page.</li>
                <li>If manual installation is needed, export the data using the buttons in the middle section.</li>
                <li>For ImageLinks.js, replace the entire file in the src/utils/ directory.</li>
                <li>For other exports (announcements, links, leadership), copy the exported data and replace the corresponding
                default data in their context files.</li>
                <li>After replacing files, rebuild your application to incorporate the changes.</li>
              </ol>
              
              <div className="mt-4">
                <Link to="/admin/dashboard" className="btn btn-outline-secondary">
                  Return to Dashboard
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExportManager; 