import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { text } from 'react-native-communications';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardSection, Spinner, Button } from './common';
import ToggleButton from './ToggleButton';
import BugModal from './BugModal';
import Error from './Error';
import { bookmarkRecipe, removeBookmark } from '../actions';


class RecipeView extends Component {
  state = { showIngredients: true, showBugModal: false }
  handleBookmark() {
    const { recipe } = this.props;
    if (this.props.bookmarked) {
      this.props.removeBookmark({ recipe });
    } else {
      this.props.bookmarkRecipe({ recipe });
    }
  }

  handleSend() {
    const { title, url } = this.props.recipe;
    text(null, //to
      `${title} by Smitten Kitchen\n${url}` //body
    );
  }
  handleLink() {
  const { url } = this.props.recipe;
    Linking.openURL(url).catch(err => console.log('An error has occurred', err));
  }

  renderIngredientList(ingredientList) {
    return (
      ingredientList.map((ingredient, i) => {
        return (
          <Text key={i} style={styles.ingredient}>
            <Text style={{ color: '#bb4467' }}> + </Text>
            {ingredient}
          </Text>
        );
      })
  );
}

  renderDirectionList(directions) {
    return (
      directions.map((dir, i) => {
        return (
          <Text key={i} style={styles.ingredient}>
            <Text style={{ color: '#bb4467' }}> {i + 1}. </Text>
            {dir}
          </Text>
        );
      })
    );
  }
  renderList() {
    const { ingredient_list, directions } = this.props.recipe;
    if (this.state.showIngredients) {
      return (this.renderIngredientList(ingredient_list));
    }
    return (this.renderDirectionList(directions));
  }

  renderNotes() {
    if (this.props.recipe.notes) {
      return (
        <CardSection>
          <Text>
            {this.props.recipe.notes}
          </Text>
        </CardSection>
      );
    }
    return;
  }

  render() {
    if (this.props.loading) {
      return (<View style={{ flex: 1 }}>
                <Spinner size="large" />
              </View>);
    } else if (this.props.error) {
      return <Error errorText={this.props.error} />;
    }
    const { img, title } = this.props.recipe;
    return (
      <ScrollView>
        <Card style={{ flex: 1 }}>
          <CardSection style={{ justifyContent: 'center' }}>
            <Image
            source={{ uri: img }}
            style={styles.backdrop}
            >
              <View style={styles.backdropView}>
                <Text style={styles.headline}>{title}</Text>
              </View>
            </Image>
          </CardSection>
          <View style={styles.iconContainer} >
            <Icon.Button
            name={this.props.bookmarked ? 'bookmark' : 'bookmark-o'}
            size={30}
            backgroundColor='white'
            color={this.props.bookmarked ? '#bb4467' : '#6B7794'}
            style={{ flex: 1 }}
            onPress={this.handleBookmark.bind(this)}
            />
            <Icon.Button
            name="paper-plane-o"
            size={30}
            backgroundColor='white'
            color='#6B7794'
            style={{ flex: 1 }}
            onPress={this.handleSend.bind(this)}
            />
            <Icon.Button
            name="link"
            size={30}
            backgroundColor='white'
            color='#6B7794'
            style={{ flex: 1 }}
            onPress={this.handleLink.bind(this)}
            />
          </View>
          <View style={styles.toggleContainer}>
            <ToggleButton
              onPress={() => this.setState({ showIngredients: true })}
              selected={this.state.showIngredients}
            >
              Ingredients
            </ToggleButton>
            <ToggleButton
              onPress={() => this.setState({ showIngredients: false })}
              selected={!this.state.showIngredients}
            >
              Directions
            </ToggleButton>
          </View>
          <View style={{ flex: 1 }}>
            {this.renderList()}
          </View>
        </Card>
        <Button onPress={() => this.setState({ showBugModal: true })}>Report an Issue</Button>
        <BugModal
        visible={this.state.showBugModal} onCancel={() => this.setState({ showBugModal: false })}
        recipeTitle={this.props.recipe.title}
        />
      </ScrollView>
    );
  }
}

const styles = {
  backdrop: {
    height: 320,
    alignItems: 'stretch',
    borderRadius: 5
  },
  backdropView: {
    height: 320,
    width: 320,
    backgroundColor: 'rgba(80,94,104,0.6)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  headline: {
    fontSize: 24,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  toggleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  ingredient: {
    marginTop: 5,
    margin: 5,
    color: '#6B7794',
    fontSize: 16
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#6B7794'
  }
};

const mapStateToProps = (state) => {
  const { loading, error } = state.recipes;
  let { selectedRecipe } = state.recipes;
  const bookmarked = selectedRecipe.title in state.bookmarks;
  if (bookmarked) {
    selectedRecipe = state.bookmarks[selectedRecipe.title];
  }
  return {
    loading,
    recipe: selectedRecipe,
    error,
    bookmarked
  };
};

export default connect(mapStateToProps, { bookmarkRecipe, removeBookmark })(RecipeView);
