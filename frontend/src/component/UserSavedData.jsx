import React, { useState, useEffect } from 'react';
import { Card, Icon } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from 'react-bootstrap';
const { Meta } = Card;
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import background from '../background.jpg';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    padding: '2vw',
    /* backgroundImage: 'url(' + background + ')',
     backgroundSize: 'cover',
     backgroundPosition: 'bottom',
     maxWidth: '100%',
     backgroundRepeat: 'no-repeat',*/
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#009000',
    height: '70vh',
    overflowY: 'scroll',
    opacity: 0.9,
  },
}));




const UserSavedData = ({ savedRecipes, setSavedRecipes }) => {
  let [savedIngredients, setSavedIngredients] = useState([]);


  let recipeToDatabse = (recipe) => {
    if (includes(recipe)) {
      let new_arr = savedRecipes.filter(item => item.id != recipe.id)
      setSavedRecipes(new_arr);
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  }

  function includes(rec) {
    let savedRecipeIds = savedRecipes ? savedRecipes.map(item => item.id) : [];
    return savedRecipeIds.includes(rec.id)
  }
  const classes = useStyles();

  return (
    <Container className={classes.root} style={{ display: savedRecipes ? 'block' : 'none', }}>
      <h4
        style={{
          backgroundColor: '#D0001B',
          padding: '1px',
          borderRadius: 20,
          textAlign: 'center',
          color: '#FFFFFF',
          width: '30%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        SAVED RECIPES
      </h4>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={6}
          style={{ height: '100%', overflow: 'auto', paddingTop: '0', marginTop: '0', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {savedRecipes[0] ? (
            savedRecipes.map((recipe, key) => {
              return (
                <Grid item xs={3} sm={3} md={3} lg={3} key={key}>
                  <Card
                    style={{ width: 215 }}
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
                    <Badge variant="">{recipe.missedIngredients.length + recipe.usedIngredients.length}</Badge>
                  </Card>
                </Grid>
              );
            })
          ) : (
              <div>YOU HAVENT SAVED ANY RECIPES</div>
            )}
        </Grid>
      </Paper>
    </Container >
  );
};

export default UserSavedData;




