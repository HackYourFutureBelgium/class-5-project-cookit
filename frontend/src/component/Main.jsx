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
import { getRecipeByIngredients } from '../functions';
import Container from '@material-ui/core/Container';

const Main = ({ setRecipeId, setRecipeIngredients }) => {
  let [ingredients, setIngredients] = useState('');
  let [recipes, setRecipes] = useState('');

  return (
    <Grid
      container
      spacing={0}
      className="w-100"
      style={{ height: '100vh', width: '100%', marginBottom: '5vh', marginTop: '5vh' }}
    >
      <Grid item xs={12} style={{ height: '10vh' }}>
        <Filter />
      </Grid>
      <Grid item sm={11} md={11} lg={3} style={{ height: '90vh' }}>
        <SearchPart setIngredients={setIngredients} />
      </Grid>
      <Grid
        item
        xs={1}
        style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Button
          variant="contained"
          color="primary"
          href="#contained-buttons"
          onClick={() => getRecipeByIngredients(ingredients, setRecipes)}
        >
          <a name="search-recipes">
            <Icon type="double-right" />
          </a>
        </Button>
      </Grid>
      <Grid item sm={12} md={12} lg={8} style={{ height: '90vh' }}>
        <Recipes
          recipes={recipes}
          setRecipeId={setRecipeId}
          setRecipeIngredients={setRecipeIngredients}
        />
      </Grid>
    </Grid>
  );
};
export default Main;
