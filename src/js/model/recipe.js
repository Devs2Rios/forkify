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
