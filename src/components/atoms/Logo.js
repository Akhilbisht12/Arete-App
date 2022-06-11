import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import {ColumnCenter} from '../../styles/FlexView';
const {width, height} = Dimensions.get('window');

const Logo = () => {
  return (
    <ColumnCenter style={{marginTop: 10}}>
      <Image
        style={{
          height: height * 0.1,
          width: width * 0.5,
          resizeMode: 'contain',
        }}
        source={{
          uri: 'https://upgrate.in/wp-content/uploads/2022/02/image-6.png',
        }}
      />
    </ColumnCenter>
  );
};

export default Logo;
