import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import silly from '../../Silly/styles/silly';
import {ScrollView} from 'react-native-gesture-handler';
import logo from '../../../assets/logo/logo.png';
import {connect} from 'react-redux';
import {
  SillyText,
  SillyView,
  SillyButton,
} from '../../Silly/components/silly_comps';
import {clr1} from '../../config/globals';
import axios from 'axios';
import {SERVER_URL} from '../../config/variables';
const Preview = ({estimate}) => {
  const [ward, setWard] = useState([]);
  useEffect(() => {
    const roomreq = async () => {
      try {
        const roomres = await axios.get(
          `${SERVER_URL}/api/v1/platform/settings/wards/`,
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
        for (const [k, v] of Object.entries(item)) {
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
    return total;
  };
  const getOtherTotal = () => {
    let total = 0;
    for (const [k, v] of Object.entries(estimate.other)) {
      total = total + v;
    }
    return total;
  };
  const calcInvestigations = code => {
    if (estimate.investigations.total.calc) {
      return estimate.investigations.total.value;
    } else {
      let total = 0;
      estimate.investigations.services.map(item => {
        for (const [k, v] of Object.entries(item.room)) {
          if (k === code) {
            total = total + v;
          }
        }
      });
      return total;
    }
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
      calcRoom(code) +
      calcPackage(code) +
      calcNonPackage(code) +
      getOtherTotal() +
      calcInvestigations(code) +
      calcDoctorVisit({visit, emergency_visit});
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
          <View style={[silly.fr, silly.jcbtw]}>
            <View style={[silly.w45p]}>
              {[
                {name: 'Patient Name', value: estimate.name},
                {name: 'Age', value: estimate.age},
                {name: 'Doctor', value: estimate.doctor},
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
            </View>
            <View style={[silly.w45p]}>
              {[
                {name: 'Email', value: estimate.email},
                {name: 'Phone', value: estimate.phone},
                {name: 'Gender', value: estimate.gender},
                {
                  name: 'Days to Stay',
                  value: estimate.ward + estimate.icu.days,
                },
                {name: 'Ward Stay', value: estimate.ward},
                {name: 'ICU/CCU Stay', value: estimate.icu.days},
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
            </View>
          </View>
          <View style={[silly.my1]}>
            <SillyView style={[silly.fr]}>
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
        <View>
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
                  <View>
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
                        investigation:
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
        </View>
        <View style={[silly.fr, silly.jcbtw, silly.my2]}>
          <SillyButton>
            <SillyText>Share on WhatsApp</SillyText>
          </SillyButton>
          <SillyButton>
            <SillyText>Share on Email</SillyText>
          </SillyButton>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    estimate: state.SAEst,
  };
};

export default connect(mapStateToProps)(Preview);
