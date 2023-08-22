import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
import FileBase64 from 'react-file-base64';

const Services = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [services, setServices] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('/api/services')
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleEditService = (index) => {
    setShowEditForm(true);
    setEditIndex(index);
    setTitle(services[index].title);
    setDescription(services[index].description);
    setImage(services[index].image);
  };

  const handleDeleteService = (index) => {
    const serviceId = services[index]._id;
    fetch(`/api/services/${serviceId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedServices = [...services];
        updatedServices.splice(index, 1);
        setServices(updatedServices);
      })
      .catch((error) => console.log(error));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newService = {
      title,
      description,
      image,
    };

    if (editIndex !== null) {
      const serviceId = services[editIndex]._id;
      fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedServices = [...services];
          updatedServices[editIndex] = data;
          setServices(updatedServices);
        })
        .catch((error) => console.log(error));
    } else {
      fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      })
        .then((response) => response.json())
        .then((data) => {
          setServices([...services, data]);
        })
        .catch((error) => console.log(error));
    }

    setTitle('');
    setDescription('');
    setImage('');
    setShowForm(false);
    setShowEditForm(false);
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Services</h2>
      {!showForm && !showEditForm ? (
        <div>
          <Button onClick={handleButtonClick}>Create Service</Button>
          <ListGroup>
            {services.map((service, index) => (
              <Card key={index} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={service.image} />
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleEditService(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteService(index)}
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
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default Services;