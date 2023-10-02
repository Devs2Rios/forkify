import { state, loadRecipe, loadSearchRecipes } from './model';
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
    recipeDetail.isError = false;
    recipeDetail.render(state.recipe);
  } catch (err) {
    recipeDetail.isError = true;
    recipeDetail.renderMessage(err.message);
  }
};

const controlSearchRecipes = async query => {
  try {
    searchResults.loadSpinner();
    await loadSearchRecipes(query);
    if (!state.recipes || !state.recipes.length)
      throw new Error('No recipes found. Please try again!');
    searchResults.isError = false;
    searchResults.render({ recipes: state.recipes });
    window.location.hash = '#' + state.recipes[0].id;
  } catch (err) {
    searchResults.isError = true;
    searchResults.renderMessage(err.message);
  }
};

const init = () => {
  recipeDetail.renderMessage(
    'Start by searching for a recipe or an ingredient. Have fun!'
  );
  // Publisher-subscriber pattern implemented
  const query = searchResults.actionHandlers.getQuery(controlSearchRecipes);
  recipeDetail.renderHandler(['hashchange', 'load'], controlRecipe);
};

init();
