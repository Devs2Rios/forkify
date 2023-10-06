import { endpoints, apiKey } from '../config';
import { fetchData } from '../helpers';

export const getRecipe = async id => {
  const res = await fetchData(
    `${endpoints.recipes}/${id}?key=${apiKey}`,
    {},
    'Recipe not found'
  );
  return res.recipe;
};

export const searchRecipes = async keyword => {
  const res = await fetchData(
    `${endpoints.recipes}?search=${keyword}&key=${apiKey}`,
    {},
    'Recipes not found'
  );
  return res.recipes;
};

export const postRecipe = async recipe => {
  const res = await fetchData(
    `${endpoints.recipes}?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    },
    'There was a problem creating the recipe, please refresh the page and try again'
  );
  return res.recipe;
};
