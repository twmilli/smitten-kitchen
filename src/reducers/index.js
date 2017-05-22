import { combineReducers } from 'redux';
import RecipeReducer from './RecipeReducer';
import BookmarkReducer from './BookmarkReducer';
import RecentReducer from './RecentReducer';

export default combineReducers({
  recipes: RecipeReducer,
  bookmarks: BookmarkReducer,
  recentImg: RecentReducer
});
