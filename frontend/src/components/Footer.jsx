import React from 'react';
import Container from 'react-bootstrap/Container';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light ">
      <Container>
        <hr />
        <p className="text-center">
          &copy; 2021 Your Website. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default FooterComponent;