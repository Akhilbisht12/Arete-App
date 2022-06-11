import React from 'react';
import {Text, Pressable, View} from 'react-native';
import {connect} from 'react-redux';
import {editIPDPackages, editStep} from '../../../store/actions/adviceAction';
import {ColumnStart} from '../../../styles/FlexView';
import {EstimateBox} from '../../../styles/styledBoxes';
import styles from '../styles';
import {
  SillyView,
  SillyButton,
  SillyText,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1, clr2, clr5} from '../../../config/globals';

const EstimateType = ({advice, editIPDPackages, editStep}) => {
  return (
    <SillyView>
      <View style={[silly.ais, silly.jcc]}>
        <SillyText my={5} color={clr1}>
          Choose type of estimate
        </SillyText>
        {[
          {name: 'Packages', value: false},
          {name: 'Non Packaged', value: false},
        ].map((item, i) => {
          return (
            <SillyButton
              bg={advice.step >= 1 && advice.isIPDPackage ? clr1 : clr5}
              onPress={() => {
                editIPDPackages({ipd: item.value});
              }}>
              <SillyText
                color={advice.step >= 1 && advice.isIPDPackage ? clr2 : clr1}>
                {item.name}
              </SillyText>
            </SillyButton>
          );
        })}
      </View>
    </SillyView>
  );
};

const mapStateToProps = state => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editIPDPackages: item => dispatch(editIPDPackages(item)),
    editStep: item => dispatch(editStep(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EstimateType);
