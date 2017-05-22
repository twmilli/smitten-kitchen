import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

const HomeCategory = (props) => {
  const { category, onPress } = props;
  console.log(category.img);
  return (
    <TouchableOpacity style={{ margin: 5 }} onPress={onPress}>
      <Image
        source={category.img}
        style={styles.backdrop}
      >
        <View style={styles.backdropView}>
          <Text style={styles.labelText}>{category.title}</Text>
        </View>
      </Image>
    </TouchableOpacity>
  );
};

const styles = {
  backdrop: {
    height: 120,
    width: 170,
    borderRadius: 5
  },
  backdropView: {
    height: 120,
    width: 170,
    backgroundColor: 'rgba(80,94,104,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  labelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
};

export default HomeCategory;
