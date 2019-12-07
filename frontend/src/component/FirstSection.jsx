import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Image from '../recipe.jpg';

const FirstSection = () => {
  return (
    <>
      <CssBaseline />
      <Container
        style={{
          backgroundImage: 'url(' + Image + ')',
          backgroundSize: 'cover',
          height: '80vh',
          paddingLeft: '110vh',
          paddingTop: '50vh',
          margin: '0px',
          color: 'white',
        }}
      >
        <h2>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet</h2>

        <Button
          variant="contained"
          color="primary"
          href="#contained-buttons"
          style={{
            backgroundColor: 'red',
            marginLeft: '70vh',
          }}
        >
          Link
        </Button>
      </Container>
    </>
  );
};
export default FirstSection;
