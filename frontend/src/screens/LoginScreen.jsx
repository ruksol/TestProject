import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if(userInfo) {
      navigate('/admin')
    }
  }, [navigate, userInfo])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/admin')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5'>
            <h1>Log In</h1>

            <Form onSubmit={handleLogin}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                { isLoading && <Loader/> }

                <Button variant="primary" type="submit" className='mt-3'>
                Login
                </Button>
            </Form>
        </Col>
      </Row>
      {/* <br /> <br /> <br /> <br /> <br /> <br />   */}
    </Container>
  );
};

export default LoginScreen; 