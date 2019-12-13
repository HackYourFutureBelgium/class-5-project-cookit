import React, { useState, useEffect } from 'react';
import { Card, Icon } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from 'react-bootstrap';
const { Meta } = Card;
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const Recipes = ({ recipes, setRecipeId, setRecipeIngredients }) => {
  return (
    <>
      <CssBaseline />
      <Container
        style={{
          padding: 'auto',
          height: '100%',
        }}
      >
        <Grid
          container
          spacing={6}
          style={{ height: '100%', overflow: 'auto', paddingTop: '0', marginTop: '0' }}
        >
          {recipes ? (
            recipes.map((recipe, key) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={key}>
                  <Card
                    style={{ width: 215 }}
                    cover={<img alt="example" src={recipe.image} />}
                    actions={[
                      <Icon type="heart" />,
                      <a href="#get-instructions">
                        <Icon type="double-right" />
                      </a>,
                    ]}
                    onClick={() => {
                      setRecipeId(recipe.id);
                      setRecipeIngredients(recipe.missedIngredients);
                    }} //move to the recipeDescription component
                  >
                    <Meta title={recipe.title} />
                    <Badge variant="danger">{recipe.missedIngredients.length}</Badge>
                    <Badge variant="success">{recipe.usedIngredients.length}</Badge>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <div>PLEASE TYPE IN INGREDIENTS</div>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Recipes;
