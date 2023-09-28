import endpoints from './endpoints';
import { fetchData } from './utils';

export const getRecipeByKeyword = async keyword =>
  await fetchData(`${endpoints.recipes}?search=${keyword}`);
