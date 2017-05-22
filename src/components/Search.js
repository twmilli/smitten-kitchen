import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import SearchBox from 'react-native-search-box';
import { Card, Spinner } from './common';
import * as actions from '../actions';
import RecipeList from './RecipeList';
import Error from './Error';

class Search extends Component {
  state = { searchTerm: '' }
  handleSearch() {
    this.props.searchFullText(this.state.searchTerm);
    return new Promise((resolve) => {
      resolve();
    });
  }
  renderRecipeList() {
    const { loading, recipeList } = this.props;
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner size="large" />
        </View>
      );
    } else if (recipeList.length > 0) {
      return (<RecipeList />);
    }
    return;
  }
  render() {
    const { error, recipeList } = this.props;
    const errorView = error ? <Error errorText={error} /> : null;
    return (
      <Card style={recipeList.length > 0 || error ? { flex: 1 } : {}}>
        <SearchBox
        onSearch={this.handleSearch.bind(this)}
        onChangeText={(searchTerm) => this.setState({ searchTerm })}
        backgroundColor='#6B7794'
        placeholderTextColor='#6B7794'
        tintColorSearch='#6B7794'
        />
        {errorView}
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

export default connect(mapStateToProps, actions)(Search);
