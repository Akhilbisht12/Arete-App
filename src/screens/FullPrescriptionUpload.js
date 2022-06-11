import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addDoctor, addTreatment} from '../store/actions/adviceAction';
import React, {useState} from 'react';
import {SERVER_URL} from '../config/variables';
import {Picker} from '@react-native-picker/picker';
import {Row, RowEven} from '../styles/FlexView';
import {
  SillyButton,
  SillyText,
  SillyInput,
} from '../Silly/components/silly_comps';
import DiagnosticsMap from './Estimater/molecules/DiagnosticsMap';
import MedicineMap from './Estimater/molecules/MedicineMap';
import CameraView from '../components/atoms/CameraView';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const FullPrescriptionUpload = ({
  route,
  advice,
  addDoctor,
  item,
  addTreatment,
}) => {
  const [selectDiagnostics, setSelectDiagnostics] = useState();
  const [selectAdmission, setSelectAdmission] = useState();
  const [diseaseName, setDiseaseName] = useState();
  const [camera, setCamera] = useState(false);
  const [photo, setPhoto] = useState('');
  const [doctor, setDoctor] = useState();
  const [medicine, setMedicine] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [estimate, setEstimate] = useState(false);

  const handleEstimator = () => {
    setEstimate(true);
    navigation.navigate('CreateEstimate', {
      data: selectAdmission,
      patientID: route.params.patientID,
    });
  };

  const handleUploadPrescription = async () => {
    setLoading(true);
    const formdata = new FormData();
    const patientID = route.params.patientID;
    const admission = {
      isAdmission: selectAdmission,
      ward_days: advice.ward,
      icu_days: advice.icu,
      packaged: advice.isIPDPackage,
      stent: advice.stent,
      blood: advice.blood,
      oth: advice.othTotal,
      investigation: {
        total: advice.investigationTotal,
        services: advice.investigations.map(item => {
          return {name: item.Service_Name, id: item.ServiceId};
        }),
      },
      procedure: {
        total: advice.procedureTotal,
        services: advice.procedures.map(item => {
          return {name: item.Service_Name, id: item.ServiceId};
        }),
      },
    };
    const diagnostics = advice.diagnostic.map(item => {
      return {name: item.Service_Name, id: item.ServiceId};
    });
    // const radiology = advice.radiology;
    const medicines = [];
    console.log(admission);
    formdata.append('prescription', {
      uri: `file://${photo}`,
      name: `${'Prescription' + 'on' + Date.now()}`,
      type: 'image/jpg',
    });
    formdata.append('patientID', patientID);
    formdata.append('advise', diseaseName);
    formdata.append('doctor', doctor);
    formdata.append('admission', JSON.stringify(admission));
    formdata.append('diagnostics', JSON.stringify(diagnostics));
    formdata.append('medicines', JSON.stringify(medicines));

    if (!(diseaseName && doctor && diagnostics)) {
      ToastAndroid.show(
        'Capture Prescription, Select Doctor, Select Diagnostic, Enter Disease',
        ToastAndroid.SHORT,
      );
    }
    console.log(formdata);
    try {
      const uploadData = await fetch(
        `${SERVER_URL}/api/v1/patient/newAppointment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata,
        },
      ).then(response => {
        console.log(response.data);
        if (response.status === 200) {
          setLoading(false);
          ToastAndroid.show(
            'Prescription Uploaded Successfully',
            ToastAndroid.SHORT,
          );
          navigation.navigate('Find');
        }
      });
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
    <View>
      <ScrollView style={{height: height * 0.82}}>
        <View style={styles.card}>
          <SillyText color="black" family="Bold" my={7} mx={7}>
            Enter Disease Name
          </SillyText>
          <SillyInput
            placeholder="Disease Name (Press Enter)"
            style={{padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5}}
            onSubmitEditing={e => {
              setDiseaseName(e.nativeEvent.text);
              addTreatment({treatment: e.nativeEvent.text});
            }}
          />
          <Row>
            <SillyText color="black" family="Bold" my={7} mx={7}>
              Treatment For:{' '}
              <SillyText color="black" style={{color: 'red'}}>
                {diseaseName}
              </SillyText>
            </SillyText>
          </Row>
          <Picker
            selectedValue={doctor}
            onValueChange={itemValue => {
              addDoctor({doctor: itemValue});
              setDoctor(itemValue);
            }}
            style={{
              width: width * 0.85,
              fontFamily: 'Poppins-Medium',
              color: 'black',
            }}>
            <Picker.Item value="" label="Select Doctor" />
            <Picker.Item value="Dr. Ramesh Talwas" label="Dr. Ramesh Talwas" />
            <Picker.Item value="Dr. Naveen Jain" label="Dr. Naveen Jain" />
            <Picker.Item value="Dr. Kanti Jindal" label="Dr. Kanti Jindal" />
            <Picker.Item
              value="Dr. Seema Aggarwal"
              label="Dr. Seema Aggarwal"
            />
          </Picker>
        </View>
        <View style={styles.card}>
          <RowEven>
            <SillyText color="black" style={{fontFamily: 'Poppins-Bold'}}>
              Admission Advised ?
            </SillyText>
            {[
              {title: 'Yes', value: true},
              {title: 'No', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => setSelectAdmission(item.value)}
                  bg={selectAdmission === item.value ? '#030027' : '#f5f5f5'}
                  key={i}>
                  <SillyText
                    color={selectAdmission == item.value ? 'white' : 'black'}>
                    {item.title}
                  </SillyText>
                </SillyButton>
              );
            })}
          </RowEven>
          <View
            style={{
              display: `${selectAdmission == true ? 'flex' : 'none'}`,
              flexDirection: 'row',
            }}>
            <Row
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: width * 0.9,
                marginVertical: 10,
              }}>
              {estimate == false ? (
                <Pressable
                  style={{
                    width: width * 0.85,
                    backgroundColor: 'olive',
                    paddingHorizontal: 5,
                    paddingVertical: 15,
                    borderRadius: 7,
                  }}
                  onPress={handleEstimator}>
                  <SillyText
                    color="black"
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'Poppins-Bold',
                    }}>
                    Create Estimate Here
                  </SillyText>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    width: width * 0.85,
                    backgroundColor: 'orange',
                    paddingHorizontal: 5,
                    paddingVertical: 15,
                    borderRadius: 7,
                  }}>
                  <SillyText
                    color="black"
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'Poppins-Bold',
                    }}>
                    Preview Estimate
                  </SillyText>
                </Pressable>
              )}
            </Row>
          </View>
        </View>
        <View style={[styles.card]}>
          <RowEven>
            <SillyText color="black" style={{fontFamily: 'Poppins-Bold'}}>
              Diagnostics Advised ?
            </SillyText>
            {[
              {title: 'Yes', value: true},
              {title: 'No', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => setSelectDiagnostics(item.value)}
                  bg={selectDiagnostics === item.value ? '#030027' : '#f5f5f5'}
                  key={i}>
                  <SillyText
                    color={selectDiagnostics == item.value ? 'white' : 'black'}>
                    {item.title}
                  </SillyText>
                </SillyButton>
              );
            })}
          </RowEven>
          <View
            style={{
              display: `${selectDiagnostics == true ? 'flex' : 'none'}`,
              flexDirection: 'row',
            }}>
            <DiagnosticsMap />
          </View>
        </View>
        <View style={styles.card}>
          <RowEven>
            <SillyText color="black" style={{fontFamily: 'Poppins-Bold'}}>
              Medicines Advised ?
            </SillyText>
            {[
              {title: 'Yes', value: true},
              {title: 'No', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => setMedicine(item.value)}
                  bg={medicine === item.value ? '#030027' : '#f5f5f5'}
                  key={i}>
                  <SillyText color={medicine == item.value ? 'white' : 'black'}>
                    {item.title}
                  </SillyText>
                </SillyButton>
              );
            })}
          </RowEven>
          <View
            style={{
              display: `${medicine == true ? 'flex' : 'none'}`,
              flexDirection: 'row',
            }}>
            <MedicineMap />
          </View>
        </View>
        <View style={styles.card}>
          <Pressable
            style={{
              flexDirection: 'row',
              padding: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setCamera(true);
            }}>
            <Icon name={'attach'} size={25} />
            <SillyText color="black" style={{fontFamily: 'Poppins-Bold'}}>
              {photo ? 'Attached Prescription' : 'Attach Prescription'}
            </SillyText>
          </Pressable>
          <View
            style={{height: height * 0.3, display: photo ? 'flex' : 'none'}}>
            <Image
              source={{uri: `file://${photo}`}}
              style={{height: height * 0.3, borderRadius: 5}}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: height * 0.1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={handleUploadPrescription}
          style={{
            width: width * 0.85,
            height: height * 0.08,
            backgroundColor: '#030027',
            paddingHorizontal: 5,
            paddingVertical: 15,
            borderRadius: 7,
          }}>
          <SillyText
            color="black"
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Poppins-Bold',
            }}>
            Upload Prescription
          </SillyText>
          <ActivityIndicator
            animating={loading}
            color={'white'}
            size={'small'}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 7,
    shadowColor: 'grey',
  },
  service: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: 'lightgray',
    marginVertical: 2,
    borderRadius: 5,
  },
  badge: {
    backgroundColor: 'blue',
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    margin: 2,
  },
  input: {
    width: width * 0.2,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
});
const mapStateToProps = state => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDoctor: item => dispatch(addDoctor(item)),
    addTreatment: item => dispatch(addTreatment(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FullPrescriptionUpload);
