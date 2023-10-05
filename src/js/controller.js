import {
  state,
  loadRecipe,
  loadSearchRecipes,
  getSearchRecipesPage,
  updateServings,
  addBookmark,
  deleteBookmark,
} from './model';
import { recipeDetail, searchResults, pagination, bookmarkList } from './view';

/* 
if (module.hot) {
  module.hot.accept();
}
*/

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
    pagination.render({
      currentPage: state.page,
      totalPages: state.totalPages,
    });
  } catch (err) {
    searchResults.renderMessage(err.message, true);
  }
};

const controlRecipeClick = id => {
  searchResults.update(getSearchRecipesPage(state.page));
};

const controlPagination = goToPage => {
  searchResults.render(getSearchRecipesPage(goToPage));
  state.page = goToPage;
  pagination.render({
    currentPage: state.page,
    totalPages: state.totalPages,
  });
};

const controlServings = servings => {
  updateServings(servings);
  recipeDetail.update(state.recipe);
};

const controlBookmark = () => {
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);
  recipeDetail.update(state.recipe);
  bookmarkList.render(state.bookmarks);
};

const init = () => {
  recipeDetail.renderMessage(
    'Start by searching for a recipe or an ingredient. Have fun!'
  );
  bookmarkList.render(state.bookmarks);
  // Publisher-subscriber pattern implemented
  searchResults.actionHandlers.getQuery(controlSearchRecipes);
  searchResults.actionHandlers.setActiveRecipe(controlRecipeClick);
  pagination.actionHandlers.handlePagination(controlPagination);
  recipeDetail.actionHandlers.handleServings(controlServings);
  recipeDetail.actionHandlers.handleBookmark(controlBookmark);
  recipeDetail.renderHandler(['hashchange', 'load'], controlRecipe);
};

init();
