import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Hardcoded credentials (in a real app, this would come from a server)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// List of authorized Google emails for admin access
const AUTHORIZED_GOOGLE_EMAILS = [
  'admin@gecbarmer.edu.in',
  'principal@gecbarmer.edu.in',
  'admin@example.com',
  // Add your email below - this will allow you to sign in with Google
  'your.email@gmail.com',
  // For testing purposes, allow any Google account to access the admin panel
  '*'
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');
      
      if (loggedInUser && authToken) {
        setUser(JSON.parse(loggedInUser));
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Error checking authentication:', err);
      // Clear possibly corrupted storage
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function for username/password
  const login = (username, password) => {
    setError(null);
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return false;
    }
    
    // Check credentials against hardcoded values
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const userData = { username, role: 'admin', loginMethod: 'basic' };
      const authToken = Date.now().toString(); // Simple token based on timestamp
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store auth data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', authToken);
      
      return true;
    } else {
      setError('Invalid username or password');
      return false;
    }
  };

  // Google login function
  const loginWithGoogle = (googleResponse) => {
    setError(null);
    
    try {
      // In a real app, you would verify the token and get user information from your backend
      // For now, we'll use the credential directly
      const credential = googleResponse.credential;
      
      // Parse the JWT token to get user information
      const payload = JSON.parse(atob(credential.split('.')[1]));
      const { email, name, picture } = payload;
      
      // Check if email is authorized or if wildcard is enabled
      if (AUTHORIZED_GOOGLE_EMAILS.includes(email) || AUTHORIZED_GOOGLE_EMAILS.includes('*')) {
        const userData = { 
          username: name, 
          email, 
          avatar: picture, 
          role: 'admin',
          loginMethod: 'google'
        };
        
        const authToken = credential; // Use Google's token as our auth token
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store auth data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', authToken);
        
        return true;
      } else {
        setError('Your Google account is not authorized to access the admin area');
        return false;
      }
    } catch (err) {
      console.error('Error logging in with Google:', err);
      setError('Failed to login with Google. Please try again later.');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      loginWithGoogle, 
      logout, 
      error, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 