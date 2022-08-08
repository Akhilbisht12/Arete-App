import React from 'react';
import {View, Dimensions, TouchableOpacity, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {
  addNewPackage,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import Package from '../atoms/Package';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1} from '../../../config/globals';
const {width} = Dimensions.get('window');

const PackageMap = ({addNewPackage, advice, editStep}) => {
  return (
    <SillyView
      style={{
        display: advice.isIPDPackage && advice.step >= 15 ? 'flex' : 'none',
      }}>
      <View>
        <SillyText color="black" my={10}>
          Add Package
        </SillyText>
        <View>
          <View>
            {advice.packages.services
              .sort((a, b) => {
                return b.opd - a.opd;
              })
              .map((item, index) => {
                return <Package key={index} item={item} index={index} />;
              })}
            <View style={[silly.fr, silly.aic, silly.jcbtw]}>
              <SillyButton
                style={{marginVertical: 5}}
                onPress={() => {
                  addNewPackage();
                }}>
                <SillyText>Add Package</SillyText>
              </SillyButton>
              <TouchableOpacity
                bg="transparent"
                style={[silly.ph]}
                onPress={() => {
                  if (!advice.packages.services[0]) {
                    ToastAndroid.show(
                      'Select Package to continue!',
                      ToastAndroid.SHORT,
                    );
                    return;
                  } else if (advice.packages.services[0]) {
                    if (!advice.packages.services[0].name) {
                      ToastAndroid.show(
                        'Select Package to continue!',
                        ToastAndroid.SHORT,
                      );
                      return;
                    }
                  }
                  advice.step <= 15
                    ? editStep({
                        step: advice.admission_type === 'Radiation' ? 21 : 16,
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
    addNewPackage: () => dispatch(addNewPackage()),
    editStep: item => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PackageMap);
