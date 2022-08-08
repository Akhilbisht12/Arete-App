import {View, ScrollView, Dimensions, ToastAndroid} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import silly from '../../Silly/styles/silly';
import {
  SillyButton,
  SillyLoad,
  SillyText,
  SillyView,
} from '../../Silly/components/silly_comps';
import {clr1, clr5} from '../../config/globals';
import {connect} from 'react-redux';
import {
  addDiagnostic,
  addDoctor,
  addSpeciality,
  adm_type,
  editIPDPackages,
  editStep,
  isAdm,
  isDiagnostics,
  isEst,
  rad_type,
  restoreState,
} from '../../store/actions/SAEstimatorActions';
import Estimator from './Estimator';
import {useNavigation} from '@react-navigation/native';
import CameraView from '../../components/atoms/CameraView';
import Doctor from './molecules/Doctor';
import {createAppointment} from './createAppointment';

const FullPrescription = ({
  advice,
  addDoctor,
  restoreState,
  addSpeciality,
  adm_type,
  rad_adv,
  editStep,
  isAdm,
  isEst,
  addDiagnostic,
  isDiagnostics,
  editIPDPackages,
}) => {
  const [photo, setPhoto] = useState();
  const [camera, setCamera] = useState();
  const navigation = useNavigation();
  const [diag, setdiag] = useState(new Map());
  const {width} = Dimensions.get('window');
  const [loading, setLoading] = useState(false);
  console.log(advice);
  const handlePresUpload = async () => {
    try {
      setLoading(true);
      await createAppointment();
      setLoading(false);
      ToastAndroid.show('Prescription Upload Successfully', ToastAndroid.SHORT);
      navigation.navigate('AgentIndex', {screen: 'Find'});
      restoreState({});
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    const set = [];
    diag.forEach((key, value) => {
      set.push(key);
    });
    addDiagnostic({
      set,
    });
  }, [diag, addDiagnostic]);
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollToEnd({animated: true});
  }, [advice.step]);
  const handleClickRadiation = () => {
    editIPDPackages({ipd: true});
  };
  const handlePreview = () => {
    if (advice.isIPDPackage && advice.packages.services.length === 0) {
      ToastAndroid.show('Please Add Package!', ToastAndroid.SHORT);
      return;
    } else if (advice.isIPDPackage && advice.packages.services[0]) {
      if (!advice.packages.services[0].name) {
        ToastAndroid.show('Please Add Package!', ToastAndroid.SHORT);
        return;
      }
    } else if (
      !advice.isIPDPackage &&
      advice.nonPackages.services.length === 0
    ) {
      ToastAndroid.show('Please Add Surgery!', ToastAndroid.SHORT);
      return;
    } else if (!advice.isIPDPackage && advice.nonPackages.services[0]) {
      if (!advice.nonPackages.services[0].name) {
        ToastAndroid.show('Please Add Surgery!', ToastAndroid.SHORT);
        return;
      }
    } else if (
      !advice.isIPDPackage &&
      !advice.ward &&
      !advice.icu.icu_type &&
      !advice.icu.days
    ) {
      ToastAndroid.show('Please Add Bed Details!', ToastAndroid.SHORT);
      return;
    } else if (!advice.pres) {
      ToastAndroid.show('Please Capture Prescription!', ToastAndroid.SHORT);
      return;
    }
    navigation.navigate('SAEstPrev', {photo});
  };
  return (
    <View style={[silly.f1]}>
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
                      isAdm({is_adm: item.value});
                      item.value ? editStep({step: 5}) : editStep({step: 20});
                    }}
                    bg={advice.is_adm === item.value ? clr1 : clr5}
                    key={i}>
                    <SillyText>{item.name}</SillyText>
                  </SillyButton>
                );
              })}
            </View>
          </SillyView>

          <SillyView
            style={[advice.step >= 5 && advice.is_adm ? {} : silly.dn]}>
            <SillyText color={clr1}>Type of Admission</SillyText>
            <View style={[silly.fr]}>
              {[
                {name: 'Surgery', value: 0},
                {name: 'Medical Management', value: 1},
                {name: 'Radiation', value: 2},
              ].map((item, i) => {
                return (
                  <SillyButton
                    px={10}
                    onPress={() => {
                      if (item.value === 2) {
                        adm_type({adm_type: item.name});
                        handleClickRadiation();
                      } else {
                        adm_type({adm_type: item.name});
                      }
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
          <SillyView
            style={[advice.step >= 6 && advice.is_adm ? {} : silly.dn]}>
            <SillyText color={clr1}>Want to create estimate?</SillyText>
            <View style={[silly.fr]}>
              {[
                {name: 'Yes', value: true},
                {name: 'No', value: false},
              ].map((item, i) => {
                return (
                  <SillyButton
                    onPress={() => {
                      isEst({is_est: item.value});
                      editStep({
                        step: item.value
                          ? advice.admission_type === 'Radiation'
                            ? 11
                            : 7
                          : 20,
                      });
                    }}
                    bg={advice.is_estimate === item.value ? clr1 : clr5}
                    key={i}>
                    <SillyText>{item.name}</SillyText>
                  </SillyButton>
                );
              })}
            </View>
          </SillyView>
          <View style={advice.is_adm && advice.is_estimate ? {} : silly.dn}>
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
                  bg={item.value === advice.is_diag ? clr1 : clr5}
                  onPress={() => {
                    isDiagnostics({is_diag: item.value});
                    advice.step >= 20
                      ? item.value
                        ? editStep({step: 21})
                        : editStep({step: 22})
                      : null;
                  }}>
                  <SillyText>{item.name}</SillyText>
                </SillyButton>
              );
            })}
          </View>
          <View style={[advice.is_diag ? {} : silly.dn, silly.myh]}>
            <SillyText color={clr1}>Select Prescribed Diagnostics</SillyText>
            <View style={[silly.fr, silly.myh]}>
              {[
                {name: 'CT Scan', id: 3856},
                {name: 'MRI', id: 3856},
                {name: 'PETCT', id: 3856},
              ].map((item, i) => {
                return (
                  <SillyButton
                    key={i}
                    bg={diag.has(item.name) ? clr1 : clr5}
                    onPress={() => {
                      if (diag.has(item.name)) {
                        setdiag(prev => {
                          prev.delete(item.name);
                          return new Map(prev);
                        });
                      } else {
                        setdiag(prev => {
                          prev.set(item.name, item);
                          return new Map(prev);
                        });
                      }
                      editStep({step: 22});
                    }}>
                    <SillyText>{item.name}</SillyText>
                  </SillyButton>
                );
              })}
            </View>
          </View>
        </SillyView>
        <SillyButton
          bg={[advice.pres ? 'green' : clr1]}
          style={[advice.step >= 22 ? {} : silly.dn]}
          onPress={() => {
            setCamera(true);
            editStep({step: 23});
          }}>
          <SillyText center size={18} my={2}>
            {photo ? 'Prescription Captured !!' : 'Capture Prescription'}
          </SillyText>
        </SillyButton>

        <View style={[advice.step >= 24 ? {} : silly.dn]}>
          {advice.is_estimate ? (
            <SillyButton onPress={handlePreview}>
              <SillyText center size={18} my={2}>
                Preview Estimate
              </SillyText>
            </SillyButton>
          ) : null}

          <SillyButton
            style={[advice.is_estimate ? silly.dn : {}]}
            onPress={handlePresUpload}>
            <SillyText center size={18} my={2}>
              Submit Prescription
            </SillyText>
          </SillyButton>
        </View>
      </ScrollView>
      <View
        px={0.01}
        style={[
          silly.l0,
          silly.t0,
          advice.step === 23 && camera ? silly.pa : silly.dn,
        ]}>
        <CameraView
          width={width}
          photo={photo}
          setPhoto={setPhoto}
          setCamera={setCamera}
        />
      </View>
      <SillyLoad show={loading} />
    </View>
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
    isAdm: item => dispatch(isAdm(item)),
    isEst: item => dispatch(isEst(item)),
    addDiagnostic: item => dispatch(addDiagnostic(item)),
    isDiagnostics: item => dispatch(isDiagnostics(item)),
    editIPDPackages: item => dispatch(editIPDPackages(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FullPrescription);
