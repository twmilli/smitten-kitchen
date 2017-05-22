import React, { Component } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Card } from './common';
import { selectRecipe } from '../actions';

class RecipeItem extends Component {
  onRecipePress() {
    this.props.selectRecipe({ recipe: this.props.recipe });
    Actions.recipeView();
  }
  render() {
    const { title, img } = this.props.recipe;
    return (
      <TouchableOpacity onPress={this.onRecipePress.bind(this)}>
        <Card>
          <CardSection style={{ justifyContent: 'center' }}>
            <Text style={styles.textStyle}>
              {title}
            </Text>
          </CardSection>
          <CardSection style={{ justifyContent: 'center' }}>
            <Image
            style={styles.imgStyle}
            source={{ uri: img }}
            />
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = {
  imgStyle: {
    borderRadius: 5,
    width: 300,
    height: 200
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6B7794'
  }
};

export default connect(null, { selectRecipe })(RecipeItem);
