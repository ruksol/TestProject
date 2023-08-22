import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaComment, FaEnvelope, FaUser } from 'react-icons/fa';
import FileBase64 from 'react-file-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeScreen = () => {
  const [hero, setHero] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [nam, setNam] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mail, setmail] = useState('');

  useEffect(() => {
    fetch('/api/hero')
      .then((response) => response.json())
      .then((data) => {
        setHero(data);
      })
      .catch((error) => console.log(error));

    fetch('/api/services')
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.log(error));

    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      name,
      email,
      comment,
    };

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Comment submitted:', data);
        setName('');
        setEmail('');
        setComment('');
      })
      .catch((error) => console.log(error));
  };

  const handleRegistration = (e, event) => {
    e.preventDefault();
  
    // Perform form validation
    if (!nam || !phoneNumber || !mail) {
      toast.error('Please fill in all the fields!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
  
    // Perform form submission logic here
    // For example, you can send the registration data to an API endpoint
  
    // Display the toast message
    toast.success('You have registered for the event!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  
    // Reset the form and hide it
    setName('');
    setPhoneNumber('');
    setEmail('');
    setShowRegistrationForm(false);
  };

  return (
    <div>
      <section className="hero" style={{ height: '100vh', backgroundColor: '#f2f2f2' }}>
        <Container fluid>
          <Row>
            {hero.map((hero) => (
              <Col key={hero.id} md={12}>
                <div
                  className="service-item"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 20px',
                  }}
                >
                  <div
                    className="hero-image"
                    style={{
                      backgroundImage: `url(${hero.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '100%',
                      filter: 'brightness(70%)',
                    }}
                  />
                  <div
                    className="hero-content"
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      zIndex: 1,
                    }}
                  >
                    <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>{hero.title}</h1>
                    <p style={{ fontSize: '24px' }}>{hero.subtitle}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <br /><br /><br />

      <section className="services">
        <Container>
          <Row>
            <Col>
              <h2>What we Do?</h2>
              <Row>
                {services.map((service) => (
                  <Col key={service.id} md={4}>
                    <div className="service-item">
                      <img src={service.image} alt="Service" />
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <br /><br /><br />

      <section className="events">
        <Container>
          <Row>
            <Col>
              <h2>Events</h2>
              <Row>
              {events.map((event) => (
                <Col key={event.id} md={4}>
                  <div className="event-item">
                    <img src={event.image} alt="Event" />
                    <h3>{event.title}</h3>
                    <p>Date: {event.date}</p>
                    <p>Place: {event.place}</p>
                    {showRegistrationForm ? (
                      <div>
                        <Form onSubmit={(e) => handleRegistration(e, event)}>
                          <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your name"
                              value={nam}
                              onChange={(e) => setNam(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder="Enter your phone number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter your email"
                              value={mail}
                              onChange={(e) => setmail(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Register
                          </Button>
                        </Form>
                      </div>
                    ) : (
                      <Button variant="primary" onClick={() => setShowRegistrationForm(true)}>
                        Register
                      </Button>
                    )}
                  </div>
                </Col>
              ))}
              </Row>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </section>
      
      <br /><br /><br />

      <section className="comments">
        <Container>
          <Row>
            <Col>
              <h2>Contact Us</h2>
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <FaComment /> Post Comment
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomeScreen;