import { getRecipe } from './services';
import { loadingSpinner, recipeDetail } from './views';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////
const showRecipe = async () => {
  const { hash } = window.location,
    id = hash.slice(1);
  if (!id) return;
  try {
    loadingSpinner(recipeContainer);
    const recipe = await getRecipe(id);
    if (!recipe)
      throw new Error("We couldn't find that recipe. Please try again!");
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', recipeDetail(recipe));
  } catch (err) {
    console.error(err);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
