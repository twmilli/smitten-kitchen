import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { Button, CardSection, Input } from './common';

class BugModal extends Component {
  state={ titleText: this.props.recipeTitle, descriptionText: '' }

  onSubmit() {
    this.email({ title: this.state.titleText, description: this.state.descriptionText });
    this.setState({ titleText: '', descriptionText: '' });
    this.props.onCancel();
  }

  email({ title, description }) {
    const url = `RECIPE_API_URL/email/?title=${title}&description=${description}`;
    fetch(url) // eslint-disable-line
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { visible, onCancel } = this.props;
    const { containerStyle, cardSectionStyle } = styles;
    return (<Modal
    animationType="slide"
    onRequestClose={() => {}}
    transparent
    visible={visible}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
            <Input
            label="Title:"
            value={this.state.titleText}
            onChangeText={(val) => this.setState({ titleText: val })}
            viewStyle={{ flex: 1 }}
            style={{ height: 100 }}
            />
            <Input
            label="Description:"
            placeholder='Please enter a description of the issue here'
            value={this.state.descriptionText}
            onChangeText={(val) => this.setState({ descriptionText: val })}
            multiline
            viewStyle={{ flex: 3 }}
            style={{ height: 400 }}
            />
        </CardSection>
        <CardSection>
          <Button onPress={this.onSubmit.bind(this)}>Submit</Button>
          <Button onPress={onCancel}>Cancel</Button>
        </CardSection>
      </View>

    </Modal>);
  }
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 60
  }
};

export default BugModal;
