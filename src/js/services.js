import endpoints from './endpoints';
import { fetchData } from './utils';

export const getRecipe = async id => {
  const res = await fetchData(`${endpoints.recipes}/${id}`);
  if (!res.recipe) throw new Error('Recipe not found');
  return res.recipe;
};

export const searchRecipes = async keyword => {
  const res = await fetchData(`${endpoints.recipes}?search=${keyword}`);
  if (!res.recipes) throw new Error('Recipes not found');
  return res.recipes;
};
