import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {
  SillyView,
  SillyText,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {
  addIcuBed,
  addIcuStay,
  addWardStay,
} from '../../../store/actions/SAEstimatorActions';
import axios from 'axios';
import {SERVER_URL} from '../../../config/variables';

const BedWidget = ({advice, addIcuBed, addWardStay, addIcuStay}) => {
  const [icus, seticus] = useState([]);
  useEffect(() => {
    const icureq = async () => {
      try {
        const icures = await axios.get(
          `${SERVER_URL}/api/v1/platform/settings/icu/`,
        );
        seticus(icures.data);
      } catch (error) {
        console.log(error);
      }
    };
    icureq();
  }, []);

  return (
    <View>
      <SillyView
        style={{
          display: advice.step >= 2 && !advice.isIPDPackage ? 'flex' : 'none',
        }}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Type number of days to ward
          </SillyText>
          <SillyInput
            my={0.01}
            bg="transparent"
            brw={0.01}
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
          />
        </View>
      </SillyView>
      <SillyView
        style={{
          display: advice.step >= 3 && !advice.isIPDPackage ? 'flex' : 'none',
        }}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Select ICU Type
          </SillyText>
          {/* <View style={[silly.w80p]}>
            <SillyPicker data={ICUFee} func={addIcuBed} />
          </View> */}

          <Picker
            style={[silly.w80p, {color: 'black'}]}
            onValueChange={(itemValue, itemIndex) => {
              addIcuBed({type: itemValue});
            }}
            selectedValue={advice.icu.type}>
            {icus.map((item, i) => {
              return (
                <Picker.Item label={item.name} value={item.code} key={i} />
              );
            })}
          </Picker>
        </View>
      </SillyView>
      <SillyView
        style={{
          display: advice.step >= 4 && !advice.isIPDPackage ? 'flex' : 'none',
        }}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Type number of days to ICU
          </SillyText>
          <SillyInput
            my={0.01}
            bg="transparent"
            brw={0.01}
            textContentType="telephoneNumber"
            value={advice.icu.days.toString()}
            onChangeText={text => {
              if (!text) {
                addIcuStay({icuStay: parseInt(0)});
              } else {
                addIcuStay({icuStay: parseInt(text)});
              }
            }}
            keyboardType="number-pad"
            placeholder="ICU"
          />
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
    addWardStay: item => dispatch(addWardStay(item)),
    addIcuBed: item => dispatch(addIcuBed(item)),
    addIcuStay: item => dispatch(addIcuStay(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BedWidget);
