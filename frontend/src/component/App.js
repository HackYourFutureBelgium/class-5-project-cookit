import React, { useState, useEffect } from 'react';
import FirstSection from './FirstSection';
import MainMenu from "./MainMenu"
import Main from './Main';
import RecipeDetails from './RecipeDetails';
import UserSavedData from './UserSavedData'
import background from '../backgroundvertical.jpg';

import '../App.css'


let App = () => {
  let [recipeId, setRecipeId] = useState('');
  let [recipeIngredients, setRecipeIngredients] = useState('');
  let [savedRecipes, setSavedRecipes] = useState([]);
  let [savedIngredients, setSavedIngredients] = useState('');

  return (
    <>
      <MainMenu />
      <FirstSection />
      <div style={{
        backgroundImage: 'url(' + background + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        maxHeight: '100%',
        backgroundRepeat: 'no-repeat',
      }}>
        <Main setRecipeId={setRecipeId} setRecipeIngredients={setRecipeIngredients} setSavedRecipes={setSavedRecipes} savedRecipes={savedRecipes} />
        <RecipeDetails recipeId={recipeId} recipeIngredients={recipeIngredients} />
        <UserSavedData savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes} />
      </div>
    </>
  );
}


export default App;
