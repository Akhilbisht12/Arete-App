import React from 'react';
import {View, Text, Dimensions, Pressable} from 'react-native';
const {width} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {restoreState} from '../../store/actions/adviceAction';
import {connect} from 'react-redux';
import silly from '../../Silly/styles/silly';
import {SillyView, SillyText} from '../../Silly/components/silly_comps';
import {clr1} from '../../config/globals';
const PatientSessionTabs = ({patientID, restoreState}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={[silly.jcbtw, silly.aic, silly.fr, silly.jceven]}>
        <Pressable>
          <SillyView
            py={20}
            style={[silly.w45p, silly.aic, silly.h20p, silly.jcaround]}>
            <Icon name="finger-print" size={50} color={'#151E3F'} />
            <SillyText color={clr1} family="Medium" size={20}>
              Patient History
            </SillyText>
          </SillyView>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('FullPrescription', {patientID})}>
          <SillyView
            py={20}
            style={[silly.w45p, silly.aic, silly.h20p, silly.jcaround]}>
            <Icon name="cloud-upload" size={50} color={'#151E3F'} />
            <SillyText color={clr1} family="Medium" size={18}>
              Upload Full Prescription
            </SillyText>
          </SillyView>
        </Pressable>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    restoreState: item => dispatch(restoreState(item)),
  };
};

export default connect(null, mapDispatchToProps)(PatientSessionTabs);
