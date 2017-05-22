import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Error from './Error';
import { Card, Spinner } from './common';
import * as actions from '../actions';
import RecipeList from './RecipeList';

class RecipeListContainer extends Component {
  renderRecipeList() {
    if (this.props.recipeList.length > 0) {
      return (<RecipeList />);
    }
    return;
  }
  render() {
    const { error, loading } = this.props;
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner size="large" />
        </View>
      );
    } else if (error) {
      return <Error errorText={error} />;
    }
    return (
      <Card style={!loading ? { flex: 1 } : {}}>
        {this.renderRecipeList()}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipeList: state.recipes.recipeList,
    loading: state.recipes.loading,
    error: state.recipes.error
  };
};


export default connect(mapStateToProps, actions)(RecipeListContainer);
