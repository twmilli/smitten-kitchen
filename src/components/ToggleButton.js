import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';

const ToggleButton = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={{ flex: 0.5 }}>
      <View style={[styles.viewStyle, props.selected ? styles.viewSelectedStyle : {}]}>
        <Text
        style={[styles.textStyle, props.selected ? styles.textSelectedStyle : {}]}
        >
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: 'stretch'
  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  },
  textSelectedStyle: {
    color: '#bb4467',
  },
  viewSelectedStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#bb4467'
  },
  viewStyle: {
    backgroundColor: '#6B7794',
    borderBottomWidth: 2,
    borderBottomColor: '#6B7794'
  }
};

export default ToggleButton;
