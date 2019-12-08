const fetch = require('node-fetch');

let apiKey = '699883d42efa4b0297fb8daccb5430aa';


async function getRecipeByIngredients(ingredentsArray, setRecipes) {
  let ingredientsString = ingredentsArray.join(',');
  let recipesList = await (await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsString}&number=10`)).json();
  let recipes = recipesList.map(recipe => {
    return {
      image: recipe.image,
      title: recipe.title,
      missedIngredients: recipe.missedIngredients,
      usedIngredients: recipe.usedIngredients,
      unusedIngredients: recipe.unusedIngredients,
      id: recipe.id,
    }
  });
  setRecipes(recipes);
}

async function optimizeIngredients(recipe) {
  let missedIngredientsArray = recipe.missedIngredients.map(item => item.name);
  let unusedIngredientsArray = recipe.unusedIngredients.map(item => item.name);
  let substitutesList = await Promise.all(await missedIngredientsArray.map(async (item) => await getSubstitute(item)));

  let replacable = substitutesList.map(missedItem => {
    //check if exists on sublist
    if (missedItem !== 'no substitute') {
      let substituteInUnused = 'no substitute';

      for (item of missedItem.substitutes) {
        let includes = 0;
        for (let i of item.substitute.name) {
          includes = unusedIngredientsArray.includes(i);
        }

        if (includes) {
          substituteInUnused = item;
          break;
        }
      }

      if (substituteInUnused !== 'no substitute') {
        return { name: missedItem.name, baseAmount: substituteInUnused.baseAmount, baseUnit: substituteInUnused.baseUnit, substitute: substituteInUnused.substitute }
      } else
        return 'no substitute'
    } else
      return 'no substitute'
  })

  let missedIngredients = recipe.missedIngredients.map(item => {
    return {
      amount: item.amount,
      unit: item.unit,
      name: item.name,
      image: item.image,
      id: item.id,
      type: 'missed',
    }
  })

  let usedIngredients = recipe.usedIngredients.map(item => {
    return {
      amount: item.amount,
      unit: item.unit,
      name: item.name,
      image: item.image,
      id: item.id,
      type: 'used',
    }
  })

  let removedAndReplaced = {};
  for (let item of replacable) {
    if (item !== 'no substitute') {

      let index = missedIngredientsArray.indexOf(item.name);
      let sourceUnit = missedIngredients[index].unit;
      let sourceAmount = missedIngredients[index].amount;

      console.log(sourceUnit, sourceAmount, item.baseUnit);

      let targetConversion = await (await fetch(`https://api.spoonacular.com/recipes/convert?apiKey=${apiKey}ingredientName=${item.name}&sourceAmount=${sourceAmount}&sourceUnit=${sourceUnit}&targetUnit=${item.baseUnit}`)).json();
      let mult = sourceAmount;
      if (targetConversion.targetAmount) {
        mult = targetConversion.targetAmount
      }

      let replacement = {};
      replacement.name = item.substitute.name.join(',');
      replacement.unit = item.substitute.unit.join(',');
      replacement.amount = Number(mult) * Number(item.substitute.amount) / Number(item.baseAmount);
      replacement.image = '';
      replacement.id = '';
      replacement.type = 'used';
      usedIngredients.push(replacement);
      removedAndReplaced = { removed: missedIngredients.splice(index, 1), replaced: replacement.name };
    }
  }
  return { used: usedIngredients, missed: missedIngredients, removed: removedAndReplaced.removed, replaced: removedAndReplaced.replaced };
}
/// WORKS
async function getSubstitute(missedIngredient) {
  let data = await (await fetch(`https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${apiKey}&ingredientName=${missedIngredient}`)).json();
  if (data.status === "success") {
    let obj = {
      name: missedIngredient,
      substitutes: analyzeSubstitutesList(data.substitutes),
    }
    return obj;
  }
  else {
    return 'no substitute'
  }
}
/// WORKS
function analyzeSubstitutesList(substitutesList) {
  if (substitutesList) {
    let analyzedSubstitutes = substitutesList.map(item => {

      let arr = item.split(' = ');
      let words = arr[0].split(' ');
      let subObj = {
        baseAmount: words[0],
        baseUnit: words[1],
        substitute: '',
      }

      if (arr[1].includes(' and ') || arr[1].includes(' + ')) {
        let arr2 = arr[1].includes(' and ') ? arr[1].split(' and ') : arr[1].split(' + ');
        let amount = [];
        let name = [];
        let unit = [];

        arr2.map(item => {
          let words = item.split(' ');
          amount.push(words.splice(0, 1));
          unit.psuh(words.splice(0, 1))
          name.push(words.join(' '));
        })

        subObj.substitute = { amount: amount, unit: unit, name: name };
      }
      else {
        let words = arr[1].split(' ');
        subObj.substitute = { amount: [words.splice(0, 1)], unit: [words.splice(0, 1)], name: [words.join(' ')] }
      }
      return subObj;
    })
    return analyzedSubstitutes;
  }
}

/// WORKS P4
async function getRecipeInstructions(recipeId) {

  let data = await (await fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`)).json();
  let instructions = data[0].steps.map(item => item.step)

  return instructions;
}


export { getRecipeByIngredients, getRecipeInstructions, optimizeIngredients };