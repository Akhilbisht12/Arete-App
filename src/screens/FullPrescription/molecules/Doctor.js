import {View, Text, ToastAndroid} from 'react-native';
import React from 'react';
import {
  SillyInput,
  SillyText,
  SillyView,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import {
  addDoctor,
  addSpeciality,
  addTreatment,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import {clr1} from '../../../config/globals';
const doctors = [
  {
    name: 'Cardiology',
    doctors: [
      {name: 'Dr. Ramesh Talwas'},
      {name: 'Dr. Naveen Jain'},
      {name: 'Dr. Kanti Jindal'},
      {name: 'Dr. Seema Aggarwal'},
    ],
  },
  {
    name: 'Neurology',
    doctors: [
      {name: 'Dr. Fillmore'},
      {name: 'Dr. Mangle'},
      {name: 'Dr. Ken Hurt'},
      {name: 'Dr. B. Sick'},
    ],
  },
  {
    name: 'Nephrology',
    doctors: [
      {name: 'Dr. Watamaniuk '},
      {name: 'Dr. Lipp'},
      {name: 'Dr. Carey'},
      {name: 'Dr. Nervo'},
    ],
  },
  {
    name: 'Oncology',
    doctors: [
      {name: 'Dr. Hale '},
      {name: 'Dr. Schotz'},
      {name: 'Dr. Lynch'},
      {name: 'Dr. Smiley  Nasti'},
    ],
  },
];

const Doctor = ({addDoctor, addSpeciality, advice, addDiagnosis, editStep}) => {
  return (
    <View>
      <SillyView style={[advice.step >= 0 ? {} : silly.dn]}>
        <SillyText color={clr1}>Diagnosis</SillyText>
        <SillyInput
          value={advice.diagnosis}
          onBlur={() => {
            if (!advice.diagnosis) {
              ToastAndroid.show('Field Required!', ToastAndroid.SHORT);
              return;
            }
            editStep({step: 1});
          }}
          onChangeText={advise => addDiagnosis({treatment: advise})}
          placeholder="doctor advise"
        />
      </SillyView>
      <SillyView style={[advice.step >= 1 ? {} : silly.dn]}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Select Speciality
          </SillyText>
          <Picker
            onBlur={() => {
              if (!advice.speciality) {
                ToastAndroid.show('Field Required!', ToastAndroid.SHORT);
                return;
              }
              advice.step > 2 ? null : editStep({step: 2});
            }}
            selectedValue={advice.speciality}
            onValueChange={itemValue => {
              addSpeciality({speciality: itemValue});
            }}
            style={[silly.w85p, {color: 'black'}]}>
            <Picker.Item value="" label="Select Speciality" />
            {doctors.map((item, i) => {
              return (
                <Picker.Item key={i} value={item.name} label={item.name} />
              );
            })}
          </Picker>
        </View>
      </SillyView>
      <SillyView style={[advice.step >= 2 ? {} : silly.dn]}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Select Doctor
          </SillyText>
          <Picker
            onBlur={() => {
              if (!advice.doctor) {
                ToastAndroid.show('Field Required!', ToastAndroid.SHORT);
                return;
              }
              advice.step > 3 ? null : editStep({step: 3});
            }}
            selectedValue={advice.doctor}
            onValueChange={itemValue => {
              addDoctor({doctor: itemValue});
            }}
            style={[silly.w85p, {color: 'black'}]}>
            <Picker.Item value="" label="Select Doctor" />
            {doctors
              .filter(item =>
                item.name === advice.speciality
                  ? advice.speciality
                  : 'Nephrology',
              )[0]
              .doctors.map((doctor, i) => {
                return (
                  <Picker.Item
                    key={i}
                    value={doctor.name}
                    label={doctor.name}
                  />
                );
              })}
          </Picker>
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
    addDoctor: item => dispatch(addDoctor(item)),
    addSpeciality: item => dispatch(addSpeciality(item)),
    addDiagnosis: item => dispatch(addTreatment(item)),
    editStep: item => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
