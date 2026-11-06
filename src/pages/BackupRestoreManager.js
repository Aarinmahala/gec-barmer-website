import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form, Modal, Spinner } from 'react-bootstrap';
import { useAuth } from '../utils/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { createCompleteBackup, restoreFromBackup, resetToFactoryDefaults } from '../utils/BackupRestoreUtils';
import { exportImageLinks, exportAnnouncements, exportLinks, exportLeadership } from '../utils/ExportUtils';
import { updateAllSourceFiles } from '../utils/ApiUtils';

const BackupRestoreManager = () => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/admin-login" />;
  }
  
  // Handle backup creation
  const handleCreateBackup = () => {
    const result = createCompleteBackup();
    setMessage(result);
  };
  
  // Handle file selection for restore
  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const result = await restoreFromBackup(e.target.files[0]);
        setMessage(result);
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        setMessage({
          success: false,
          message: error.message || 'Failed to restore from backup'
        });
      }
    }
  };
  
  // Handle factory reset
  const handleFactoryReset = () => {
    const result = resetToFactoryDefaults();
    setMessage(result);
    setShowResetModal(false);
  };
  
  // Export all data types
  const handleExportAllData = () => {
    exportImageLinks();
    exportAnnouncements();
    exportLinks();
    exportLeadership();
    
    setMessage({
      success: true,
      message: 'All data types have been exported. Please check your downloads folder.'
    });
  };
  
  // Handle direct update to source files
  const handleUpdateSourceFiles = async () => {
    setLoading(true);
    
    try {
      const result = await updateAllSourceFiles();
      setMessage(result);
    } catch (error) {
      setMessage({
        success: false,
        message: error.message || 'Failed to update source files'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Website Data Management</h2>
      <p className="text-center mb-5">
        This page allows you to backup, restore, and manage all website data. 
        Make permanent changes to the website by exporting data to code files.
      </p>
      
      {message && (
        <Alert 
          variant={message.success ? "success" : "danger"}
          dismissible
          onClose={() => setMessage(null)}
          className="mb-4"
        >
          {message.message}
          {message.success && message.message.includes('source files') && (
            <div className="mt-2">
              <strong>Your changes are now permanent in the codebase!</strong>
            </div>
          )}
        </Alert>
      )}
      
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Backup & Restore</h4>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-3">
                <div>
                  <h5>Create Backup</h5>
                  <p>
                    Save a complete backup of all website data. This includes image links, 
                    announcements, important links, and leadership information.
                  </p>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleCreateBackup}
                    className="w-100"
                  >
                    Create & Download Backup
                  </Button>
                </div>
                
                <hr />
                
                <div>
                  <h5>Restore from Backup</h5>
                  <p>
                    Restore website content from a previously created backup file.
                    All current data will be replaced with the backup content.
                  </p>
                  <Form.Group controlId="backupFile" className="mb-3">
                    <Form.Control 
                      type="file" 
                      accept=".json"
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                    />
                  </Form.Group>
                </div>
                
                <hr />
                
                <div>
                  <h5>Factory Reset</h5>
                  <p className="text-danger">
                    Warning: This will reset all website data to the original defaults.
                    All custom changes will be lost.
                  </p>
                  <Button 
                    variant="danger" 
                    onClick={() => setShowResetModal(true)}
                    className="w-100"
                  >
                    Reset to Factory Defaults
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">Make Changes Permanent</h4>
            </Card.Header>
            <Card.Body>
              <h5>Make All Current Changes Permanent</h5>
              <p className="mb-4">
                After restoring from a backup or making changes in the admin panels, use this
                button to make all your changes permanent in the codebase.
              </p>
              
              <div className="d-grid mb-4">
                <Button 
                  variant="success" 
                  size="lg" 
                  onClick={handleUpdateSourceFiles}
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
                <small className="text-center mt-2 text-muted">
                  This will permanently update the source code with your current changes
                </small>
              </div>
              
              <hr />
              
              <h5>Alternative: Manual Export</h5>
              <p>
                If the direct update doesn't work, you can download the JavaScript files manually and
                then update the codebase yourself.
              </p>
              <Button 
                variant="outline-success" 
                onClick={handleExportAllData}
                className="w-100"
              >
                Export All Data to Code Files
              </Button>
              
              <div className="mt-4">
                <Link to="/admin/export" className="btn btn-outline-secondary">
                  Go to Export Manager for More Options
                </Link>
              </div>
            </Card.Body>
            <Card.Footer className="bg-light">
              <p className="mb-0 small">
                <strong>Note:</strong> For the direct update to work, the server component must be running.
                If you encounter errors, use the manual export option instead.
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      
      {/* Factory Reset Confirmation Modal */}
      <Modal show={showResetModal} onHide={() => setShowResetModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Factory Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Warning:</strong> You are about to reset all website data to factory defaults.
            This action cannot be undone. All your custom changes will be lost.
          </p>
          <p>
            Are you sure you want to continue?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleFactoryReset}>
            Yes, Reset Everything
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BackupRestoreManager; 