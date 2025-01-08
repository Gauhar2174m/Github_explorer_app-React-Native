

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const addToFavorites = (repo) => ({
  type: ADD_TO_FAVORITES,  // Ensure the type is defined correctly
  payload: repo,
});

export const removeFromFavorites = (repo) => ({
  type: REMOVE_FROM_FAVORITES,  // Ensure the type is defined correctly
  payload: repo,
});
