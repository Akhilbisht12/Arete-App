import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {editStep} from '../../store/actions/SAEstimatorActions';
import SurgeryMap from './molecules/SurgeryMap';
import InvestigationMap from './molecules/InvestigationMap';
import ProcedureMap from './molecules/ProcedureMap';
import PackageMap from './molecules/PackageMap';
import EstimateType from './molecules/EstimateType';
import BedWidget from './molecules/BedWidget';
import EmergencyWidget from './molecules/EmergencyWidget';
import PaymentWidget from './molecules/PaymentWidget';
import MultiCharges from './molecules/MultiCharges';
import silly from '../../Silly/styles/silly';
import MiscMap from './molecules/MiscMap';

const Estimator = () => {
  return (
    <View style={[silly.f1]}>
      <View style={[silly.my2, silly.p1, silly.jce]}>
        <EstimateType />
        <BedWidget />
        <EmergencyWidget />
        <PaymentWidget />
        <SurgeryMap />
        <PackageMap />
        <InvestigationMap />
        <ProcedureMap />
        <MiscMap />
        <MultiCharges />
      </View>
    </View>
  );
};

export default Estimator;
