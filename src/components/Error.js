import React from 'react';
import { Text, View } from 'react-native';

const Error = ({ errorText }) => {
  if (errorText) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}> {errorText} </Text>
      </View>
    );
  }
  return;
};

const styles = {
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  errorText: {
    textAlign: 'center',
    color: '#bb4467',
    fontSize: 30
  }
};

export default Error;
