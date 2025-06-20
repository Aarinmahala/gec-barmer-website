import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Container className="text-center py-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-3">Loading content, please wait...</p>
    </Container>
  );
};

export default Loader; 