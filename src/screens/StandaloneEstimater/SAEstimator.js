import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {SERVER_URL} from '../../config/variables';
import {View, Dimensions, ScrollView} from 'react-native';
import {
  addDoctor,
  addRemark,
  addVisitTotal,
  editStep,
} from '../../store/actions/SAEstimatorActions';
import {useNavigation} from '@react-navigation/native';
import SurgeryMap from './molecules/SurgeryMap';
import InvestigationMap from './molecules/InvestigationMap';
import ProcedureMap from './molecules/ProcedureMap';
import PackageMap from './molecules/PackageMap';
import EstimateType from './molecules/EstimateType';
import BedWidget from './molecules/BedWidget';
import EmergencyWidget from './molecules/EmergencyWidget';
import PaymentWidget from './molecules/PaymentWidget';
import MultiCharges from './molecules/MultiCharges';
import {Picker} from '@react-native-picker/picker';
import {doctorVisitCharges} from '../../utils/EstimateCalculator';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import PersonalDetails from './molecules/PersonalDetails';
import CameraView from '../../components/atoms/CameraView';

const {width} = Dimensions.get('window');

const SAEstimator = ({advice, addDoctor, editStep}) => {
  const [photo, setPhoto] = useState();
  const [camera, setCamera] = useState();
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollToEnd({animated: true});
    if (advice.step === 5) {
      addVisitTotal({visitTotal: doctorVisitCharges()});
    }
  }, [advice.step]);

  console.log(advice);
  return (
    <ScrollView ref={scrollRef} contentContainerStyle={[silly.jce, silly.fg1]}>
      <View style={[silly.my2, silly.p1, silly.jce]}>
        <PersonalDetails />
        <EstimateType />
        <BedWidget />
        <EmergencyWidget />
        <SillyView style={[advice.step >= 6 ? {} : silly.dn]}>
          <View style={[silly.ais]}>
            <SillyText my={10} color="black">
              {' '}
              Type Doctor's Name
            </SillyText>
            <Picker
              selectedValue={advice.doctor}
              onValueChange={itemValue => addDoctor({doctor: itemValue})}
              style={{
                width: width * 0.85,
                color: 'black',
              }}>
              <Picker.Item value="" label="Select Doctor" />
              <Picker.Item
                value="Dr. Ramesh Talwas"
                label="Dr. Ramesh Talwas"
              />
              <Picker.Item value="Dr. Naveen Jain" label="Dr. Naveen Jain" />
              <Picker.Item value="Dr. Kanti Jindal" label="Dr. Kanti Jindal" />
              <Picker.Item
                value="Dr. Seema Aggarwal"
                label="Dr. Seema Aggarwal"
              />
            </Picker>
          </View>
        </SillyView>
        <PaymentWidget />
        <SurgeryMap />
        <PackageMap />
        <InvestigationMap />
        <ProcedureMap />
        <MultiCharges />
        <SillyView style={[silly.aic, advice.step >= 14 ? {} : silly.dn]}>
          <CameraView
            width={width * 0.92}
            photo={photo}
            setPhoto={setPhoto}
            setCamera={setCamera}
          />
          <View style={[silly.aic]}>
            <SillyButton onPress={() => navigation.navigate('SAEstPrev')}>
              <SillyText>Preview Estimate</SillyText>
            </SillyButton>
          </View>
        </SillyView>
      </View>
      <View style={[silly.aie]}>
        <SillyButton onPress={() => editStep({step: advice.step + 1})}>
          <SillyText>Next</SillyText>
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
    addRemark: item => dispatch(addRemark(item)),
    editStep: item => dispatch(editStep(item)),
    addVisitTotal: item => dispatch(addVisitTotal(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SAEstimator);
