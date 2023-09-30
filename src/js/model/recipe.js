import { state } from './state';
import { getRecipe } from '../utils/services/recipes';

export const loadRecipe = async id => {
  const recipe = await getRecipe(id);
  state.recipe = recipe;
};
