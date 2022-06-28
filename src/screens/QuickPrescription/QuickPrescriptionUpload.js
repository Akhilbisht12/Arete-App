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
  Dimensions,
} from 'react-native';
import {RowBetween} from '../../styles/FlexView';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {SERVER_URL} from '../../config/variables';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import CameraView from '../../components/atoms/CameraView';
import silly from '../../Silly/styles/silly';
import {SillyText, SillyButton} from '../../Silly/components/silly_comps';
import {clr1} from '../../config/globals';

const {width} = Dimensions.get('window');

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
  const [camera, setCamera] = useState(true);
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
      let quickPres = {
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
      };
      formdata.append('quickPres', JSON.stringify(quickPres));
      formdata.append('patient', patientID);
      formdata.append('prescription', {
        uri: `file://${photo}`,
        type: 'image/jpg',
        name: 'Prescription',
      });
      const pres = await axios.post(
        `${SERVER_URL}/api/v1/lead/quick`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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
      console.log(error.response);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView contentContainerStyle={[silly.fg1]}>
      <View style={[silly.f1]}>
        <View style={[silly.fr, silly.aic, silly.jcbtw]}>
          <Text>Admission</Text>
        </View>
        <Picker
          style={{color: clr1}}
          selectedValue={presDetails.isAdmissionAdvised}
          onValueChange={(itemValue, itemIndex) =>
            setPresDetails({...presDetails, isAdmissionAdvised: itemValue})
          }>
          <Picker.Item value="" label="Select Admission" />
          <Picker.Item value="rfa" label="Initiate RFA" />
          <Picker.Item value="follow_up" label="Follow Up Later" />
          <Picker.Item value="not_advised" label="Not Advised" />
          <Picker.Item value="not_intrested" label="Not Interested" />
        </Picker>
        <Picker
          style={{color: clr1}}
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
          <SillyText color={clr1}>Is PetCT Advised?</SillyText>
          <Pressable
            onPress={() =>
              setPresDetails({
                ...presDetails,
                isPetCTAdvised: !presDetails.isPetCTAdvised,
              })
            }>
            {presDetails.isPetCTAdvised ? (
              <Icon size={25} color={clr1} name="checkbox-outline" />
            ) : (
              <Icon size={25} color={clr1} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <View style={{margin: 15}}>
          <SillyText color={clr1}>Diagnostics</SillyText>
          <RowBetween style={{margin: 15}}>
            <SillyText color={clr1}>CT</SillyText>
            <Pressable
              onPress={() =>
                setPresDetails({...presDetails, ct: !presDetails.ct})
              }>
              {presDetails.ct ? (
                <Icon size={25} color={clr1} name="checkbox-outline" />
              ) : (
                <Icon size={25} color={clr1} name="square-outline" />
              )}
            </Pressable>
          </RowBetween>
          <RowBetween style={{margin: 15}}>
            <SillyText color={clr1}>MRI</SillyText>
            <Pressable
              onPress={() =>
                setPresDetails({...presDetails, mri: !presDetails.mri})
              }>
              {presDetails.mri ? (
                <Icon color={clr1} size={25} name="checkbox-outline" />
              ) : (
                <Icon color={clr1} size={25} name="square-outline" />
              )}
            </Pressable>
          </RowBetween>
          <RowBetween style={{margin: 15}}>
            <SillyText color={clr1}>USG</SillyText>
            <Pressable
              onPress={() =>
                setPresDetails({...presDetails, usg: !presDetails.usg})
              }>
              {presDetails.usg ? (
                <Icon color={clr1} size={25} name="checkbox-outline" />
              ) : (
                <Icon color={clr1} size={25} name="square-outline" />
              )}
            </Pressable>
          </RowBetween>
          <RowBetween style={{margin: 15}}>
            <SillyText color={clr1}>Others</SillyText>
            <Pressable
              onPress={() =>
                setPresDetails({...presDetails, others: !presDetails.others})
              }>
              {presDetails.others ? (
                <Icon color={clr1} size={25} name="checkbox-outline" />
              ) : (
                <Icon color={clr1} size={25} name="square-outline" />
              )}
            </Pressable>
          </RowBetween>
        </View>
        <RowBetween style={{margin: 15}}>
          <SillyText color={clr1}>Radiology</SillyText>
          <Pressable
            onPress={() =>
              setPresDetails({
                ...presDetails,
                isRadiologyAdvised: !presDetails.isRadiologyAdvised,
              })
            }>
            {presDetails.isRadiologyAdvised ? (
              <Icon color={clr1} size={25} name="checkbox-outline" />
            ) : (
              <Icon color={clr1} size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <RowBetween style={{margin: 15}}>
          <SillyText color={clr1}>Dialysis</SillyText>
          <Pressable
            onPress={() =>
              setPresDetails({...presDetails, dialysis: !presDetails.dialysis})
            }>
            {presDetails.dialysis ? (
              <Icon color={clr1} size={25} name="checkbox-outline" />
            ) : (
              <Icon color={clr1} size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <View style={[silly.aic]}>
          <CameraView
            width={width * 0.92}
            photo={photo}
            setCamera={setCamera}
            setPhoto={setPhoto}
          />
        </View>

        <SillyButton my={20} mx={15} onPress={() => UploadPrescription()}>
          <SillyText my={5} style={{textAlign: 'center'}}>
            Submit Quick Prescription
          </SillyText>
          <ActivityIndicator
            color="black"
            style={{display: loading ? 'flex' : 'none'}}
          />
        </SillyButton>
      </View>
    </ScrollView>
  );
};

export default QuickPrescriptionUpload;
