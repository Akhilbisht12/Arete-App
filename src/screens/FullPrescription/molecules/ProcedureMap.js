import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
  addNewProcedure,
  addProcedureTotal,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import {calculateProcedure} from '../../../utils/EstimateCalculator';
import Procedure from '../atoms/Procedure';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';

const ProcedureMap = ({
  addNewProcedure,
  advice,
  addProcedureTotal,
  editStep,
}) => {
  return (
    <SillyView style={[advice.step >= 17 ? {} : silly.dn]}>
      <View style={[]}>
        <SillyText color="black" my={10}>
          Add Procedures
        </SillyText>
        <View style={[]}>
          <View>
            {advice.procedures.services.map((item, index) => {
              return <Procedure key={index} item={item} index={index} />;
            })}
            <View style={[silly.fr, silly.jcbtw]}>
              <SillyButton onPress={() => addNewProcedure()}>
                <SillyText>Add a Procedure</SillyText>
              </SillyButton>
            </View>
          </View>
        </View>
        <View style={[silly.fr, silly.jcbtw, silly.aic, silly.w80p]}>
          <SillyText style={[silly.w30p]} color="black">
            Procedures
          </SillyText>
          <SillyInput
            onBlur={() => (advice.step <= 17 ? editStep({step: 18}) : null)}
            keyboardType="number-pad"
            placeholder="value"
            value={advice.procedures.total.value.toString()}
            onChangeText={text => {
              if (!text) {
                addProcedureTotal({procedureTotal: parseInt(0)});
              } else {
                addProcedureTotal({procedureTotal: parseInt(text)});
              }
            }}
            style={[silly.w30p]}
          />
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
    addNewProcedure: () => dispatch(addNewProcedure()),
    addProcedureTotal: item => dispatch(addProcedureTotal(item)),
    editStep: item => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProcedureMap);
