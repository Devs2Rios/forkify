import { state, loadRecipe, loadSearchRecipes } from './model';
import { recipeDetail, recipesMessage, searchResults } from './view';

const controlRecipe = async () => {
  const { hash } = window.location,
    id = hash.slice(1);
  if (!id) return;
  try {
    recipeDetail.loadSpinner();
    await loadRecipe(id);
    recipesMessage.isError = false;
    recipeDetail.render(state.recipe);
  } catch (err) {
    recipesMessage.isError = true;
    recipesMessage.render(err);
  }
};

const controlSearchRecipes = async query => {
  try {
    searchResults.loadSpinner();
    await loadSearchRecipes(query);
    if (!state.recipes || !state.recipes.length)
      throw new Error('No recipes found. Please try again!');
    recipesMessage.isError = false;
    searchResults.render({ recipes: state.recipes });
    window.location.hash = '#' + state.recipes[0].id;
  } catch (err) {
    recipesMessage.isError = true;
    recipesMessage.render(err);
  }
};

const init = () => {
  recipesMessage.render({
    message: 'Start by searching for a recipe or an ingredient. Have fun!',
  });
  // Publisher-subscriber pattern implemented
  searchResults.actionHandler('submit', async function (e) {
    e.preventDefault();
    const query = searchResults.getQuery(e.target);
    await controlSearchRecipes(query);
  });
  recipeDetail.renderHandler(['hashchange', 'load'], controlRecipe);
};

init();
