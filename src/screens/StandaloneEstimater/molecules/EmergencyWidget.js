import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {editEmergency} from '../../../store/actions/SAEstimatorActions';

const EmergencyWidget = ({advice, editEmergency}) => {
  return (
    <SillyView style={{display: advice.step >= 5 ? 'flex' : 'none'}}>
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
                bg={
                  advice.step >= 5 && advice.isEmergency === item.value
                    ? '#151E3F'
                    : 'gray'
                }
                onPress={() => editEmergency({emergency: item.value})}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyWidget);
