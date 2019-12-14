import React, { useState, useEffect } from 'react';
import { getRecipeInstructions } from '../functions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../recipe.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    padding: '2vw',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    opacity: 0.9,
  },
}));

let Ingredients = ({ ingredients }) => {
  return (
    <div>
      <h3>INGREDIENTS</h3>
      {ingredients ? (
        ingredients.map((item, key) => {
          return (
            <p id={item.name} key={key}>
              <span className="amount">{item.amount} </span>
              <span className="unit">{item.unit} </span>
              <span className="name">{item.name} </span>
            </p>
          );
        })
      ) : (
          <div>NO INGREDIENTS YET</div>
        )}
    </div>
  );
};

let Instructions = ({ instructions }) => {
  return (
    <div>
      <h3>
        <a name="get-instructions">INSTRUCTIONS</a>
      </h3>
      <div style={{ textAlign: 'left' }}>
        {instructions ? (
          instructions.map((item, key) => <p key={key}>- {item}</p>)
        ) : (
            <div>NO INSTRUCTIONS YET</div>
          )}
      </div>
    </div>
  );
};

let RecipeDescription = ({ recipeId, recipeIngredients }) => {
  let [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (recipeId) {
      getRecipeInstructions(recipeId, setInstructions);
      console.log(recipeId);
    }
  }, [recipeId]);

  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: 'url(' + Image + ')',
        backgroundSize: 'cover',
        display: recipeId ? 'block' : 'none',
      }}
    >
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={4} style={{ paddingRight: '2vw' }}>
          <Paper className={classes.paper}>
            <Ingredients ingredients={recipeIngredients} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Instructions instructions={instructions} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeDescription;
