import endpoints from './endpoints';
import { fetchData } from './utils';

export const getRecipe = async id => {
  const { recipe } = await fetchData(`${endpoints.recipes}/${id}`);
  return recipe;
};

export const searchRecipes = async keyword => {
  const { recipes } = await fetchData(`${endpoints.recipes}?search=${keyword}`);
  return recipes;
};
