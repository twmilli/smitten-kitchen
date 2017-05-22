import {
CACHE_RECENT_IMG } from '../actions/types';

const INITIAL_STATE = {
  recentImg: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CACHE_RECENT_IMG:
      return action.payload;
    default:
      return state;
  }
};
