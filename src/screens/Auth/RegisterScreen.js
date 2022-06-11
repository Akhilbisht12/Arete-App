import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {SillyInput} from '../../Silly/components/silly_comps';
const {width, height} = Dimensions.get('window');

const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [agentID, setAgentID] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  return (
    <ScrollView>
      <View style={{display: 'flex', alignItems: 'center', margin: 20}}>
        <View style={{alignItems: 'center', padding: 20}}>
          <Image
            source={require('../../../assets/logo/logo.png')}
            style={{
              height: 30,
              width: 120,
              margin: 20,
            }}
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 30,
              color: 'orange',
              fontFamily: 'Poppins-Bold',
            }}>
            Agent Registration
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
              }}>
              First Name
            </Text>
            <TextInput
              value={firstName}
              onChangeText={e => {
                setFirstName(e);
              }}
              style={{
                height: 40,
                width: 160,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginRight: 8,
              }}
              placeholder="Enter First Name"
            />
            <SillyInput placeholder="Enter First Name" />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
              }}>
              Last Name
            </Text>
            <TextInput
              value={lastName}
              onChangeText={e => setLastName(e)}
              style={{
                width: 150,
                height: 40,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="Enter Last Name"
            />
          </View>
        </View>
        <View style={{marginTop: 5, marginLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={e => setEmail(e)}
            style={{
              width: 322,
              height: 40,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Agent Email"
          />
        </View>
        <View style={{marginTop: 5, marginLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Phone Number
          </Text>
          <TextInput
            value={phone}
            onChangeText={e => setPhone(e)}
            style={{
              width: 322,
              height: 40,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Agent Phone Number"
          />
        </View>
        <View style={{marginTop: 5, marginLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Agent Id
          </Text>
          <TextInput
            value={agentID}
            onChangeText={e => setAgentID(e)}
            style={{
              width: 322,
              height: 40,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Agent Id"
          />
        </View>
        <View style={{marginTop: 5, marginLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={e => setPassword(e)}
            style={{
              width: 322,
              height: 40,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Password"
          />
        </View>
        <View style={{marginTop: 5, marginLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Confirm Password
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={e => setConfirmPassword(e)}
            style={{
              width: 322,
              height: 40,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Confirm Above Password "
          />
        </View>
        <TouchableOpacity style={{padding: 10}}>
          <View
            style={{
              backgroundColor: 'orange',
              marginTop: 20,
              padding: 12,
              borderRadius: 10,
              textAlign: 'center',
              width: width * 0.8,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                letterSpacing: 5,
                fontFamily: 'Poppins-Medium',
              }}>
              REGISTER
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            margin: 10,
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
          }}>
          Or
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              paddingTop: 20,
              marginRight: 10,
              fontFamily: 'Poppins-Medium',
            }}>
            Already have an Account?
          </Text>
          <Pressable
            style={{paddingTop: 20, paddingRight: 10}}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={{
                color: 'orange',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
              }}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
