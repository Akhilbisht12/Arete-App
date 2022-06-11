import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {editIPDPackages} from '../../../store/actions/SAEstimatorActions';
import {
  SillyButton,
  SillyText,
  SillyView,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';

const EstimateType = ({advice, editIPDPackages}) => {
  return (
    <SillyView style={[advice.step >= 1 ? {} : silly.dn]}>
      <View style={[silly.ais]}>
        <SillyText color="black" my={10}>
          Choose type of estimate
        </SillyText>
        {[
          {name: 'Packaged', value: true, step: 5},
          {name: 'Non Packaged', value: false, step: 2},
        ].map((item, i) => {
          return (
            <SillyButton
              key={i}
              bg={advice.isIPDPackage === item.value ? '#151E3F' : 'gray'}
              onPress={() => editIPDPackages({ipd: item.value})}>
              <SillyText>{item.name}</SillyText>
            </SillyButton>
          );
        })}
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
    editIPDPackages: item => dispatch(editIPDPackages(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EstimateType);