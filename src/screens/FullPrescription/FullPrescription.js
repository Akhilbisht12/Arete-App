import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyButton,
  SillyText,
  SillyView,
} from '../../Silly/components/silly_comps';
import {clr1, clr5} from '../../config/globals';
import {connect} from 'react-redux';
import {
  addDoctor,
  addSpeciality,
  adm_type,
  editStep,
  rad_type,
  restoreState,
} from '../../store/actions/SAEstimatorActions';
import Estimator from './Estimator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CameraView from '../../components/atoms/CameraView';
import {SERVER_URL} from '../../config/variables';
import axios from 'axios';
import Doctor from './molecules/Doctor';
import {useEffect} from 'react';
import {useRef} from 'react';

const FullPrescription = ({
  advice,
  addDoctor,
  route,
  restoreState,
  addSpeciality,
  adm_type,
  rad_adv,
  editStep,
}) => {
  const patient = route.params.patientID;
  const [photo, setPhoto] = useState();
  const [camera, setCamera] = useState();
  const navigation = useNavigation();
  const [diag, setdiag] = useState(new Set());
  const [isdiag, setisdiag] = useState();
  const [pres, setPres] = useState({
    doctor: '',
    speciality: '',
    advise: '',
    medicines: [],
    diagnostics: [],
    admission: Boolean,
    estimate: Boolean,
  });
  const {width, height} = Dimensions.get('window');
  const [Prescription, setPrescription] = useState([]);
  const handleSearchService = async name => {
    try {
      if (name.length < 4) {
        setPrescription([]);
        return;
      }
      const services = await axios.post(
        `${SERVER_URL}/api/v1/content/service/find`,
        {
          name,
        },
      );
      console.log(services.data);
      setPrescription(services.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePresUpload = async () => {
    try {
      if (!pres.advise && !pres.doctor && !photo && !pres.admission) {
        ToastAndroid.show('Fill out details correctly');
        return;
      }

      const lead = new FormData();
      const admission = {...advice};
      pres.estimate;
      admission.isEstimate = pres.estimate;
      lead.append('advise', advice.diagnosis);
      lead.append('doctor', advice.doctor);
      lead.append('patient', patient);
      lead.append(
        'diagnostics',
        JSON.stringify(
          [...diag].map((item, i) => {
            return {name: item, id: i};
          }),
        ),
      );
      lead.append('admission', JSON.stringify(advice));
      lead.append('prescription', {
        uri: `file://${photo}`,
        type: 'image/jpg',
        name: 'Prescription',
      });
      for (const [k, v] of Object.entries(lead)) {
        console.log(k, v);
      }
      const presres = await axios.post(`${SERVER_URL}/api/v1/lead/`, lead, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(presres.data);
      ToastAndroid.show('Prescription Upload Successfully', ToastAndroid.SHORT);
      restoreState({});
      navigation.navigate('AgentIndex', {screen: 'Find'});
    } catch (error) {
      console.log(error.response);
    }
  };
  const scrollRef = useRef();
  console.log(advice);
  useEffect(() => {
    scrollRef.current.scrollToEnd({animated: true});
  }, [advice.step]);
  return (
    <ScrollView ref={scrollRef} contentContainerStyle={[silly.p1, silly.fg1]}>
      <SillyText size={25} color={clr1}>
        FullPrescription
      </SillyText>
      <View style={[silly.my1]}>
        <Doctor />
        <SillyView style={[advice.step >= 3 ? {} : silly.dn]}>
          <SillyText color={clr1}>Admission Advised</SillyText>
          <View style={[silly.fr]}>
            {[
              {name: 'Yes', value: true},
              {name: 'No', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => {
                    setPres({...pres, admission: item.value});
                    advice.step > 4 ? null : editStep({step: 4});
                  }}
                  bg={pres.admission === item.value ? clr1 : clr5}
                  key={i}>
                  <SillyText>{item.name}</SillyText>
                </SillyButton>
              );
            })}
          </View>
        </SillyView>
        <SillyView style={[advice.step >= 4 ? {} : silly.dn]}>
          <SillyText color={clr1}>Is Radiation advised?</SillyText>
          <View style={[silly.fr]}>
            {[
              {name: 'Yes', value: true},
              {name: 'No', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => {
                    rad_adv({rad_adv: item.value});
                    advice.step > 5
                      ? null
                      : editStep({step: pres.admission ? 5 : 20});
                  }}
                  bg={advice.radiation === item.value ? clr1 : clr5}
                  key={i}>
                  <SillyText>{item.name}</SillyText>
                </SillyButton>
              );
            })}
          </View>
        </SillyView>
        <SillyView style={[advice.step >= 5 && pres.admission ? {} : silly.dn]}>
          <SillyText color={clr1}>Type of Admission</SillyText>
          <View style={[silly.fr]}>
            {[
              {name: 'Surgery', value: true},
              {name: 'Medical Management', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => {
                    adm_type({adm_type: item.name});
                    editStep({step: 6});
                  }}
                  bg={advice.admission_type === item.name ? clr1 : clr5}
                  key={i}>
                  <SillyText>{item.name}</SillyText>
                </SillyButton>
              );
            })}
          </View>
        </SillyView>
        <SillyView style={[advice.step >= 6 && pres.admission ? {} : silly.dn]}>
          <SillyText color={clr1}>Want to create estimate?</SillyText>
          <View style={[silly.fr]}>
            {[
              {name: 'Yes', value: true},
              {name: 'No', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => {
                    setPres({...pres, estimate: item.value});
                    editStep({step: item.value ? 7 : 20});
                  }}
                  bg={pres.estimate === item.value ? clr1 : clr5}
                  key={i}>
                  <SillyText>{item.name}</SillyText>
                </SillyButton>
              );
            })}
          </View>
        </SillyView>
        <View style={pres.admission && pres.estimate ? {} : silly.dn}>
          <Estimator />
        </View>
      </View>

      {/* Diagnostics */}
      <SillyView style={[advice.step >= 20 ? {} : silly.dn]}>
        <SillyText color={clr1}>Is Diagnostics Prescriped</SillyText>
        <View style={[silly.fr]}>
          {[
            {name: 'Yes', value: true},
            {name: 'No', value: false},
          ].map((item, i) => {
            return (
              <SillyButton
                style={[silly.myh]}
                key={i}
                bg={item.value === isdiag ? clr1 : clr5}
                onPress={() => {
                  setisdiag(item.value);
                  advice.step >= 20 ? editStep({step: 21}) : null;
                }}>
                <SillyText>{item.name}</SillyText>
              </SillyButton>
            );
          })}
        </View>
        <View style={[isdiag ? {} : silly.dn, silly.myh]}>
          <SillyText color={clr1}>Select Prescribed Diagnostics</SillyText>
          <View style={[silly.fr, silly.myh]}>
            {['CT Scan', 'MRI', 'Scan'].map((item, i) => {
              return (
                <SillyButton
                  key={i}
                  bg={diag.has(item) ? clr1 : clr5}
                  onPress={() => {
                    if (diag.has(item)) {
                      setdiag(prev => {
                        prev.delete(item);
                        return new Set(prev);
                      });
                    } else {
                      setdiag(prev => {
                        prev.add(item);
                        return new Set(prev);
                      });
                    }
                  }}>
                  <SillyText>{item}</SillyText>
                </SillyButton>
              );
            })}
          </View>
        </View>
      </SillyView>
      <SillyView style={[silly.aic, advice.step >= 21 ? {} : silly.dn]}>
        <CameraView
          width={width * 0.92}
          photo={photo}
          setPhoto={setPhoto}
          setCamera={setCamera}
        />
      </SillyView>
      <View style={[advice.step >= 21 ? {} : silly.dn]}>
        {pres.estimate ? (
          <SillyButton
            onPress={() => navigation.navigate('SAEstPrev', {photo})}>
            <SillyText center size={18} my={2}>
              Preview Estimate
            </SillyText>
          </SillyButton>
        ) : null}

        <SillyButton onPress={handlePresUpload}>
          <SillyText center size={18} my={2}>
            Submit Prescription
          </SillyText>
        </SillyButton>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDoctor: item => dispatch(addDoctor(item)),
    restoreState: item => dispatch(restoreState(item)),
    addSpeciality: item => dispatch(addSpeciality(item)),
    adm_type: item => dispatch(adm_type(item)),
    rad_adv: item => dispatch(rad_type(item)),
    editStep: item => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FullPrescription);
