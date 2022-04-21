import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function InvalidPage() {
  return (
    <Container>
      <Row>
        <Card style={{ width: '18rem', margin: 'auto' }}>
          <Card.Body>
            <Card.Title>Invalid Request</Card.Title>
            <Link to='/home' className='nav-link'>
              Go to Home page
            </Link>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default InvalidPage;
