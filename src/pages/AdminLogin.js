import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import '../assets/AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state, or default to /admin/dashboard
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const success = loginWithGoogle(credentialResponse);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Google login failed');
  };

  return (
    <div className="admin-login-page">
      <section className="page-hero bg-primary text-white">
        <div className="page-hero-overlay"></div>
        <Container>
          <div className="page-hero-content text-center py-5">
            <h1>Admin Login</h1>
            <p>Please log in to access the admin area</p>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="shadow-sm">
                <Card.Header className="bg-light">
                  <h4 className="mb-0">Administrative Access</h4>
                </Card.Header>
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit" className="mb-3">
                        Login
                      </Button>
                    </div>
                  </Form>
                  
                  <div className="mt-3 text-center">
                    <div className="login-divider">
                      <span>OR</span>
                    </div>
                    
                    <div className="google-login-container my-3">
                      <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        useOneTap
                        theme="filled_blue"
                        shape="rectangular"
                        text="signin_with"
                        logo_alignment="center"
                        width="100%"
                      />
                    </div>
                    
                    <small className="text-muted">
                      *Only authorized college emails can access the admin panel
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AdminLogin; 