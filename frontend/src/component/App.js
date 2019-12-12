import React, { useState, useEffect } from 'react';
import FirstSection from './FirstSection';
import MainMenu from "./MainMenu"
import Main from './Main';
import RecipeDetails from './RecipeDetails';
import UserSavedData from './UserSavedData'
import '../App.css'


let App = () => {
  let [recipeId, setRecipeId] = useState('');
  let [recipeIngredients, setRecipeIngredients] = useState('');

  return (
    <>
      <MainMenu />
      <FirstSection />
      <Main setRecipeId={setRecipeId} setRecipeIngredients={setRecipeIngredients} />
      <RecipeDetails recipeId={recipeId} recipeIngredients={recipeIngredients} />
      <UserSavedData />
    </>
  );
}


export default App;
