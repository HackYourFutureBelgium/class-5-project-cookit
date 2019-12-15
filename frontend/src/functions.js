const fetch = require('node-fetch');
const convert = require('convert-units');
const react = require('react');

let apiKey = '5056159cedfd4b88b2e309152dabbc6c';//'b4de2c0484f94d2d9480cb6f2cc6fe9a'; //'699883d42efa4b0297fb8daccb5430aa';


async function getRecipeByIngredients(ingredentsArray, setRecipes) {
  let ingredientsString = ingredentsArray.join(',');
  let recipesList = await (await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsString}&number=9`)).json();
  let recipes = [];
  if (recipesList.code !== 402) {

    recipes = recipesList.map(recipe => {
      return {
        image: recipe.image,
        title: recipe.title,
        missedIngredients: recipe.missedIngredients,
        usedIngredients: recipe.usedIngredients,
        id: recipe.id,
      }
    });
  }

  setRecipes(recipes);
}

async function getSubstituteList(missedIngredients, setSubstitutes) {
  let substitutesListArray = await Promise.all(missedIngredients.map(async (item) => await getSubstitute(item.name, item.unitShort, item.amount)));
  console.log("THIS ", substitutesListArray);
  setSubstitutes(substitutesListArray);
}




/// WORKS
async function getSubstitute(missedIngredient, missedUnit, missedAmount) {
  let data = await (await fetch(`https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${apiKey}&ingredientName=${missedIngredient}`)).json();
  if (data.status === "success") {
    let a = analyzeSubstitutes(data.substitutes, missedUnit, missedAmount, missedIngredient);
    return a;
  }
  else {
    return 'no substitute'
  }
}
/// WORKS
function analyzeSubstitutes(substitutesList, missedUnit, missedAmount, missedIngredient) {
  if (substitutesList) {
    let analyzedSubstitutes = substitutesList.map((item) => {


      let arr = item.split(' = ');
      let words = arr[0].split(' ');
      let subObj = {
        baseAmount: words[0],
        baseUnit: words[1],
        substitute: '',
      }
      let mainAmount = missedAmount;

      // if (missedUnit != subObj.baseUnit && missedUnit != "") {
      //   let target = await (await fetch(`https://api.spoonacular.com/recipes/convert?apiKey=${apiKey}&ingredientName=${missedIngredient}&sourceAmount=${missedAmount}&sourceUnit=${missedUnit}&targetUnit=${subObj.baseUnit}`)).json()
      //   mainAmount = target.targetAmount ? target.targetAmount : missedAmount;
      // }

      if (arr[1].includes(' and ') || arr[1].includes(' + ')) {
        let arr2 = arr[1].includes(' and ') ? arr[1].split(' and ') : arr[1].split(' + ');
        let m_arr = [];

        arr2.map(item => {
          let words = item.split(' ');
          let subAmount = words.splice(0, 1)[0];
          let subUnit = words.splice(0, 1)[0];

          if (parseInt(subAmount)) { subAmount = eval(subAmount) / eval(subObj.baseAmount) * eval(mainAmount); }
          if (!missedUnit)
            subUnit = "";

          m_arr.push(subAmount);
          m_arr.push(' ');
          m_arr.push(subUnit);
          m_arr.push(' ');
          m_arr.push(words.join(' '));
          m_arr.push(' ');
          m_arr.push('and')
          m_arr.push(' ');
        })
        m_arr.pop();
        m_arr.pop();
        subObj.substitute = m_arr;
      }
      else {
        let words = arr[1].split(' ');
        let subAmount = words.splice(0, 1)[0];
        let subUnit = words.splice(0, 1)[0];

        if (parseInt(subAmount)) { subAmount = eval(subAmount) / eval(subObj.baseAmount) * eval(mainAmount); }
        if (!missedUnit)
          subUnit = "";

        subObj.substitute = [subAmount, ' ', subUnit, ' ', words.join(' ')];
      }

      subObj.substitute.push('<br />');
      return subObj.substitute;
    })

    return analyzedSubstitutes;
  }
}

/// WORKS P4
async function getRecipeInstructions(recipeId, setInstructions) {

  let data = await (await fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`)).json();
  let instructions = data[0] ? data[0].steps.map(item => item.step) : ['NO INSTRUCTION FOUND']
  setInstructions(instructions);
}


export { getRecipeByIngredients, getRecipeInstructions, getSubstituteList };