import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import RecipeItem from './RecipeItem';


class RecipeList extends Component {

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ recipeList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(recipeList);
  }

  renderRow(recipe) {
    return <RecipeItem recipe={recipe} />;
  }
  render() {
    return (
      <ListView
      enableEmptySections
      dataSource={this.dataSource}
      renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.showBookmarks) {
    return ({
      recipeList: _.toArray(state.bookmarks).reverse()
    });
  }
  return ({
    recipeList: state.recipes.recipeList
  });
};

export default connect(mapStateToProps)(RecipeList);
