import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
import FileBase64 from 'react-file-base64';

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState('');
  const [events, setEvents] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleEditEvent = (index) => {
    setShowEditForm(true);
    setEditIndex(index);
    setTitle(events[index].title);
    setDate(events[index].date);
    setPlace(events[index].place);
    setImage(events[index].image);
  };

  const handleDeleteEvent = (index) => {
    const eventId = events[index]._id;
    fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedEvents = [...events];
        updatedEvents.splice(index, 1);
        setEvents(updatedEvents);
      })
      .catch((error) => console.log(error));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      date,
      place,
      image,
    };

    if (editIndex !== null) {
      const eventId = events[editIndex]._id;
      fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedEvents = [...events];
          updatedEvents[editIndex] = data;
          setEvents(updatedEvents);
        })
        .catch((error) => console.log(error));
    } else {
      fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })
        .then((response) => response.json())
        .then((data) => {
          setEvents([...events, data]);
        })
        .catch((error) => console.log(error));
    }

    setTitle('');
    setDate('');
    setPlace('');
    setImage('');
    setShowForm(false);
    setShowEditForm(false);
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Events</h2>
      {!showForm && !showEditForm ? (
        <div>
          <Button onClick={handleButtonClick}>Create Event</Button>
          <ListGroup>
            {events.map((event, index) => (
              <Card key={index} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={event.image} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>Date: {event.date}</Card.Text>
                  <Card.Text>Place: {event.place}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleEditEvent(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteEvent(index)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
        </div>
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Place:</Form.Label>
            <Form.Control
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image:</Form.Label>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setImage(base64)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </div>
  );
};

export default Events;