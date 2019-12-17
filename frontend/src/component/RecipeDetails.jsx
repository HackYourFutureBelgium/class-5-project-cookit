import React, { useState, useEffect } from 'react';
import { getRecipeInstructions, getSubstituteList } from '../functions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import background from '../background.jpg';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    padding: '2vw',
    /*backgroundImage: 'url(' + background + ')',
      backgroundSize: 'cover',
      display: 'block', //recipeId ? 'block' : 'none',
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

let Ingredients = ({ ingredients, substitutes }) => {
  const classes = useStyles();
  return (
    <div>
      <h4
        style={{
          backgroundColor: '#D0001B',
          padding: '1px',
          borderRadius: 20,
          textAlign: 'center',
          color: '#FFFFFF',
        }}
      >
        INGREDIENTS
  </h4>
      <Paper className={classes.paper}>
        <div
          className="usedIngredients"
          style={{
            margin: '3px',

          }}
        >
          {ingredients[0] ? (
            ingredients[0].map((item, key) => {
              return (
                <p
                  id={item.name}
                  key={key}
                  style={{
                    color: '#009000',
                  }}
                >
                  <span className="amount">{item.amount} </span>
                  <span className="unit">{item.unit} </span>
                  <span className="name">{item.name} </span>
                </p>
              );
            })
          ) : (
              <p
                style={{
                  color: '#009000',
                }}
              >
                NO USED INGREDIENTS YET
        </p>
            )}
        </div>
        <div className="missedIngredients" style={{}}>
          {ingredients[1] ? (
            ingredients[1].map((item, key) => {
              return (
                <>
                  <p
                    id={item.name}
                    key={key}
                    style={{
                      color: '#D0001B',
                    }}
                  >
                    <span className="amount">{item.amount} </span>
                    <span className="unit">{item.unit} </span>
                    <span className="name">{item.name} </span>
                  </p>
                  {substitutes[key] != 'no substitute' ?
                    <p
                      style={{
                        color: '#F5C71A',
                      }}
                    >
                      <span> | </span> <span>{substitutes[key]}</span> <span> | </span>
                    </p>
                    : null}
                </>
              );
            })
          ) : (
              <p
                style={{
                  color: '#D0001B',
                }}
              >
                NO MISSED INGREDIENTS YET
        </p>
            )}
        </div>
      </Paper>
    </div>
  );
};
let Instructions = ({ instructions }) => {
  const classes = useStyles();
  return (
    <div>
      <h4
        style={{
          backgroundColor: '#D0001B',
          padding: '1px',
          borderRadius: 20,
          textAlign: 'center',
          color: '#FFFFFF',
        }}
      >
        INSTRUCTIONS
      </h4>
      <Paper className={classes.paper}>
        {instructions ? (
          instructions.map((item, key) => <p key={key}>- {item}</p>)
        ) : (
            <div
              style={{
                color: '#009000',
              }}
            >
              NO INSTRUCTIONS YET
      </div>
          )}
      </Paper>
    </div>
  );
};
let RecipeDescription = ({ recipeId, recipeIngredients }) => {
  let [instructions, setInstructions] = useState('');
  let [substitutes, setSubstitutes] = useState('');
  useEffect(() => {
    if (recipeId) {
      getRecipeInstructions(recipeId, setInstructions);
      getSubstituteList(recipeIngredients[1], setSubstitutes);
    }
  }, [recipeId]);
  const classes = useStyles();
  return (
    <>
      <a name="get-instructions"></a>
      <Container className={classes.root}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={4} style={{ paddingRight: '2vw' }}>
            <Ingredients ingredients={recipeIngredients} substitutes={substitutes} />
          </Grid>
          <Grid item xs={8}>
            <Instructions instructions={instructions} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default RecipeDescription;
