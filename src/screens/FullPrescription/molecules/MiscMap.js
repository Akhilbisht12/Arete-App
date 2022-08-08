import React from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addNewMisc, editStep} from '../../../store/actions/SAEstimatorActions';
import Package from '../atoms/Package';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import Misc from '../atoms/Misc';
import {clr1} from '../../../config/globals';
const {width} = Dimensions.get('window');

const MiscMap = ({addNewMisc, advice, editStep}) => {
  return (
    <SillyView
      style={[
        advice.step >= 18 && advice.admission_type !== 'Radiation'
          ? {}
          : silly.dn,
      ]}>
      <View>
        <SillyText color="black" my={10}>
          Add Other Billing Heads
        </SillyText>
        <View>
          <View>
            {advice.misc.services.map((item, index) => {
              return <Misc key={index} item={item} index={index} />;
            })}
            <View style={[silly.fr, silly.aic, silly.jcbtw]}>
              <SillyButton
                style={{marginVertical: 5}}
                onPress={() => addNewMisc()}>
                <SillyText>Add OBH</SillyText>
              </SillyButton>
              <TouchableOpacity
                style={[silly.ph]}
                bg="transparent"
                onPress={() =>
                  advice.step <= 18 ? editStep({step: 20}) : null
                }>
                <SillyText color={clr1}>skip</SillyText>
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
    addNewMisc: () => dispatch(addNewMisc()),
    editStep: item => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiscMap);
