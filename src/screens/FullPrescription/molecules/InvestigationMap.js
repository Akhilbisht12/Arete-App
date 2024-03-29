import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {
  addInvestigationTotal,
  addNewInvestigation,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import Investigation from '../atoms/Investigation';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1} from '../../../config/globals';

const InvestigationMap = ({
  addNewInvestigation,
  advice,
  addInvestigationTotal,
  editStep,
}) => {
  return (
    <SillyView
      style={[
        advice.step >= 16 && advice.admission_type !== 'Radiation'
          ? {}
          : silly.dn,
      ]}>
      <View style={[]}>
        <SillyText color="black" my={10}>
          Add Investigation
        </SillyText>
        <View style={[]}>
          <View>
            {advice.investigations.services.map((item, index) => {
              return <Investigation key={index} item={item} index={index} />;
            })}
            <View style={[silly.fr, silly.aic, silly.jcbtw]}>
              <SillyButton
                onPress={() => {
                  addNewInvestigation();
                }}>
                <SillyText>Add investigation</SillyText>
              </SillyButton>
            </View>
          </View>
        </View>
        <View style={[silly.fr, silly.jcbtw, silly.aic, silly.w80p]}>
          <SillyText color="black" style={[silly.w40p]}>
            Investigation Total
          </SillyText>
          <SillyInput
            onBlur={() => (advice.step <= 16 ? editStep({step: 17}) : null)}
            keyboardType="number-pad"
            placeholder="value"
            value={advice.investigations.total.value}
            onChangeText={text => {
              if (!text) {
                addInvestigationTotal({investigationTotal: parseInt(0)});
              } else {
                addInvestigationTotal({investigationTotal: parseInt(text)});
              }
            }}
            style={[silly.w30p]}
          />
        </View>
        <TouchableOpacity
          style={[silly.jce, silly.fr, silly.ph]}
          onPress={() => (advice.step <= 16 ? editStep({step: 17}) : null)}>
          <SillyText color={clr1}>Skip</SillyText>
        </TouchableOpacity>
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
    addNewInvestigation: () => dispatch(addNewInvestigation()),
    addInvestigationTotal: item => dispatch(addInvestigationTotal(item)),
    editStep: item => dispatch(editStep(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestigationMap);
