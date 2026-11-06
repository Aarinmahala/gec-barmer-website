import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Carousel } from 'react-bootstrap';
import { useFileAnnouncements } from '../utils/FileAnnouncementLoader';

/**
 * A reusable component to display announcements from the file system
 * Can be used on any page that needs to show announcements
 */
const FileAnnouncementDisplay = ({ count = 3, showCarousel = true }) => {
  const { getLatestAnnouncements, isLoading, error } = useFileAnnouncements();
  const latestAnnouncements = getLatestAnnouncements(count);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (isLoading) {
    return (
      <div className="text-center p-3">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-danger p-2">
        <small>Error loading announcements</small>
      </div>
    );
  }
  
  if (latestAnnouncements.length === 0) {
    return (
      <div className="text-center p-3">
        <small className="text-muted">No announcements available</small>
      </div>
    );
  }
  
  // Display as carousel
  if (showCarousel) {
    return (
      <Carousel controls={false} indicators={false} interval={4000}>
        {latestAnnouncements.map((announcement) => (
          <Carousel.Item key={announcement.id}>
            <p>
              <span className="announcement-date">{formatDate(announcement.date)}:</span> {announcement.title}
            </p>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
  
  // Display as list
  return (
    <div className="announcement-list">
      {latestAnnouncements.map((announcement) => (
        <div key={announcement.id} className="announcement-item mb-2">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              {announcement.important && (
                <Badge bg="danger" pill className="me-1">!</Badge>
              )}
              <Link to={`/announcements#${announcement.id}`}>{announcement.title}</Link>
            </div>
            <small className="text-muted">{formatDate(announcement.date)}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileAnnouncementDisplay; 