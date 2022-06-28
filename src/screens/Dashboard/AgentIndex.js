import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';
import SillyText from '../../Silly/components/SillyText';
import SillyView from '../../Silly/components/SillyView';
const {width} = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    heading: 'What is OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../../assets/images/banner2.png'),
  },
  {
    id: 2,
    heading: 'How to Use OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../../assets/images/banner1.png'),
  },
  {
    id: 3,
    heading: 'Why Use OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../../assets/images/banner3.png'),
  },
  {
    id: 4,
    heading: 'Free Training on OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../../assets/images/banner4.png'),
  },
];

const AgentIndex = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <View style={[styles.banner, silly.my1]}>
        <View>
          <Image style={styles.bannerImg} source={item.image} />
        </View>
        <View>
          <Text style={styles.bannerHead}>{item.heading}</Text>
          <Text style={styles.bannerText}>{item.text}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[silly.f1]}>
      <SillyView
        round={0.01}
        mx={0.01}
        py={20}
        my={0.01}
        bg="#151E3F"
        style={[silly.fr, silly.jcbtw, silly.aic]}>
        <View>
          <SillyText family="Medium" size={40}>
            Welcome
          </SillyText>
          <SillyText size={20}>Agent</SillyText>
        </View>
        <View>
          <Icon name="notifications-outline" size={30} color={'#F5F5F5'} />
          <Text style={styles.notifyNum}>10</Text>
        </View>
      </SillyView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'olive',
    padding: 20,
    marginHorizontal: 10,
    width: width * 0.95,
    borderRadius: 7,
  },
  bannerHead: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  bannerImg: {
    height: 100,
    width: 100,
  },
  bannerText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  notifyNum: {
    backgroundColor: 'red',
    position: 'absolute',
    textAlign: 'center',
    width: 15,
    color: 'white',
    height: 15,
    borderRadius: 50,
    fontSize: 10,
  },
});

export default AgentIndex;
