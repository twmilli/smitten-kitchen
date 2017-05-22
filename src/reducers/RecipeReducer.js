import {
  SEARCH_SUCCESS,
  GET_RECIPES,
  RESET_RECIPES,
  SEARCH_FAIL,
  SELECT_RECIPE } from '../actions/types';

const INITIAL_STATE = {
  recipeList: [],
  loading: false,
  error: '',
  selectedRecipe: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { ...state, recipeList: action.payload, loading: false, error: '' };
    case GET_RECIPES:
      return { ...state, loading: true, error: '' };
    case RESET_RECIPES:
      return { ...state, recipeList: [], loading: false, error: '', selectedRecipe: {} };
    case SELECT_RECIPE:
      return { ...state, selectedRecipe: action.payload, loading: false, error: '' };
    case SEARCH_FAIL:
      return {
        ...state,
        recipeList: [],
        loading: false,
        error: 'Error retreiving recipes, please try again.'
      };
    default:
      return state;
  }
};
