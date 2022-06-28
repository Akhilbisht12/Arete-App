import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {
  editEmergency,
  editStep,
} from '../../../store/actions/SAEstimatorActions';

const EmergencyWidget = ({advice, editEmergency, editStep}) => {
  return (
    <SillyView style={[advice.step >= 11 ? {} : silly.dn]}>
      <View style={[silly.ais]}>
        <SillyText color="black" my={10}>
          Is emergency case?
        </SillyText>
        <View style={[silly.fr]}>
          {[
            {name: 'Yes', value: true},
            {name: 'No', value: false},
          ].map((item, i) => {
            return (
              <SillyButton
                key={i}
                bg={advice.isEmergency === item.value ? '#151E3F' : 'gray'}
                onPress={() => {
                  editEmergency({emergency: item.value});
                  advice.step <= 11 ? editStep({step: 12}) : null;
                }}>
                <SillyText>{item.name}</SillyText>
              </SillyButton>
            );
          })}
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

const mapDispatchToProps = dispatch => {
  return {
    editEmergency: item => dispatch(editEmergency(item)),
    editStep: item => dispatch(editStep(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyWidget);
