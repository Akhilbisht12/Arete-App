import {
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from '../config/variables';
import {connect} from 'react-redux';
import {addPatient} from '../store/actions/patientAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SillyInput,
  SillyView,
  SillyText,
  SillyButton,
} from '../Silly/components/silly_comps';
import silly from '../Silly/styles/silly';
import {useEffect} from 'react';

const {width, height} = Dimensions.get('window');
let genderColor = ['white', '#151E3F'];
var textIconColor = ['#151E3F', 'white'];

const RegisterPatient = ({}) => {
  const [loader, setLoader] = useState(false);
  const [states, setStates] = useState([]);
  const init = {
    uhid: '',
    firstName: '',
    lastName: '',
    address: {
      house: '',
      city: '',
      state: '',
      postal_code: '',
    },
    age: '',
    email: '',
    gender: '',
    phone: '',
  };
  const [data, setData] = useState(init);
  const [genderSelector, setGenderSelector] = useState();
  const handleRegister = async () => {
    data.age = parseInt(data.age);
    data.phone = parseInt(data.phone);
    setLoader(true);
    if (
      !(
        data.uhid &&
        data.firstName &&
        data.lastName &&
        data.address &&
        data.age &&
        data.email &&
        data.gender &&
        data.phone
      )
    ) {
      ToastAndroid.show('Please Fill All Details', ToastAndroid.SHORT);
      return;
    }
    try {
      console.log(data);
      const response = await axios.post(
        `${SERVER_URL}/api/v1/patient/register/`,
        data,
      );
      console.log(response.data);
      ToastAndroid.show('Patient Registered', ToastAndroid.SHORT);
      setLoader(false);
      setData(init);
      // addPatient({ patient: response.patient });
      // navigation.navigate("PatientEntry", { data: response.patient });
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
      setLoader(false);
    }
  };

  return (
    <View style={[silly.f1]}>
      <View style={styles.header}>
        <SillyText style={styles.bannerText}>Add Pateint Details </SillyText>
        <SillyText style={styles.bannerSubText}>
          Please Fill Pateint Details here and submit it to the OCTA PRM
        </SillyText>
      </View>
      <ScrollView style={[silly.p2]}>
        <SillyText style={styles.itemName}>Enter Pateint Name</SillyText>
        <SillyInput
          value={data.firstName}
          onChangeText={e => setData({...data, firstName: e})}
          placeholder="First Name"
        />
        <SillyInput
          value={data.lastName}
          onChangeText={e => setData({...data, lastName: e})}
          placeholder="Last Name"
        />
        <SillyText style={styles.itemName}>Enter UHID</SillyText>

        <SillyInput
          value={data.uhid.toString()}
          keyboardType="number-pad"
          onChangeText={e => setData({...data, uhid: e})}
          placeholder="UHID"
        />
        <SillyText style={styles.itemName}>Enter Email Address</SillyText>

        <SillyInput
          value={data.email}
          onChangeText={e => setData({...data, email: e})}
          placeholder="Email"
        />
        <SillyText style={styles.itemName}>Enter Pateint Age</SillyText>

        <SillyInput
          value={data.age.toString()}
          onChangeText={e => setData({...data, age: e.toString()})}
          keyboardType="number-pad"
          placeholder="Age"
        />
        <SillyText style={[styles.itemName, silly.px1]}>
          Select Gender
        </SillyText>

        <View style={[silly.fr, silly.py1]}>
          {[
            {name: 'Male', value: 'M', icon: 'male-outline'},
            {name: 'Female', value: 'F', icon: 'female-outline'},
            {name: 'Others', value: 'O', icon: 'male-outline'},
          ].map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setGenderSelector(i);
                  setData({...data, gender: item.value});
                }}>
                <SillyView
                  mx={5}
                  px={15}
                  py={10}
                  style={[silly.aic, silly.w25p]}
                  bg={genderSelector === i ? genderColor[1] : genderColor[0]}>
                  <Ionicons
                    name={item.icon}
                    color={`${
                      genderSelector === i ? textIconColor[1] : textIconColor[0]
                    }`}
                    size={25}
                  />
                  <SillyText
                    style={[
                      styles.itemName,
                      {
                        color: `${
                          genderSelector === i
                            ? textIconColor[1]
                            : textIconColor[0]
                        }`,
                      },
                    ]}>
                    {item.name}
                  </SillyText>
                </SillyView>
              </TouchableOpacity>
            );
          })}
        </View>
        <SillyText style={styles.itemName}>Enter Phone Number</SillyText>
        <SillyInput
          keyboardType="number-pad"
          value={data.phone.toString()}
          onChangeText={e => setData({...data, phone: e.toString()})}
          placeholder="Phone"
        />

        <SillyText style={styles.itemName}>Enter Address</SillyText>
        {[
          {name: 'House No', val: 'house', type: 'number-pad'},
          {name: 'City', val: 'city'},
          {name: 'State', val: 'state'},
          {name: 'Pincode', val: 'postal_code', type: 'number-pad'},
        ].map((item, i) => {
          return (
            <SillyInput
              value={data.address[item.val]}
              keyboardType={item.type ? item.type : null}
              placeholder={item.name}
              onChangeText={text => {
                setData(prev => {
                  prev.address[item.val] = text;
                  return {...prev};
                });
              }}
            />
          );
        })}
        <SillyButton
          style={[silly.jcc, silly.fr]}
          my={30}
          bg="#0F7173"
          onPress={handleRegister}>
          <SillyText my={8} center size={20}>
            Add Details
          </SillyText>
          <ActivityIndicator
            animating={loader}
            color={'white'}
            size={'small'}
          />
        </SillyButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    width: width,
  },
  rowInput: {
    width: width * 0.4,
  },
  header: {
    backgroundColor: '#030027',
    width: width,
    height: height * 0.2,
    padding: 20,
    borderBottomRightRadius: 40,
  },
  bannerText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
  },
  bannerSubText: {
    color: 'white',
    fontFamily: 'SFPRODISPLAYREGULAR',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
  },
});

export default RegisterPatient;
