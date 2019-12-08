import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import Filter from './Filter';
import 'antd/dist/antd.css';
import Button from '@material-ui/core/Button';
import { Icon } from 'antd';
import { getRecipeByIngredients, getRecipeInstructions, optimizeIngredients } from '../functions'

const Main = () => {
  let [ingredients, setIngredients] = useState('');
  let [recipes, setRecipes] = useState('');


  return (
    <>
      <Grid container spacing={1} className="w-100 m-0">
        <Grid item xs={12}>
          <Filter />
        </Grid>
        <Grid item xs={4} className="">
          <SecondSection setIngredients={setIngredients} />
        </Grid>
        <div className="m-auto">
          <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => getRecipeByIngredients(ingredients, setRecipes)}>
            <Icon type="double-right" />
          </Button>
        </div>
        <Grid item xs={7}>
          <ThirdSection recipes={recipes} />
        </Grid>
      </Grid>
    </>
  );
};
export default Main;
