import React from 'react';
import {View, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {addPatient} from '../../../store/actions/patientAction';
import {SillyText, SillyView} from '../../../Silly/components/silly_comps';
import {connect} from 'react-redux';
import {clr1} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
const {width} = Dimensions.get('window');
const PatientComp = ({item}) => {
  const navigation = useNavigation();
  const handleSelectPatient = () => {
    navigation.navigate('PatientEntry', {data: item});
  };
  return (
    <SillyView>
      <Pressable onPress={handleSelectPatient}>
        <View style={[silly.fr, silly.aic]}>
          <SillyView mx={5} px={15} bg={clr1}>
            <SillyText family="Bold" size={20}>
              {item.firstName[0].toUpperCase()}
            </SillyText>
          </SillyView>
          <View style={[silly.w75p, silly.fr, silly.jcbtw, silly.aic]}>
            <View>
              <View style={[silly.fr, silly.aic]}>
                <SillyText family="Medium" size={20} color={clr1}>
                  {item.firstName} {item.lastName}
                </SillyText>
                <Icon
                  style={[silly.m1]}
                  color={clr1}
                  size={18}
                  name={
                    item.gender === 'M'
                      ? 'male'
                      : item.gender === 'F'
                      ? 'female'
                      : 'male-female'
                  }
                />
              </View>
              <SillyText color={clr1}>UHID: {item.uhid}</SillyText>
            </View>
            <SillyText color={clr1}> Age: {item.age} Y</SillyText>
          </View>
        </View>
        <View
          style={[
            silly.fr,
            silly.jcbtw,
            silly.aic,
            {marginTop: 5, paddingHorizontal: 5},
          ]}>
          <View style={[silly.fr, silly.aic]}>
            <Icon size={20} color={'#151E3F'} name="mail-outline" />
            <SillyText color={clr1}> {item.email}</SillyText>
          </View>
          <View style={[silly.fr, silly.aic]}>
            <Icon size={20} color={'#151E3F'} name="call-outline" />
            <SillyText color={clr1}>{item.phone}</SillyText>
          </View>
        </View>
      </Pressable>
    </SillyView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addPatient: item => dispatch(addPatient(item)),
  };
};

export default connect(null, mapDispatchToProps)(PatientComp);
