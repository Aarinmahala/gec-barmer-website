import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';
import { useAnnouncements } from '../utils/AnnouncementContext';
import { useAuth } from '../utils/AuthContext';
import '../assets/LatestAnnouncements.css';

const LatestAnnouncements = ({ count = 3 }) => {
  const { getLatestAnnouncements } = useAnnouncements();
  const { isAuthenticated } = useAuth();
  const latestAnnouncements = getLatestAnnouncements(count);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getCategoryLabel = (category) => {
    const categories = {
      academics: { label: 'Academics', variant: 'primary' },
      admissions: { label: 'Admissions', variant: 'success' },
      exams: { label: 'Examinations', variant: 'danger' },
      placements: { label: 'Placements', variant: 'info' },
      events: { label: 'Events', variant: 'warning' },
      general: { label: 'General', variant: 'secondary' }
    };
    
    return categories[category] || { label: category, variant: 'secondary' };
  };
  
  if (latestAnnouncements.length === 0) {
    return null;
  }
  
  return (
    <div className="latest-announcements">
      <h3 className="section-title">Latest Announcements</h3>
      
      {latestAnnouncements.map(announcement => {
        const categoryInfo = getCategoryLabel(announcement.category);
        
        return (
          <Card key={announcement.id} className={`announcement-card mb-3 ${announcement.important ? 'announcement-important' : ''}`}>
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-start">
                <div>
                  {announcement.important && (
                    <Badge bg="danger" className="me-2">Important</Badge>
                  )}
                  {announcement.title}
                </div>
                <Badge bg={categoryInfo.variant} className="announcement-category">
                  {categoryInfo.label}
                </Badge>
              </Card.Title>
              <Card.Text className="announcement-excerpt">
                {announcement.content.length > 120 
                  ? `${announcement.content.substring(0, 120)}...` 
                  : announcement.content}
              </Card.Text>
              <div className="announcement-footer">
                <small className="text-muted">
                  Posted on {formatDate(announcement.date)}
                </small>
                <div className="d-flex gap-2 mt-2">
                  <Link to="/announcements" className="btn btn-sm btn-outline-primary">
                    View All
                  </Link>
                  {announcement.link && (
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      href={announcement.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      More Info
                    </Button>
                  )}
                  {isAuthenticated && (
                    <Link to="/admin/announcements" className="btn btn-sm btn-outline-success">
                      <i className="fas fa-edit me-1"></i>Manage
                    </Link>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default LatestAnnouncements; 