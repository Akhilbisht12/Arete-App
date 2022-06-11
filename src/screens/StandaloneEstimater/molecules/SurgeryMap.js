import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {clr1} from '../../../config/globals';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {addNewNonPackage} from '../../../store/actions/SAEstimatorActions';
import Surgery from '../atoms/Surgery';
const {width} = Dimensions.get('window');

const SurgeryMap = ({advice, addNewNonPackage}) => {
  return (
    <SillyView
      style={{
        display: advice.step >= 9 && !advice.isIPDPackage ? 'flex' : 'none',
      }}>
      <View style={[]}>
        <SillyText my={10} color="black">
          Add Surgery
        </SillyText>
        <View style={[]}>
          <View>
            {advice.nonPackages.services
              .sort((a, b) => {
                return b.OPD - a.OPD;
              })
              .map((item, index) => {
                return <Surgery key={index} item={item} index={index} />;
              })}
            <View style={[silly.ais]}>
              <SillyButton bg={clr1} onPress={() => addNewNonPackage()}>
                <SillyText>Add surgery</SillyText>
              </SillyButton>
            </View>
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
const mapDispatchToProps = dispatch => {
  return {
    addNewNonPackage: () => dispatch(addNewNonPackage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurgeryMap);
