import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Index = ({navigation}) => {
  const handleScreen = () => {
    navigation.navigate('FindPatient');
  };
  return (
    <View>
      <View style={{padding: 10, flexDirection: 'row'}}>
        <Pressable
          style={{
            margin: 10,
            width: 150,
            backgroundColor: 'orange',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="calculator-outline" size={40} color={'white'} />
          <Text
            style={{
              margin: 10,
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
              color: 'white',
              textAlign: 'center',
            }}>
            Bill Estimater
          </Text>
        </Pressable>
        <Pressable
          onPress={handleScreen}
          style={{
            width: 150,
            margin: 10,
            backgroundColor: '#ff7700',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="camera-outline" size={40} color={'white'} />
          <Text
            style={{
              margin: 10,
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
              color: 'white',
              textAlign: 'center',
            }}>
            Quick Prescription
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          backgroundColor: '#ff7744',
          borderRadius: 5,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="person-outline" size={40} color={'white'} />
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            color: 'white',
            textAlign: 'center',
          }}>
          Check Patient Info
        </Text>
      </Pressable>
      <Pressable
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          backgroundColor: '#ff3300',
          borderRadius: 5,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="newspaper-outline" size={40} color={'white'} />
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            color: 'white',
            textAlign: 'center',
          }}>
          Check Patient History
        </Text>
      </Pressable>
    </View>
  );
};
export default Index;
