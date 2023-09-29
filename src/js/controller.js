import { state, loadRecipe } from './model';
import { loadingSpinner, recipeDetail, recipesError } from './views';

const recipeContainer = document.querySelector('.recipe');

[loadingSpinner, recipeDetail, recipesError].forEach(view =>
  view.setParentElement(recipeContainer)
);

const controlRecipes = async () => {
  const { hash } = window.location,
    id = hash.slice(1);
  if (!id) return;
  try {
    loadingSpinner.render();
    await loadRecipe(id);
    recipeDetail.render(state.recipe);
  } catch (err) {
    recipesError.render(err);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
