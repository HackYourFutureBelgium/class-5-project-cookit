import React, { useState, useEffect } from 'react';
import { getRecipeInstructions, getSubstituteList } from '../functions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
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


let Ingredients = ({ ingredients, substitutes }) => {
  return (
    <div>
      <h3>INGREDIENTS</h3>
      <div style={{ overflow: 'scroll', height: '70vh' }}>
        <div className="usedIngredients" style={{ backgroundColor: 'green' }}>
          {ingredients[0] ? (
            ingredients[0].map((item, key) => {
              return (
                <p id={item.name} key={key}>
                  <span className="amount">{item.amount} </span>
                  <span className="unit">{item.unit} </span>
                  <span className="name">{item.name} </span>
                </p>
              );
            })
          ) : (
              <p>NO USED INGREDIENTS YET</p>
            )}
        </div>
        <div className="missedIngredients" style={{ backgroundColor: 'red' }}>
          {ingredients[1] ? (
            ingredients[1].map((item, key) => {
              return (
                <>
                  <p id={item.name} key={key}>
                    <span className="amount">{item.amount} </span>
                    <span className="unit">{item.unit} </span>
                    <span className="name">{item.name} </span>
                  </p>
                  {
                    substitutes[key] != 'no substitute' ?
                      <p style={{ backgroundColor: 'blue' }}><span>{substitutes[key]}</span></p>
                      : null
                  }

                </>
              );
            })
          ) : (
              <p>NO MISSED INGREDIENTS YET</p>
            )}
        </div>
      </div>
    </div>
  );
};

let Instructions = ({ instructions }) => {
  return (
    <div>
      <h3>
        <a name="get-instructions">INSTRUCTIONS</a>
      </h3>
      <div style={{ textAlign: 'left', overflow: 'scroll', height: '70vh' }}>
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
  let [substitutes, setSubstitutes] = useState('')

  useEffect(() => {
    if (recipeId) {
      getRecipeInstructions(recipeId, setInstructions);
      getSubstituteList(recipeIngredients[1], setSubstitutes);
    }
  }, [recipeId]);

  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: 'url(' + Image + ')',
        backgroundSize: 'cover',
        display: 'block' //recipeId ? 'block' : 'none',
      }}
    >
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={4} style={{ paddingRight: '2vw' }}>
          <Paper className={classes.paper}>
            {console.log('ING')}
            <Ingredients ingredients={recipeIngredients} substitutes={substitutes} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            {console.log('INST')}
            <Instructions instructions={instructions} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeDescription;
