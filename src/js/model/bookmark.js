import { state } from './state';

export const loadBookmarks = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
