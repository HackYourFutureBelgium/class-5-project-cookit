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
          height: '90vh',
          position: 'relative',
          maxWidth: 'none',
        }}
      >
        <div style={{ position: 'absolute', right: 90, bottom: 80 }}>
          <h2 className="text-white" style={{ position: 'relative' }}>
            Find the Perfect Recipe
          </h2>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#D0001B',
              position: 'absolute',
              right: 0,
              bottom: -55,
            }}
          >
            <a href="#get-search " style={{ color: 'white', textDecoration: 'none' }}>
              Search Recipes
            </a>
          </Button>
        </div>
      </Container>
    </>
  );
};
export default FirstSection;
