import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {
  addNewProcedure,
  addProcedureTotal,
  editStep,
  restoreState,
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
import {clr1} from '../../../config/globals';
import {useEffect} from 'react';

const ProcedureMap = ({
  addNewProcedure,
  advice,
  addProcedureTotal,
  editStep,
  restoreState,
}) => {
  useEffect(() => {
    restoreState();
  }, []);
  return (
    <SillyView
      style={[
        advice.step >= 17 && advice.admission_type !== 'Radiation'
          ? {}
          : silly.dn,
      ]}>
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
                <SillyText>Add Procedure</SillyText>
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
            value={advice.procedures.total.value}
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
        <TouchableOpacity
          onPress={() => (advice.step <= 17 ? editStep({step: 18}) : null)}
          style={[silly.fr, silly.jce, silly.ph]}>
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
    addNewProcedure: () => dispatch(addNewProcedure()),
    addProcedureTotal: item => dispatch(addProcedureTotal(item)),
    editStep: item => dispatch(editStep(item)),
    restoreState: () => dispatch(restoreState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProcedureMap);
