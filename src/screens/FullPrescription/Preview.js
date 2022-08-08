import {View, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import silly from '../../Silly/styles/silly';
import {ScrollView} from 'react-native-gesture-handler';
import logo from '../../../assets/logo/logo.png';
import {connect} from 'react-redux';
import {
  SillyText,
  SillyView,
  SillyButton,
  SillyLoad,
} from '../../Silly/components/silly_comps';
import {clr1} from '../../config/globals';
import axios from 'axios';
import {SERVER_URL} from '../../config/variables';
import {createAppointment} from './createAppointment';
import {restoreState} from '../../store/actions/SAEstimatorActions';
const Preview = ({estimate, navigation, restoreState}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createAppointment();
      setLoading(false);
      ToastAndroid.show('Prescription Upload Successfully', ToastAndroid.SHORT);
      navigation.navigate('AgentIndex', {screen: 'Find'});
    } catch (error) {
      setLoading(false);
    }
  };
  const [ward, setWard] = useState([]);
  useEffect(() => {
    const roomreq = async () => {
      try {
        const roomres = await axios.get(
          `${SERVER_URL}/api/v1/platform/settings/wards/`,
          {
            headers: {
              'Cache-Control': 'no-cache',
            },
          },
        );
        setWard(roomres.data);
      } catch (error) {
        console.log(error);
      }
    };
    roomreq();
  }, []);
  const calcRoom = code => {
    const reqroom = ward.find(room => room.code === code);
    return estimate.ward * reqroom ? reqroom.rent : 0;
  };
  const calcPackage = code => {
    let total = 0;
    if (estimate.isIPDPackage) {
      estimate.packages.services.map(item => {
        for (const [k, v] of Object.entries(item.room)) {
          if (k === code) {
            total = total + v;
          }
        }
      });
    }
    return total;
  };
  const calcNonPackage = code => {
    let total = 0;
    if (!estimate.isIPDPackage) {
      estimate.nonPackages.services.map(item => {
        for (const [k, v] of Object.entries(item.room)) {
          if (k === code) {
            total = total + v + 0.9 * v + 0.3 * v + 0.35 * v + 0.15 * v;
          }
        }
      });
    }
    return Math.round(total);
  };
  const getOtherTotal = () => {
    let total = 0;
    for (const [k, v] of Object.entries(estimate.other)) {
      total = total + v;
    }
    return total;
  };
  const calcInvestigations = code => {
    let total = 0;
    estimate.investigations.services.map(item => {
      for (const [k, v] of Object.entries(item.room)) {
        if (k === code) {
          total = total + v;
        }
      }
    });
    return total + estimate.investigations.total.value;
  };
  const calcProcedures = code => {
    let total = 0;
    estimate.procedures.services.map(item => {
      for (const [k, v] of Object.entries(item.room)) {
        if (k === code) {
          total = total + v;
        }
      }
    });
    return total + estimate.procedures.total.value;
  };
  const calcOBH = code => {
    let total = 0;
    estimate.misc.services.map(item => {
      for (const [k, v] of Object.entries(item.room)) {
        if (k === code) {
          total = total + v;
        }
      }
    });
    return total;
  };
  const calcDoctorVisit = ({visit, emergency_visit}) => {
    if (estimate.isEmergency) {
      return estimate.ward * emergency_visit;
    } else {
      return estimate.ward * visit;
    }
  };

  const calcTotal = ({code, visit, emergency_visit}) => {
    let total =
      JSON.parse(calcRoom(code)) +
      JSON.parse(calcPackage(code)) +
      JSON.parse(calcNonPackage(code)) +
      JSON.parse(getOtherTotal()) +
      JSON.parse(calcInvestigations(code)) +
      JSON.parse(calcProcedures(code)) +
      JSON.parse(calcOBH(code)) +
      JSON.parse(calcDoctorVisit({visit, emergency_visit}));
    return total;
  };
  return (
    <View style={[silly.fr]}>
      <ScrollView style={[silly.p1]}>
        <View style={[silly.fr, silly.jcbtw, silly.aic]}>
          <View style={[silly.w30p]}>
            <Image style={[silly.w10p, silly.h5p, silly.rmcon]} source={logo} />
          </View>
          <View style={[silly.w30p]}>
            <SillyText family="Bold" color={clr1}>
              Estimate Form
            </SillyText>
          </View>
          <View style={[silly.w30p, silly.aie]}>
            <SillyText color={clr1}>Form ID : 1122</SillyText>
          </View>
        </View>
        <SillyView py={1} />
        <View style={[silly.bw1, silly.br10, silly.ph]}>
          <SillyText family="Bold" color={clr1}>
            Admission Detail
          </SillyText>
          <View style={[]}>
            {[
              {
                name: 'Patient Name',
                value:
                  estimate.patient.firstName + ' ' + estimate.patient.lastName,
              },
              {name: 'Age', value: estimate.patient.age},
              {
                name: 'Doctor',
                value: estimate.doctor + ' / ' + estimate.speciality,
              },
            ].map((item, i) => {
              return (
                <View key={i} style={[silly.fr]}>
                  <SillyText style={[silly.mr1]} color={clr1} family="Medium">
                    {item.name} :
                  </SillyText>
                  <SillyText color={clr1}>{item.value}</SillyText>
                </View>
              );
            })}
            {[
              {name: 'Email', value: estimate.patient.email, display: true},
              {name: 'Phone', value: estimate.patient.phone, display: true},
              {name: 'Gender', value: estimate.patient.gender, display: true},
              {
                name: 'Days to Stay',
                value: estimate.ward + estimate.icu.days,
                display: estimate.isIPDPackage ? false : true,
              },
              {
                name: 'Ward Stay',
                value: estimate.ward,
                display: estimate.isIPDPackage ? false : true,
              },
              {
                name: 'ICU/CCU Stay',
                value: estimate.icu.days,
                display: estimate.isIPDPackage ? false : true,
              },
            ].map((item, i) => {
              return (
                <View key={i} style={[silly.fr, item.display ? {} : silly.dn]}>
                  <SillyText style={[silly.mr1]} color={clr1} family="Medium">
                    {item.name} :
                  </SillyText>
                  <SillyText color={clr1}>{item.value}</SillyText>
                </View>
              );
            })}
          </View>
          <View style={[silly.my1]}>
            <SillyView style={[]}>
              <SillyText style={[silly.mr1]} color={clr1} family="Medium">
                {estimate.isIPDPackage ? 'Package Name :' : 'Surgery Name :'}
              </SillyText>
              <SillyText color={clr1}>
                {estimate.isIPDPackage
                  ? estimate.packages.services[0].name
                  : estimate.nonPackages.services[0].name}
              </SillyText>
            </SillyView>
          </View>
        </View>
        <View style={[silly.mb3]}>
          <SillyText family="Bold" color={clr1}>
            Estimated Expenditure
          </SillyText>
          <View>
            {ward.map((item, i) => {
              return (
                <View
                  key={i}
                  style={[silly.mh, silly.bw1, silly.br10, silly.ph]}>
                  <SillyText color={clr1} size={16} family="Bold">
                    {item.name}
                  </SillyText>
                  <View style={[estimate.isIPDPackage ? silly.dn : {}]}>
                    <View style={[silly.fr]}>
                      <SillyText
                        family="Medium"
                        style={[silly.mr1]}
                        color={clr1}>
                        Room Charges:
                      </SillyText>
                      <SillyText color={clr1}>
                        {item.rent * estimate.ward} INR
                      </SillyText>
                    </View>
                  </View>
                  <View>
                    <View style={[silly.fr]}>
                      <SillyText
                        family="Medium"
                        style={[silly.mr1]}
                        color={clr1}>
                        Surgery/Package Charges:
                      </SillyText>
                      <SillyText color={clr1}>
                        {estimate.isIPDPackage
                          ? calcPackage(item.code)
                          : calcNonPackage(item.code)}{' '}
                        INR
                      </SillyText>
                    </View>
                  </View>
                  <View>
                    <View style={[silly.fr]}>
                      <SillyText
                        family="Medium"
                        style={[silly.mr1]}
                        color={clr1}>
                        Stent / Medicine / Blood / Equipment:
                      </SillyText>
                      <SillyText color={clr1}>{getOtherTotal()} INR</SillyText>
                    </View>
                  </View>
                  <View>
                    <View style={[silly.fr]}>
                      <SillyText
                        family="Medium"
                        style={[silly.mr1]}
                        color={clr1}>
                        Investigation:
                      </SillyText>
                      <SillyText color={clr1}>
                        {calcInvestigations(item.code)} INR
                      </SillyText>
                    </View>
                  </View>
                  <View>
                    <View style={[silly.fr]}>
                      <SillyText
                        family="Medium"
                        style={[silly.mr1]}
                        color={clr1}>
                        Procedures:
                      </SillyText>
                      <SillyText color={clr1}>
                        {calcProcedures(item.code)} INR
                      </SillyText>
                    </View>
                  </View>
                  <View>
                    <View style={[silly.fr]}>
                      <SillyText
                        family="Medium"
                        style={[silly.mr1]}
                        color={clr1}>
                        Other Billing Heads:
                      </SillyText>
                      <SillyText color={clr1}>
                        {calcOBH(item.code)} INR
                      </SillyText>
                    </View>
                  </View>
                  <View style={[estimate.isIPDPackage ? silly.dn : {}]}>
                    <View style={[silly.fr]}>
                      <SillyText
                        family="Medium"
                        style={[silly.mr1]}
                        color={clr1}>
                        Doctor Visit Charges:
                      </SillyText>
                      <SillyText color={clr1}>
                        {calcDoctorVisit({
                          visit: item.visit,
                          emergency_visit: item.emergency_visit,
                        })}{' '}
                        INR
                      </SillyText>
                    </View>
                  </View>
                  <SillyView style={[silly.fr]}>
                    <SillyText family="Bold" style={[silly.mr1]} color={clr1}>
                      Total Estimate:
                    </SillyText>
                    <SillyText color={clr1}>
                      {calcTotal({
                        code: item.code,
                        visit: item.visit,
                        emergency_visit: item.emergency_visit,
                      })}{' '}
                      INR
                    </SillyText>
                  </SillyView>
                </View>
              );
            })}
          </View>
          <SillyView>
            <Image
              style={[silly.w90p, silly.h60p, silly.rmcon]}
              source={{uri: `file://${estimate.pres}`}}
            />
          </SillyView>
          <SillyButton onPress={handleSubmit}>
            <SillyText center>Submit Prescription</SillyText>
          </SillyButton>
        </View>
      </ScrollView>
      <SillyLoad show={loading} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    estimate: state.SAEst,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restoreState: item => dispatch(restoreState(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
