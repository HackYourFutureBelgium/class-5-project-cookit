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



const Main = ({ setRecipeId, setRecipeIngredients, setSavedRecipes, savedRecipes }) => {
  let [ingredients, setIngredients] = useState('');
  let [recipes, setRecipes] = useState('');

  return (
    <>
      <a name="get-search"></a>
      <Grid
        container
        spacing={0}
        className="w-100"
        style={{ height: '100vh', width: '100%', padding: '2vw' }}
      >

        <GlobalCss />
        <Grid item xs={12} style={{ height: '10%' }}>

          <Filter />
        </Grid>
        <Grid item sm={3} md={3} lg={3} style={{ height: '90%', }} >
          <Grid item sm={12}>
            <SearchPart setIngredients={setIngredients} />
          </Grid>
        </Grid>
        <Grid item sm={1} style={{ margin: 'auto', paddingLeft: '2vw' }}>
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
        </Grid>
        <Grid item sm={8} md={8} lg={8} style={{
          height: '90%'
        }}>

          <Recipes
            recipes={recipes}
            setRecipeId={setRecipeId}
            setRecipeIngredients={setRecipeIngredients}
            setSavedRecipes={setSavedRecipes}
            savedRecipes={savedRecipes}
          />

        </Grid>
      </Grid>
    </>
  );
};
export default Main;
