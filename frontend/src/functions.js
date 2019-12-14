const fetch = require('node-fetch');
const convert = require('convert-units');

let apiKey = 'b4de2c0484f94d2d9480cb6f2cc6fe9a'; //'699883d42efa4b0297fb8daccb5430aa';



async function getRecipeByIngredients(ingredentsArray, setRecipes) {
  let ingredientsString = ingredentsArray.join(',');
  let recipesList = await (await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsString}&number=10`)).json();
  let recipes = [];
  if (recipesList.code !== 402) {

    recipes = recipesList.map(recipe => {

      //let substitutesListArray = await Promise.all(recipe.missedIngredients.map(async (item) => await getSubstitute(item.name, item.unitShort, item.amount)));
      return {
        image: recipe.image,
        title: recipe.title,
        missedIngredients: recipe.missedIngredients,
        usedIngredients: recipe.usedIngredients,
        //substitutes: substitutesListArray,
        id: recipe.id,
      }
    });
  }
  setRecipes(recipes);
}

/// WORKS
async function getSubstitute(missedIngredient, missedUnit, missedAmount) {
  let data = await (await fetch(`https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${apiKey}&ingredientName=${missedIngredient}`)).json();
  if (data.status === "success") {
    return analyzeSubstitutes(data.substitutes, missedUnit, missedAmount);
  }
  else {
    return 'no substitute'
  }
}
/// WORKS
function analyzeSubstitutes(substitutesList, missedUnit, missedAmount) {
  if (substitutesList) {
    let analyzedSubstitutes = substitutesList.map(item => {

      let arr = item.split(' = ');
      let words = arr[0].split(' ');
      let subObj = {
        baseAmount: words[0],
        baseUnit: words[1],
        substitute: '',
      }

      let mainAmount = missedAmount;

      if (missedUnit == 'Tbsp')
        missedUnit = 'Tbs'
      if (missedUnit == 'serving' || missedUnit == 'servings')
        missedUnit = ''

      if (missedUnit)
        mainAmount = convert(eval(missedAmount)).from(missedUnit).to(subObj.baseUnit);

      if (arr[1].includes(' and ') || arr[1].includes(' + ')) {
        let arr2 = arr[1].includes(' and ') ? arr[1].split(' and ') : arr[1].split(' + ');
        let amount = [];
        let name = [];
        let unit = [];

        arr2.map(item => {
          let words = item.split(' ');
          let subAmount = words.splice(0, 1)[0];
          let subUnit = words.splice(0, 1)[0];

          subAmount = eval(subAmount) / eval(subObj.baseAmount) * eval(mainAmount);
          if (!missedUnit)
            subUnit = "";


          amount.push(subAmount);
          unit.push(subUnit);
          name.push(words.join(' '));
        })

        subObj.substitute = { amount: amount.join(','), unit: unit.join(','), name: name.join(',') };
      }
      else {
        let words = arr[1].split(' ');
        let subAmount = words.splice(0, 1)[0];
        let subUnit = words.splice(0, 1)[0];

        subAmount = eval(subAmount) / eval(subObj.baseAmount) * eval(mainAmount);
        if (!missedUnit)
          subUnit = "";

        subObj.substitute = { amount: subAmount, unit: subUnit, name: words.join(' ') }
      }
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


export { getRecipeByIngredients, getRecipeInstructions };
