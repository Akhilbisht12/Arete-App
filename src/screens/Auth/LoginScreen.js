import React from 'react';
import {View, Text, Image, TextInput, Pressable} from 'react-native';
import axios from 'axios';
import {Colors} from '../../styles/colors';
import {SillyText, SillyInput} from '../../Silly/components/silly_comps';
import {clr3, clr4} from '../../config/globals';
import silly from '../../Silly/styles/silly';

const LoginScreen = ({navigation}) => {
  const handleScreen = () => {
    navigation.replace('AgentIndex');
  };
  return (
    <View style={[silly.f1, silly.p2]}>
      <View style={[silly.aic]}>
        <Image
          source={require('../../../assets/logo/logo.png')}
          style={[
            {
              width: 200,
            },
            silly.h50,
            silly.mt5,
          ]}
        />
        <SillyText size={18} my={30} color={clr4}>
          We are leading Hospital Management Tool
        </SillyText>
      </View>

      <View style={[silly.mt5]}>
        <View>
          <SillyText family="Medium">Agent ID</SillyText>
          <SillyInput placeholder="Enter Agent ID" />
        </View>
        <View style={silly.mt1}>
          <SillyText family="Medium">Password</SillyText>
          <SillyInput placeholder="Enter Password" />
          <Pressable style={{marginTop: 5}}>
            <SillyText
              family="Medium"
              style={{
                textAlign: 'right',
                paddingTop: 5,
                color: Colors.primary,
              }}>
              Forget Password ?
            </SillyText>
          </Pressable>
        </View>
        <Pressable onPress={handleScreen}>
          <View
            style={{
              backgroundColor: Colors.primary,
              marginTop: 20,
              padding: 12,
              borderRadius: 10,
              textAlign: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                letterSpacing: 5,
                fontFamily: 'Poppins-Medium',
              }}>
              LOGIN
            </Text>
          </View>
        </Pressable>
        <Text
          style={{
            margin: 10,
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
          }}>
          Or
        </Text>
        <View style={[silly.fr, silly.aic, silly.jcc]}>
          <SillyText family="Medium" style={[silly.pt2, silly.mr1]}>
            Do not have an account?
          </SillyText>
          <Pressable
            style={{paddingTop: 20, paddingRight: 10}}
            onPress={() => navigation.navigate('FindPatient')}>
            <Text
              style={{
                color: Colors.primary,
                fontFamily: 'Poppins-Bold',
              }}>
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
