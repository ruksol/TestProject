import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
import FileBase64 from 'react-file-base64';

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch('/api/hero')
      .then((response) => response.json())
      .then((data) => {
        setHeroes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleEditHero = (index) => {
    setShowEditForm(true);
    setEditIndex(index);
    setTitle(heroes[index].title);
    setSubtitle(heroes[index].subtitle);
    setImage(heroes[index].image);
  };

  const handleDeleteHero = (index) => {
    const heroId = heroes[index]._id;
    fetch(`/api/hero/${heroId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedHeroes = [...heroes];
        updatedHeroes.splice(index, 1);
        setHeroes(updatedHeroes);
      })
      .catch((error) => console.log(error));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newHero = {
      title,
      subtitle,
      image,
    };

    if (editIndex !== null) {
      const heroId = heroes[editIndex]._id;
      fetch(`/api/hero/${heroId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHero),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedHeroes = [...heroes];
          updatedHeroes[editIndex] = data;
          setHeroes(updatedHeroes);
        })
        .catch((error) => console.log(error));
    } else {
      fetch('/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHero),
      })
        .then((response) => response.json())
        .then((data) => {
          setHeroes([...heroes, data]);
        })
        .catch((error) => console.log(error));
    }

    setTitle('');
    setSubtitle('');
    setImage('');
    setShowForm(false);
    setShowEditForm(false);
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Hero</h2>
      {!showForm && !showEditForm ? (
        <div>
          <Button onClick={handleButtonClick}>Create Hero</Button>
          <ListGroup>
            {heroes.map((hero, index) => (
              <Card key={index} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={hero.image} />
                <Card.Body>
                  <Card.Title>{hero.title}</Card.Title>
                  <Card.Text>{hero.subtitle}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleEditHero(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteHero(index)}
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
            <Form.Label>Subtitle:</Form.Label>
            <Form.Control
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
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

export default Hero;