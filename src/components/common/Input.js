import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, viewStyle, style }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={[containerStyle, viewStyle]}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
      style={[inputStyle, style]}
      value={value}
      onChangeText={onChangeText}
      autoCorrect={false}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      multiline
      />

    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#6B7794',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
};

export { Input };
