import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {SERVER_URL} from '../config/variables';
import PatientComp from '../components/organisms/PatientComp';
import {SillyInput} from '../Silly/components/silly_comps';
import StyledInputView from '../styles/StyledInputView';
import {Row, RowBetween} from '../styles/FlexView';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import silly from '../Silly/styles/silly';

const FindPatientByID = ({navigation}) => {
  const [patientID, setpatientID] = useState('');
  const [patients, setPatients] = useState([]);
  const [Loading, setLoading] = useState(false);
  const findPatientByID = async text => {
    setLoading(true);
    try {
      const patients = await axios.post(
        `${SERVER_URL}/api/v1/patient/findPatientByID`,
        {
          patientID: text,
        },
      );
      setLoading(false);
      setPatients(patients.data.patients);
    } catch (error) {
      console.log(error);
      Alert.alert('something went wrong');
      setLoading(false);
    }
  };
  const handlePatientSearch = text => {
    setpatientID(text);
    if (text.length > 2) {
      findPatientByID(text);
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
        <StyledInputView>
          <View style={[silly.fr, silly.jcbtw, silly.aic]}>
            <View style={[silly.fr, silly.aic]}>
              <Icon name="person" size={25} color={Colors.primary} />
              <TextInput
                placeholderTextColor={'black'}
                style={{
                  height: 45,
                  width: 250,
                  marginHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                }}
                placeholder="Search Patient By ID"
                onChangeText={text => handlePatientSearch(text)}
              />
            </View>
            {Loading ? (
              <ActivityIndicator size="small" color="#4281A4" />
            ) : (
              <Icon name="search-outline" size={25} color={'#4281A4'} />
            )}
          </View>
        </StyledInputView>
      </View>
      <ScrollView style={{paddingBottom: 30}}>
        {patients.map(item => {
          return <PatientComp key={item._id} item={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default FindPatientByID;
