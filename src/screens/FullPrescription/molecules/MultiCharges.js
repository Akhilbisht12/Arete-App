import React from 'react';
import {View, Text, Dimensions, TextInput, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {
  addBloodRequirement,
  addEquipmentCharge,
  addMedicineCharge,
  addStent,
  addVisitTotal,
  editStep,
  addOtherMisc,
} from '../../../store/actions/SAEstimatorActions.js';
import {useNavigation} from '@react-navigation/native';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1} from '../../../config/globals';

const MultiCharges = ({
  advice,
  addMedicineCharge,
  addVisitTotal,
  addBloodRequirement,
  addEquipmentCharge,
  addStent,
  patientID,
  addOtherMisc,
}) => {
  const navigation = useNavigation();
  return (
    <SillyView style={[advice.step >= 19 ? {} : silly.dn]}>
      <View style={[]}>
        <View>
          <View style={[silly.fr, silly.aic, silly.jcbtw]}>
            <SillyText color={clr1}>Medicine Charge</SillyText>
            <SillyInput
              style={[silly.w40p]}
              value={advice.other.medicine.toString()}
              onChangeText={text => {
                if (!text) {
                  addMedicineCharge({medicine: parseInt(0)});
                } else {
                  addMedicineCharge({medicine: parseInt(text)});
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
            />
          </View>
          <View style={[silly.fr, silly.aic, silly.jcbtw]}>
            <SillyText color={clr1}>Equipment Charge</SillyText>
            <SillyInput
              style={[silly.w40p]}
              value={advice.other.equipment.toString()}
              onChangeText={text => {
                if (!text) {
                  addEquipmentCharge({equipment: parseInt(0)});
                } else {
                  addEquipmentCharge({equipment: parseInt(text)});
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
            />
          </View>
          <View style={[silly.fr, silly.aic, silly.jcbtw]}>
            <SillyText color={clr1}>Blood Requirement</SillyText>
            <SillyInput
              style={[silly.w40p]}
              value={advice.other.blood.toString()}
              onChangeText={text => {
                if (!text) {
                  addBloodRequirement({blood: parseInt(0)});
                } else {
                  addBloodRequirement({blood: parseInt(text)});
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
            />
          </View>
          <View style={[silly.fr, silly.aic, silly.jcbtw]}>
            <SillyText style={[silly.w30p]} color={clr1}>
              Stent/Implant Cost
            </SillyText>
            <SillyInput
              style={[silly.w40p]}
              value={advice.other.stent.toString()}
              onChangeText={text => {
                if (!text) {
                  addStent({stent: parseInt(0)});
                } else {
                  addStent({stent: parseInt(text)});
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
            />
          </View>
          <View style={[silly.fr, silly.aic, silly.jcbtw]}>
            <SillyText style={[silly.w30p]} color={clr1}>
              Miscellaneous
            </SillyText>
            <SillyInput
              style={[silly.w40p]}
              value={advice.other.miscellaneous.toString()}
              onChangeText={text => {
                if (!text) {
                  addOtherMisc({miscellaneous: parseInt(0)});
                } else {
                  addOtherMisc({miscellaneous: parseInt(text)});
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
            />
          </View>
        </View>
      </View>
    </SillyView>
  );
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};

const mapDispatchToProps = dispacth => {
  return {
    addVisitTotal: item => dispacth(addVisitTotal(item)),
    addMedicineCharge: item => dispacth(addMedicineCharge(item)),
    addBloodRequirement: item => dispacth(addBloodRequirement(item)),
    addEquipmentCharge: item => dispacth(addEquipmentCharge(item)),
    addStent: item => dispacth(addStent(item)),
    editStep: item => dispacth(editStep(item)),
    addOtherMisc: item => dispacth(addOtherMisc(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiCharges);
