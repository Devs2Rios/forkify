import { state, loadRecipe } from './model';
import { loadingSpinner, recipeDetail, recipesMessage } from './views';

recipesMessage.render({
  message: 'Start by searching for a recipe or an ingredient. Have fun!',
});

const controlRecipe = async () => {
  const { hash } = window.location,
    id = hash.slice(1);
  if (!id) return;
  try {
    loadingSpinner.render();
    await loadRecipe(id);
    recipeDetail.isError = false;
    recipeDetail.render(state.recipe);
  } catch (err) {
    recipesMessage.isError = true;
    recipesMessage.render(err);
  }
};

const init = () => {
  // Publisher-subscriber pattern implemented
  recipeDetail.renderHandler(['hashchange', 'load'], controlRecipe);
};

init();
