import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {SERVER_URL} from '../../config/variables';
import PatientComp from './components/PatientComp';
import {SillyInput} from '../../Silly/components/silly_comps';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import silly from '../../Silly/styles/silly';
import {clr2} from '../../config/globals';

const FindPatientByID = ({navigation}) => {
  const [patientID, setpatientID] = useState('');
  const [patients, setPatients] = useState([]);
  const [Loading, setLoading] = useState(false);
  const handlePatientSearch = async text => {
    setLoading(true);
    if (text.length < 3) {
      return;
    }
    try {
      const patients = await axios.post(
        `${SERVER_URL}/api/v1/patient/findPatientByID`,
        {
          patientID: text,
        },
      );
      setLoading(false);
      console.log(patients.data);
      setPatients(patients.data.patients);
    } catch (error) {
      console.log(error);
      Alert.alert('something went wrong');
      setLoading(false);
    }
  };
  return (
    <View style={{paddingBottom: 20}}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 10,
          borderBottomEndRadius: 20,
        }}>
        <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontFamily: 'Poppins-Medium',
              paddingHorizontal: 5,
            }}>
            Find Patient By Id
          </Text>
        </View>
        <View style={[silly.fr, silly.jcbtw, silly.aic, silly.px1]}>
          <Icon name="person" size={25} color={clr2} />
          <SillyInput
            color={clr2}
            style={[silly.w75p]}
            bg="transparent"
            placeholder="Search Patient By ID"
            onChangeText={text => handlePatientSearch(text)}
          />
          {Loading ? (
            <ActivityIndicator size="small" color={clr2} />
          ) : (
            <Icon name="search-outline" size={25} color={clr2} />
          )}
        </View>
      </View>
      <ScrollView style={[silly.fg1]}>
        <View style={[silly.p1, silly.f1]}>
          {patients.map(item => {
            return <PatientComp key={item._id} item={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FindPatientByID;
