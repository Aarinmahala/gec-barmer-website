import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import PageHero from '../components/PageHero';
import '../assets/Announcements.css';

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

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/announcements.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading announcements...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="announcements-page">
      <PageHero title="Announcements" subtitle="Latest updates and news" />
      <Container className="py-5">
        <Row className="justify-content-center">
          {announcements.length === 0 ? (
            <div className="no-announcements text-center">No announcements found.</div>
          ) : (
            announcements.map((announcement) => {
              const categoryInfo = getCategoryLabel(announcement.category);
              return (
                <Col md={6} lg={4} className="mb-4" key={announcement.id}>
                  <Card className={`announcement-card h-100 ${announcement.important ? 'announcement-important' : ''}`}> 
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
                        {announcement.content.length > 140
                          ? `${announcement.content.substring(0, 140)}...`
                          : announcement.content}
                      </Card.Text>
                      <div className="announcement-footer d-flex flex-column gap-2 mt-3">
                        <small className="text-muted">
                          Posted on {formatDate(announcement.date)}
                        </small>
                        <div className="d-flex gap-2">
                          {announcement.link && (
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              href={announcement.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              More Info
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Announcements; 