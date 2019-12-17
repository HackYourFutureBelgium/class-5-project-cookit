import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchPart from './SearchPart';
import Recipes from './Recipes';
import Filter from '../filter/Filter';
import 'antd/dist/antd.css';
import Button from '@material-ui/core/Button';
import { Icon } from 'antd';
import { getRecipeByIngredients } from '../functions';
import GlobalCss from './GlobalCss';
import search from '../search.jpg';
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
      <GlobalCss />
      <Grid item xs={12} style={{ height: '10vh' }}>
        <a name="get-search"></a>
        <Filter />
      </Grid>
      <Grid
        item
        sm={4}
        md={4}
        lg={4}
        style={{
          height: '90vh',
          backgroundImage: 'url(' + search + ')',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid item sm={10}>
          <SearchPart setIngredients={setIngredients} />
        </Grid>
        <div>
          <Button
            variant="contained"
            size="large"
            href="#contained-buttons"
            onClick={() => {
              getRecipeByIngredients(ingredients, setRecipes);
            }}
            style={{
              padding: '19px',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Icon type="double-right" />
          </Button>
        </div>
      </Grid>
      <Grid item sm={8} md={8} lg={8} style={{ height: '90vh' }}>
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
