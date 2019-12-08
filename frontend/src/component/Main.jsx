import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchPart from './SearchPart';
import Recipes from './Recipes';
import Filter from './Filter';
import 'antd/dist/antd.css';
import Button from '@material-ui/core/Button';
import { Icon } from 'antd';
import { getRecipeByIngredients, getRecipeInstructions, optimizeIngredients } from '../functions';
import Container from '@material-ui/core/Container';

const Main = () => {
  let [ingredients, setIngredients] = useState('');
  let [recipes, setRecipes] = useState('');

  return (
    <>
      <Container
        style={{
          height: '100vh',
          marginTop: '20vh',
          marginBottom: '20vh',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Filter />
          </Grid>
          <Grid item xs={3} style={{}}>
            <div
              style={{
                height: '50vh',
                marginTop: '5vh',
                marginBottom: '5vh',
              }}
            >
              <SearchPart setIngredients={setIngredients} />
            </div>
          </Grid>
          <div className="m-auto">
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
              onClick={() => getRecipeByIngredients(ingredients, setRecipes)}
            >
              <Icon type="double-right" />
            </Button>
          </div>
          <Grid item xs={8} style={{}}>
            <div
              style={{
                height: '75vh',
                marginTop: '5vh',
                marginBottom: '5vh',
                overflow: 'auto',
              }}
            >
              <Recipes recipes={recipes} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Main;
