import {
  ADD_BOOKMARK,
  LOAD_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK } from '../actions/types';

const INITIAL_STATE = {
  bookmarks: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return { ...state, [action.payload.title]: action.payload };
    case LOAD_BOOKMARK_SUCCESS:
      return action.payload;
    case REMOVE_BOOKMARK: {
      let newState = { ...state };
      delete newState[action.payload.title];
      return newState;
    }
    default:
      return state;
  }
};
