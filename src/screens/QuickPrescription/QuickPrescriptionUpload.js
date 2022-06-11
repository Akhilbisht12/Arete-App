import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RowBetween} from '../../styles/FlexView';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {SERVER_URL} from '../../config/variables';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import CameraView from '../../components/atoms/CameraView';

const QuickPrescriptionUpload = ({route}) => {
  const navigation = useNavigation();
  const patientID = route.params.patientID;
  const [presDetails, setPresDetails] = useState({
    isAdmissionAdvised: '',
    isPetCTAdvised: false,
    isRadiologyAdvised: false,
    ct: false,
    mri: false,
    usg: false,
    others: false,
    dialysis: false,
    doctor: '',
  });
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState(false);
  const [photo, setPhoto] = useState('');
  const UploadPrescription = async () => {
    if (!(photo && presDetails.doctor && presDetails.isAdmissionAdvised)) {
      ToastAndroid.show(
        'Capture Prescription, Select Doctor, Select Admission',
        ToastAndroid.SHORT,
      );
      return;
    }
    setLoading(true);
    try {
      let formdata = new FormData();
      formdata.append(
        'quickPres',
        JSON.stringify({
          isAdmissionAdvised: presDetails.isAdmissionAdvised,
          isPetCTAdvised: presDetails.isPetCTAdvised,
          isRadiologyAdvised: presDetails.isRadiologyAdvised,
          dialysis: presDetails.dialysis,
          doctor: presDetails.doctor,
          diagnostics: {
            ct: presDetails.ct,
            mri: presDetails.mri,
            usg: presDetails.usg,
            others: presDetails.others,
          },
        }),
      );
      formdata.append('patientID', patientID);
      // formdata.append("prescription", {
      //   uri: `file://${photo}`,
      //   name: `${patientID + "on" + Date.now()}`,
      //   type: "image/jpg",
      // });
      const pres = await axios.post(
        `${SERVER_URL}/api/v1/patient/newAppointment`,
        formdata,
      );
      console.log(pres.statusText);
      if (pres.status === 200) {
        setLoading(false);
        ToastAndroid.show(
          'Prescription Uploaded Successfully',
          ToastAndroid.SHORT,
        );
        navigation.navigate('FindPatient');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  if (camera) {
    return (
      <CameraView photo={photo} setCamera={setCamera} setPhoto={setPhoto} />
    );
  }
  return (
    <ScrollView>
      <RowBetween style={{margin: 15}}>
        <Text>Admission</Text>
      </RowBetween>
      <Picker
        selectedValue={presDetails.isAdmissionAdvised}
        onValueChange={(itemValue, itemIndex) =>
          setPresDetails({...presDetails, isAdmissionAdvised: itemValue})
        }>
        <Picker.Item value="" label="Select Admission" />
        <Picker.Item value="Initiate RFA" label="Initiate RFA" />
        <Picker.Item value="Follow Up Later" label="Follow Up Later" />
        <Picker.Item value="Not Advised" label="Not Advised" />
        <Picker.Item value="Not Interested" label="Not Interested" />
      </Picker>
      <Picker
        selectedValue={presDetails.doctor}
        onValueChange={(itemValue, itemIndex) =>
          setPresDetails({...presDetails, doctor: itemValue})
        }>
        <Picker.Item value="" label="Select Doctor" />
        <Picker.Item value="Dr. Ramesh Talwas" label="Dr. Ramesh Talwas" />
        <Picker.Item value="Dr. Naveen Jain" label="Dr. Naveen Jain" />
        <Picker.Item value="Dr. Kanti Jindal" label="Dr. Kanti Jindal" />
        <Picker.Item value="Dr. Seema Aggarwal" label="Dr. Seema Aggarwal" />
      </Picker>
      <RowBetween style={{margin: 15}}>
        <Text>Is PetCT Advised?</Text>
        <Pressable
          onPress={() =>
            setPresDetails({
              ...presDetails,
              isPetCTAdvised: !presDetails.isPetCTAdvised,
            })
          }>
          {presDetails.isPetCTAdvised ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <View style={{margin: 15}}>
        <Text>Diagnostics</Text>
        <RowBetween style={{margin: 15}}>
          <Text>CT</Text>
          <Pressable
            onPress={() =>
              setPresDetails({...presDetails, ct: !presDetails.ct})
            }>
            {presDetails.ct ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <RowBetween style={{margin: 15}}>
          <Text>MRI</Text>
          <Pressable
            onPress={() =>
              setPresDetails({...presDetails, mri: !presDetails.mri})
            }>
            {presDetails.mri ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <RowBetween style={{margin: 15}}>
          <Text>USG</Text>
          <Pressable
            onPress={() =>
              setPresDetails({...presDetails, usg: !presDetails.usg})
            }>
            {presDetails.usg ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <RowBetween style={{margin: 15}}>
          <Text>Others</Text>
          <Pressable
            onPress={() =>
              setPresDetails({...presDetails, others: !presDetails.others})
            }>
            {presDetails.others ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
      </View>
      <RowBetween style={{margin: 15}}>
        <Text>Radiology</Text>
        <Pressable
          onPress={() =>
            setPresDetails({
              ...presDetails,
              isRadiologyAdvised: !presDetails.isRadiologyAdvised,
            })
          }>
          {presDetails.isRadiologyAdvised ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <RowBetween style={{margin: 15}}>
        <Text>Dialysis</Text>
        <Pressable
          onPress={() =>
            setPresDetails({...presDetails, dialysis: !presDetails.dialysis})
          }>
          {presDetails.dialysis ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <TouchableOpacity
        onPress={() => setCamera(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'lightgray',
          padding: 10,
          margin: 10,
        }}>
        <Icon style={{marginHorizontal: 5}} name="camera" size={25} />
        <Text>{photo ? 'Captured' : 'Upload Prescription'}</Text>
      </TouchableOpacity>

      <Pressable
        style={{backgroundColor: 'lightblue', padding: 15, margin: 20}}
        onPress={() => UploadPrescription()}>
        <Text style={{textAlign: 'center'}}>Submit Quick Prescription</Text>
        <ActivityIndicator
          color="black"
          style={{display: loading ? 'flex' : 'none'}}
        />
      </Pressable>
    </ScrollView>
  );
};

export default QuickPrescriptionUpload;
