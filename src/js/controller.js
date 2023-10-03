import {
  state,
  loadRecipe,
  loadSearchRecipes,
  getSearchRecipesPage,
} from './model';
import { recipeDetail, searchResults } from './view';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async () => {
  const { hash } = window.location,
    id = hash.slice(1);
  if (!id) return;
  try {
    recipeDetail.loadSpinner();
    await loadRecipe(id);
    recipeDetail.render(state.recipe);
  } catch (err) {
    recipeDetail.renderMessage(err.message, true);
  }
};

const controlSearchRecipes = async query => {
  try {
    searchResults.loadSpinner();
    await loadSearchRecipes(query);
    if (!state.recipes || !state.recipes.length)
      throw new Error('No recipes found. Please try again!');
    searchResults.render(getSearchRecipesPage());
  } catch (err) {
    searchResults.renderMessage(err.message, true);
  }
};

const init = () => {
  recipeDetail.renderMessage(
    'Start by searching for a recipe or an ingredient. Have fun!'
  );
  // Publisher-subscriber pattern implemented
  searchResults.actionHandlers.getQuery(controlSearchRecipes);
  searchResults.actionHandlers.setActiveRecipe();
  recipeDetail.renderHandler(['hashchange', 'load'], controlRecipe);
};

init();
