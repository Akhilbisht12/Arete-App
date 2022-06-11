import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {Row, RowBetween} from '../styles/FlexView';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const AgentSetting = ({navigation}) => {
  return (
    <View style={{height: height}}>
      <View style={styles.card}>
        <RowBetween>
          <View>
            <Image
              source={{
                uri: 'https://cdn.create.vista.com/api/media/medium/176349124/stock-vector-anonymous-user-circle-icon',
              }}
              style={styles.avatar}
            />
            <Text style={styles.agentId}>
              Agent ID : <Text style={{fontSize: 18}}>PAR12012</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.agentName}>Deepak Semwal</Text>
            <Text style={styles.agentDetails}>(Cardiology Dept.)</Text>
            <Text style={styles.agentDetails}> </Text>
            <Text style={styles.agentDetails}>deepak@octahealth.link</Text>
            <Text style={styles.agentDetails}>+91 6395186367</Text>
          </View>
        </RowBetween>
      </View>
      <Pressable style={styles.buttons}>
        <Icon name="trending-up" color={'white'} size={24} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: 'white',
            fontSize: 16,
            marginHorizontal: 5,
          }}>
          View Performance Report
        </Text>
      </Pressable>
      <Pressable
        style={styles.buttons}
        onPress={() => {
          navigation.navigate('Supervisor Query');
        }}>
        <Icon name="chatbubbles" color={'white'} size={24} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: 'white',
            fontSize: 16,
            marginHorizontal: 5,
          }}>
          Send Query to Supervisor
        </Text>
      </Pressable>
      <View style={styles.footerNav}>
        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            style={styles.footerItems}
            name="log-out"
            color={'grey'}
            size={20}
          />
          <Text style={styles.footerItems}>Logout</Text>
          <Text />
        </Pressable>
        <Text style={styles.footerItems}>App Version : V1.0(alpha)</Text>
        <Text style={styles.footerBrand}>Arete HealthTech Product</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 7,
    height: height * 0.3,
    backgroundColor: 'olive',
    elevation: 2,
    borderRadius: 7,
    shadowColor: 'grey',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  agentName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 23,
    color: 'white',
  },
  agentId: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
  },
  agentDetails: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
  },
  buttons: {
    textAlign: 'center',
    margin: 10,
    padding: 20,
    height: height * 0.1,
    backgroundColor: '#030027',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerNav: {
    bottom: 0,
    top: height * 0.7,
    position: 'absolute',
    padding: 20,
  },
  footerItems: {
    fontFamily: 'Poppins-Medium',
    color: 'grey',
    marginVertical: 10,
  },
  footerBrand: {
    fontFamily: 'Poppins-Medium',
    color: 'grey',
    margin: 0,
  },
});

export default AgentSetting;
