import React from 'react';

import { Scene, Router } from 'react-native-router-flux';
import Search from './components/Search';
import Home from './components/Home';
import RecipeView from './components/RecipeView';
import RecipeListContainer from './components/RecipeListContainer';
import BookmarkContainer from './components/BookmarkContainer';

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={{ backgroundColor: '#6B7794' }}
      sceneStyle={{ paddingTop: 65 }}
      titleStyle={{ color: 'white' }}
      barButtonIconStyle={{ tintColor: 'white' }}
    >
      <Scene key="root">
        <Scene key="search" component={Search} />
        <Scene key="recipeView" component={RecipeView} />
        <Scene key="recipeCategory" component={RecipeListContainer} />
        <Scene key="bookmarked" component={BookmarkContainer} />
        <Scene key="home" component={Home} initial title='Smitten Kitchen' />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
