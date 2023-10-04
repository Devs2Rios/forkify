import { state } from './state';
import { getRecipe, searchRecipes } from '../utils/services/recipes';

export const loadRecipe = async id => {
  const recipe = await getRecipe(id);
  state.recipe = recipe;
};

export const loadSearchRecipes = async query => {
  const recipes = await searchRecipes(query);
  state.recipes = recipes;
};

export const getSearchRecipesPage = (page = state.page) => {
  state.page = page;
  state.totalPages = Math.ceil(state.recipes.length / state.recipesPerPage);
  const { recipesPerPage: rpp } = state;
  const [start, end] = [(page - 1) * rpp, page * rpp];
  return { page, recipes: state.recipes.slice(start, end) };
};
