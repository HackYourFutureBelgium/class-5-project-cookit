import React, { useState, useEffect } from 'react';
import { Card, Icon } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from 'react-bootstrap';
const { Meta } = Card;
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const Recipes = ({ recipes, setRecipeId, setRecipeIngredients, setSavedRecipes, savedRecipes }) => {

  let recipeToDatabse = (recipe) => {
    if (includes(recipe)) {
      let new_arr = savedRecipes.filter(item => item.id != recipe.id)
      setSavedRecipes(new_arr);
    } else {
      //let new_arr = savedRecipes;
      //new_arr.push(recipe);
      setSavedRecipes([...savedRecipes, recipe]);
    }
  }

  function includes(rec) {
    let savedRecipeIds = savedRecipes ? savedRecipes.map(item => item.id) : [];
    return savedRecipeIds.includes(rec.id)
  }

  return (
    <>
      <Container
        style={{
          height: '100%',
          padding: 0,
        }}
      >
        <Grid
          container
          spacing={6}
          style={{
            height: '92%', overflow: 'auto', padding: '0', margin: '0', marginTop: '2%', width: '100%',
          }}
        >
          {recipes ? (
            recipes.map((recipe, key) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={key} >
                  <Card
                    style={{ width: 215, margin: 'auto' }}
                    cover={<img alt="example" src={recipe.image} />}
                    actions={[
                      <Icon
                        type="heart"
                        theme={includes(recipe) ? 'filled' : ''}
                        style={{ color: includes(recipe) ? 'red' : 'grey' }}
                        onClick={() => { recipeToDatabse(recipe) }}
                      />,
                      <a href="#get-instructions">
                        <Icon
                          type="double-right"
                          onClick={() => {
                            setRecipeId(recipe.id);
                            setRecipeIngredients([recipe.usedIngredients, recipe.missedIngredients]);

                          }} />
                      </a>,
                    ]}
                  >
                    <Meta title={recipe.title} />
                    <Badge variant="danger">{recipe.missedIngredients.length}</Badge>
                    <Badge variant="success">{recipe.usedIngredients.length}</Badge>
                  </Card>
                </Grid>
              );
            })
          ) : (
              <div style={{ margin: 'auto' }}>PLEASE TYPE IN INGREDIENTS</div>
            )}
        </Grid>
      </Container>
    </>
  );
};

export default Recipes;