import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {SillyText, SillyView} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {
  addPaymentCompany,
  addPaymentType,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
const {width} = Dimensions.get('window');
const PaymentWidget = ({
  advice,
  editStep,
  addPaymentCompany,
  addPaymentType,
}) => {
  return (
    <View>
      <SillyView style={{display: advice.step >= 6 ? 'flex' : 'none'}}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Select Payment Mode
          </SillyText>
          <View style={{width: width * 0.85}}>
            <Picker
              style={{color: 'black'}}
              selectedValue={advice.payment.type}
              onValueChange={(itemValue, itemIndex) => {
                itemValue === 'cash'
                  ? advice.isIPDPackage
                    ? editStep({step: 10})
                    : editStep({step: 9})
                  : editStep({step: 8});
                addPaymentType({paymentType: itemValue});
              }}>
              <Picker.Item value="" label="Payment Mode" />
              <Picker.Item value="cash" label="Cash" />
              <Picker.Item value="echg-cghs" label="ECHG/CGHS" />
              <Picker.Item value="insurance" label="Insurance" />
            </Picker>
          </View>
        </View>
      </SillyView>
      {/* payment company */}
      <SillyView
        style={[
          advice.payment.type === 'cash' || advice.step <= 5 ? silly.dn : {},
        ]}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Select Payment Company
          </SillyText>
          <View style={{width: width * 0.85}}>
            <Picker
              style={{color: 'black'}}
              selectedValue={advice.payment.company}
              onValueChange={(itemValue, itemIndex) => {
                advice.isIPDPackage
                  ? editStep({step: 10})
                  : editStep({step: 9});
                addPaymentCompany({paymentCompany: itemValue});
              }}>
              <Picker.Item value="" label="Select Insurance Company" />
              <Picker.Item
                value="IFFCO Tokio General Insurance"
                label="IFFCO Tokio General Insurance"
              />
              <Picker.Item
                value="Care Health Insurance"
                label="Care Health Insurance"
              />
              <Picker.Item
                value="Magma HDI Insurance"
                label="Magma HDI Insurance"
              />
              <Picker.Item
                value="The Oriental Insurance Company"
                label="The Oriental Insurance Company"
              />
              <Picker.Item
                value="New India General Insurance"
                label="New India General Insurance"
              />
            </Picker>
          </View>
        </View>
      </SillyView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editStep: item => dispatch(editStep(item)),
    addPaymentType: item => dispatch(addPaymentType(item)),
    addPaymentCompany: item => dispatch(addPaymentCompany(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWidget);
