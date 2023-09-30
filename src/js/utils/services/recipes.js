import { endpoints } from '../config/endpoints';
import { fetchData } from '../helpers/fetchData';

export const getRecipe = async id => {
  const res = await fetchData(`${endpoints.recipes}/${id}`, 'Recipe not found');
  return res.recipe;
};

export const searchRecipes = async keyword => {
  const res = await fetchData(
    `${endpoints.recipes}?search=${keyword}`,
    'Recipes not found'
  );
  return res.recipes;
};
