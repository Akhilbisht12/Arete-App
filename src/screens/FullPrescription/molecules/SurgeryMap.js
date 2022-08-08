import React from 'react';
import {View, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {clr1} from '../../../config/globals';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {
  addNewNonPackage,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import Surgery from '../atoms/Surgery';
const {width} = Dimensions.get('window');

const SurgeryMap = ({advice, addNewNonPackage}) => {
  return (
    <SillyView
      style={{
        display: !advice.isIPDPackage && advice.step >= 14 ? 'flex' : 'none',
      }}>
      <View style={[]}>
        <SillyText my={10} color="black">
          Add Surgery
        </SillyText>
        <View style={[]}>
          <View>
            {advice.nonPackages.services
              .sort((a, b) => {
                return b.opd - a.opd;
              })
              .map((item, index) => {
                return <Surgery key={index} item={item} index={index} />;
              })}
            <View style={[silly.fr, silly.jcbtw, silly.aic]}>
              <SillyButton
                bg={clr1}
                onPress={() => {
                  addNewNonPackage();
                }}>
                <SillyText>Add surgery</SillyText>
              </SillyButton>
              <TouchableOpacity
                bg="transparent"
                style={[silly.ph]}
                onPress={() => {
                  if (!advice.nonPackages.services[0]) {
                    ToastAndroid.show(
                      'Select Surgery to continue!',
                      ToastAndroid.SHORT,
                    );
                    return;
                  } else if (advice.nonPackages.services[0]) {
                    if (!advice.nonPackages.services[0].name) {
                      ToastAndroid.show(
                        'Select Surgery to continue!',
                        ToastAndroid.SHORT,
                      );
                      return;
                    }
                  }
                  advice.step <= 15
                    ? editStep({
                        step: advice.admission_type === 'Radiation' ? 20 : 16,
                      })
                    : null;
                }}>
                <SillyText color={clr1}>Skip</SillyText>
              </TouchableOpacity>
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
