import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'

const Header = () => {

  const {userInfo} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
            <Navbar.Brand >Event Addis</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              { userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item onClick={ logoutHandler }>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>

              ) : (
                <>
                <LinkContainer to='login'>
                  <Nav.Link>
                    <FaSignInAlt /> Login
                  </Nav.Link>
                </LinkContainer>
                </>
              ) }
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;