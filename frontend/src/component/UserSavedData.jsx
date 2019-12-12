import React, { useState, useEffect } from 'react';
import { Card, Icon } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from 'react-bootstrap';
const { Meta } = Card;
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';




let IngredientComponent = ({ item, removeIngredient }) => {
  let clearClicked = () => {
    removeIngredient(item);
  };

  return (
    <Paper className="classes.paper" >
      <Grid container wrap="nowrap" style={{ alignItems: 'center', padding: '10px' }}>
        <Grid item xs>
          <Typography>{item}</Typography>
        </Grid>
        <ClearRoundedIcon onClick={clearClicked} />
      </Grid>
    </Paper>
  );
};

let RecipeComponent = ({ recipe, removeRecipe }) => {
  let clearClicked = () => {
    removeRecipe(recipe);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        style={{ width: 215 }}
        cover={<img alt="example" src={recipe.image} />}
        actions={[<Icon type="heart" onClick={clearClicked} />]}
        onClick={() => { setRecipeId(recipe.id); setRecipeIngredients(recipe.missedIngredients) }}  //move to the recipeDescription component
      >
        <Meta title={recipe.title} />
        <Badge variant="danger">{recipe.missedIngredients.length}</Badge>
        <Badge variant="success">{recipe.usedIngredients.length}</Badge>
      </Card>
    </Grid>
  );
};





const UserSavedData = () => {
  let [savedIngredients, setSavedIngredients] = useState(['a', 'b', 'c']);
  let [savedRecipes, setSavedRecipes] = useState('');

  //set values from database

  function removeIngredient(item) {
    let arr = savedIngredients.filter(i => i !== item);
    setSavedIngredients(arr);
  }

  ///?????
  function removeRecipe(item) {
    let arr = savedIngredients.filter(i => i.id !== item.id);
    setSavedRecipes(arr);
  }



  return (
    <div style={{ height: '100vh', display: savedRecipes ? 'block' : 'none' }}>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={4} style={{ height: '100%', backgroundColor: 'blue' }}>
          {savedIngredients ? savedIngredients.map(item => <IngredientComponent item={item} removeIngredient={removeIngredient} />) : <p>NOTHING WAS SAVED</p>}
        </Grid>
        <Grid item xs={8} style={{ height: '100%', backgroundColor: 'green' }}>
          {savedRecipes ? savedRecipes.map(recipe => <RecipeComponent recipe={recipe} removeRecipe={removeRecipe} />) : <p>NOTHING WAS SAVED</p>}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserSavedData;




