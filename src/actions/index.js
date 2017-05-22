import { AsyncStorage } from 'react-native';
import { SEARCH_SUCCESS,
  GET_RECIPES,
  RESET_RECIPES,
  SEARCH_FAIL,
  SELECT_RECIPE,
  ADD_BOOKMARK,
  LOAD_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK,
  CACHE_RECENT_IMG } from './types';

export const searchFullText = (searchTerm) => {
  return (dispatch) => {
    dispatch({ type: GET_RECIPES });
    const url = `RECIPE_API_URL/fullsearch/${searchTerm}`;
    getRecipes(url)
    .then((json) => {
      dispatch({ type: SEARCH_SUCCESS, payload: json });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: SEARCH_FAIL });
    });
  };
};

const timeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
};

const getRecipes = (url) => {
  const MAX_WAITING_TIME = 20000;
  return (timeout(MAX_WAITING_TIME, fetch(url) // eslint-disable-line
  .then((res) => res.json())
  .catch((err) => {
    return (err);
  })));
};

export const searchByTag = (tag) => {
  return (dispatch) => {
    dispatch({ type: GET_RECIPES });
    let url = `RECIPE_API_URL/?tags=${tag}`;
    if (tag === 'Weeknight Favorites') {
      url = `RECIPE_API_URL/fullsearch/${tag}`;
    }
    getRecipes(url).then((json) => {
      dispatch({ type: SEARCH_SUCCESS, payload: json });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: SEARCH_FAIL });
    });
  };
};

export const getRecent = () => {
  return (dispatch) => {
    dispatch({ type: GET_RECIPES });
    const url = 'RECIPE_API_URL/recent';
    getRecipes(url).then((json) => {
      dispatch({ type: SEARCH_SUCCESS, payload: json });

    AsyncStorage.setItem('recentImg', JSON.stringify({ uri: json[0].img }))
      .then(() => dispatch({ type: CACHE_RECENT_IMG, payload: { uri: json[0].img } }));
    }).catch((err) => {
      console.log(err);
      dispatch({ type: SEARCH_FAIL });
    });
  };
};

export const getRandom = () => {
  return (dispatch) => {
    const url = 'RECIPE_API_URL/random';
    dispatch({ type: GET_RECIPES });
    getRecipes(url).then((json) => {
      dispatch(selectRecipe({ recipe: json[0] }));
    }).catch((err) => {
      console.log(err);
      dispatch({ type: SEARCH_FAIL });
    });
  };
};

export const resetRecipes = () => {
  return { type: RESET_RECIPES };
};

export const selectRecipe = ({ recipe }) => {
  return { type: SELECT_RECIPE, payload: recipe };
};

export const bookmarkRecipe = ({ recipe }) => {
  return ((dispatch) => {
    AsyncStorage.getItem('bookmarked', (err, result) => {
      let newResult = {};
      if (result) {
        newResult = JSON.parse(result);
      }
      console.log(newResult);
      newResult[recipe.title] = recipe;
      AsyncStorage.setItem('bookmarked', JSON.stringify(newResult))
      .then(() => dispatch({ type: ADD_BOOKMARK, payload: recipe }));
    });
  });
};

export const loadBookmarks = () => {
  return ((dispatch) => {
    AsyncStorage.getItem('bookmarked', (err, result) => {
      let bookmarks = {};
      if (result) {
        bookmarks = JSON.parse(result);
      }
      dispatch({ type: LOAD_BOOKMARK_SUCCESS, payload: bookmarks });
    });
  });
};

export const removeBookmark = ({ recipe }) => {
  return ((dispatch) => {
    AsyncStorage.getItem('bookmarked', (err, result) => {
      let newResult = {};
      if (result) {
        newResult = JSON.parse(result);
        delete newResult[recipe.title];
        AsyncStorage.setItem('bookmarked', JSON.stringify(newResult))
        .then(() => dispatch({ type: REMOVE_BOOKMARK, payload: recipe }));
      }
    });
  });
};

export const loadRecent = () => {
  return ((dispatch) => {
      AsyncStorage.getItem('recentImg', (err, result) => {
      if (result) {
        console.log('RESULT', JSON.parse(result));
        dispatch({ type: CACHE_RECENT_IMG, payload: JSON.parse(result) });
      } else {
        const url = 'RECIPE_API_URL/recent';
        getRecipes(url).then((json) => {
          console.log('JSON', json[0].img);
          AsyncStorage.setItem('recentImg', JSON.stringify({ uri: json[0].img }))
            .then(() => dispatch({ type: CACHE_RECENT_IMG, payload: { uri: json[0].img } }));
          });
      }
    });
  });
};
