import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Hero from '../components/Hero'
import Services from '../components/Services'
import Events from '../components/Events'
import Comments from '../components/Comments'

const AdminScreen = () => {
  const [selectedOption, setSelectedOption] = useState('hero');

  const handleNavClick = (option) => {
    setSelectedOption(option);
  };

  const renderMainContent = () => {
    switch (selectedOption) {
      case 'hero':
        return <Hero />;
      case 'services':
        return <Services />;
      case 'events':
        return <Events />;
      case 'comments':
        return <Comments />;
      default:
        return null;
    }
  };

  const sidebarStyle = {
    backgroundColor: '#343a40',
    color: '#fff',
  };

  return (
    <Container fluid>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col md={2} className="sidebar" style={sidebarStyle}>
          <Nav className="flex-column">
            <Nav.Link onClick={() => handleNavClick('hero')}>Hero</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('services')}>Services</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('events')}>Events</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('comments')}>Comments</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="main-content">
          {/* Main Content */}
          {renderMainContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminScreen;