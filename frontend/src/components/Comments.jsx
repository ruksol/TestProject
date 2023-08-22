import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  return (
    <Container>
      <h2>Comments</h2>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            <strong>{comment.name}</strong>
            <br />
            <small>{comment.email}</small>
            <p>{comment.comment}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Comments;