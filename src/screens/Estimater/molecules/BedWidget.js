import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text, Dimensions, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {BedFeeMaster} from '../../../config/BedFee';
import {ICUFee} from '../../../config/ICUFee';
import {
  addIcuBed,
  addIcuStay,
  addWardBed,
  addWardStay,
  editStep,
} from '../../../store/actions/adviceAction';
import {ColumnStart} from '../../../styles/FlexView';
import {EstimateBox} from '../../../styles/styledBoxes';
import styles from '../styles';

const {width} = Dimensions.get('window');

const BedWidget = ({
  advice,
  addIcuBed,
  editStep,
  addWardBed,
  addWardStay,
  addIcuStay,
}) => {
  return (
    <View>
      {/* <EstimateBox
        style={{
          display: advice.step >= 1 ? "flex" : "none",
        }}
      >
        <ColumnStart>
          <Text style={styles.title}>Choose Ward Bed Category</Text>
          <View style={{ width: width * 0.85 }}>
            <Picker
              selectedValue={advice.wardBedType}
              onValueChange={(itemValue, itemIndex) => {
                advice.isIPDPackage
                  ? editStep({ step: 5 })
                  : editStep({ step: 2 });
                addWardBed({ wardBed: itemValue });
              }}
            >
              {BedFeeMaster.map((item) => {
                return (
                  <Picker.Item
                    key={item.Billing_Code}
                    label={item.Bed_Category}
                    value={item.Billing_Code}
                  />
                );
              })}
            </Picker>
          </View>
        </ColumnStart>
      </EstimateBox> */}
      <EstimateBox
        style={{
          display: advice.step >= 2 && !advice.isIPDPackage ? 'flex' : 'none',
        }}>
        <ColumnStart>
          <Text style={styles.title}>Type number of days to ward</Text>
          <TextInput
            onSubmitEditing={() => editStep({step: 4})}
            textContentType="telephoneNumber"
            onChangeText={text => {
              if (!text) {
                addWardStay({wardStay: parseInt(0)});
              } else {
                addWardStay({wardStay: parseInt(text)});
              }
            }}
            value={advice.ward.toString()}
            keyboardType="number-pad"
            placeholder="Ward"
            style={styles.input}
          />
        </ColumnStart>
      </EstimateBox>
      {/* choose ward bed category */}
      {/* <EstimateBox
        style={{
          display: advice.step >= 3 && !advice.isIPDPackage ? "flex" : "none",
        }}
      >
        <ColumnStart>
          <Text style={styles.title}>Choose ICU Bed Category</Text>
          <View style={{ width: width * 0.85 }}>
            <Picker
              selectedValue={advice.icuBedType}
              onValueChange={(itemValue, itemIndex) => {
                editStep({ step: 4 });
                addIcuBed({ icuBed: itemValue });
              }}
            >
              {ICUFee.map((item) => {
                return (
                  <Picker.Item
                    key={item.Billing_Code}
                    label={item.Bed_Category}
                    value={item.Billing_Code}
                  />
                );
              })}
            </Picker>
          </View>
        </ColumnStart>
      </EstimateBox> */}
      <EstimateBox
        style={{
          display: advice.step >= 4 && !advice.isIPDPackage ? 'flex' : 'none',
        }}>
        <ColumnStart>
          <Text style={styles.title}>Type number of days to ICU</Text>
          <TextInput
            textContentType="telephoneNumber"
            value={advice.icu.toString()}
            onSubmitEditing={() => editStep({step: 5})}
            onChangeText={text => {
              if (!text) {
                addIcuStay({icuStay: parseInt(0)});
              } else {
                addIcuStay({icuStay: parseInt(text)});
              }
            }}
            keyboardType="number-pad"
            placeholder="ICU"
            style={styles.input}
          />
        </ColumnStart>
      </EstimateBox>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWardBed: item => dispatch(addWardBed(item)),
    editStep: item => dispatch(editStep(item)),
    addWardStay: item => dispatch(addWardStay(item)),
    addIcuBed: item => dispatch(addIcuBed(item)),
    addIcuStay: item => dispatch(addIcuStay(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BedWidget);
