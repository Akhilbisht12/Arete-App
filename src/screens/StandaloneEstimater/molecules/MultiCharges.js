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
} from '../../../store/actions/adviceAction';
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
}) => {
  const navigation = useNavigation();
  return (
    <SillyView style={{display: advice.step >= 13 ? 'flex' : 'none'}}>
      <View style={[]}>
        <View>
          {/* <View style={[silly.fr, silly.aic, silly.jcbtw]}>
            <SillyText color={clr1}>Visit Charge</SillyText>
            <SillyInput
              style={[silly.w40p]}
              value={advice.other.visitTotal.toString()}
              onChangeText={text => {
                if (!text) {
                  addVisitTotal({visitTotal: parseInt(0)});
                } else {
                  addVisitTotal({visitTotal: parseInt(text)});
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
            />
          </View> */}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiCharges);
