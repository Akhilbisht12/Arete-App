import {
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../components/atoms/Logo';
import {withTheme} from 'styled-components';
import {ScrollView} from 'react-native-gesture-handler';
import silly from '../Silly/styles/silly';
const {width, height} = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    heading: 'What is OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../assets/images/banner2.png'),
  },
  {
    id: 2,
    heading: 'How to Use OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../assets/images/banner1.png'),
  },
  {
    id: 3,
    heading: 'Why Use OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../assets/images/banner3.png'),
  },
  {
    id: 4,
    heading: 'Free Training on OCTA',
    text: 'OCTA is leading software in managing hospital operations',
    image: require('../../assets/images/banner4.png'),
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
      <View style={styles.row}>
        <View style={styles.columnName}>
          <Text style={styles.heading}>Hi</Text>
          <Text style={styles.name}>Deepak Semwal</Text>
        </View>
        <View style={styles.columnBell}>
          <Icon name="notifications-outline" size={30} color={'#F5F5F5'} />
          <Text style={styles.notifyNum}>10</Text>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      {/* <View style={styles.grid}>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate("CreateEstimate");
          }}
        >
          <Icon name="calculator-outline" color={"#151E3F"} size={40}></Icon>
          <Text style={styles.itemName}>Bill Estimator</Text>
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate("CreateEstimate");
          }}
        >
          <Icon name="newspaper-outline" color={"#151E3F"} size={40}></Icon>
          <Text style={styles.itemName}>Upload Prescription</Text>
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate("QuickPrescriptionUpload");
          }}
        >
          <Icon name="scan-circle-outline" color={"#151E3F"} size={40}></Icon>
          <Text style={styles.itemName}>Upload Quick Prescription</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <Icon name="folder-open-outline" color={"#151E3F"} size={40}></Icon>
          <Text style={styles.itemName}>Upload Service Master</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 30,
    height: height * 0.2,
    width: width * 1,
    backgroundColor: '#151E3F',
    borderBottomEndRadius: 20,
    marginBottom: 10,
  },
  columnName: {
    width: width * 0.4,
  },
  columnBell: {
    width: width * 0.5,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 50,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    lineHeight: 55,
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    lineHeight: 22,
  },
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
  grid: {
    marginVertical: 20,
    width: width * 1,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    padding: 7,
    margin: 10,
  },
  itemName: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 20,
    elevation: 4,
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
