import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import HomeCategory from './HomeCategory';
import * as actions from '../actions';

import WeeknightImg from '../assets/Weeknight.jpg';
import RecentImg from '../assets/Recent.jpg';
import SpringImg from '../assets/Spring.jpg';
import SummerImg from '../assets/Summer.jpg';
import FallImg from '../assets/Fall.jpg';
import WinterImg from '../assets/Winter.jpg';
import SearchImg from '../assets/Search.jpg';
import SurpriseImg from '../assets/Surprise.jpg';
import BookmarkedImg from '../assets/Bookmarks.jpg';
import VegetarianImg from '../assets/Vegetarian.jpg';

const categoryList = [
  { title: 'Search', img: SearchImg },
  { title: 'Surprise!', img: SurpriseImg },
  { title: 'Weeknight Favorites', img: WeeknightImg },
  { title: 'Recent', img: RecentImg },
  { title: 'Bookmarked', img: BookmarkedImg },
  { title: 'Vegetarian', img: VegetarianImg },
  { title: 'Spring', img: SpringImg },
  { title: 'Summer', img: SummerImg },
  { title: 'Fall', img: FallImg },
  { title: 'Winter', img: WinterImg }
];
class Home extends Component {
  componentWillMount() {
    this.props.loadBookmarks();
    this.props.loadRecent();
  }

  handlePress({ title }) {
    this.props.resetRecipes();
    switch (title) {
      case 'Search':
        Actions.search();
        break;
      case 'Surprise!':
        this.props.getRandom();
        Actions.recipeView();
        break;
      case 'Recent':
        this.props.getRecent();
        Actions.recipeCategory();
        break;
      case 'Bookmarked':
        Actions.bookmarked();
        break;
      default:
        Actions.recipeCategory();
        this.props.searchByTag(title);
    }
  }

  renderCategories() {
    return (
      categoryList.map((category, i) => {
        if (this.props.recentImg && category.title === 'Recent') {
          console.log('RECENT IMAGE', this.props.recentImg);
          return (<HomeCategory
          key={i} category={{ title: category.title, img: this.props.recentImg }}
          onPress={this.handlePress.bind(this, category)}
          />);
        }
        return (
          <HomeCategory
          key={i} category={category} onPress={this.handlePress.bind(this, category)}
          />);
      })
    );
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          {this.renderCategories()}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  backdrop: {
    height: 180.5,
    width: 180.5,
    borderRadius: 5
  },
  backdropView: {
    height: 180.5,
    width: 180.5,
    backgroundColor: 'rgba(80,94,104,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  labelText: {
    color: 'white'
  }
};

const mapStateToProps = (state) => {
  return {
    recentImg: state.recentImg
  };
};

export default connect(mapStateToProps, actions)(Home);
