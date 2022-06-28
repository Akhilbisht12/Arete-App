import {View, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import {clr1, clr4, clr5} from '../../../config/globals';
import {
  addAge,
  addEmail,
  addFullName,
  addGender,
  addPhone,
} from '../../../store/actions/SAEstimatorActions';
import silly from '../../../Silly/styles/silly';

const PersonalDetails = ({
  advice,
  addFullName,
  addPhone,
  addEmail,
  addGender,
  addAge,
}) => {
  console.assert(advice);
  return (
    <SillyView>
      <SillyText color={clr1} my={10}>
        Enter Personal Details
      </SillyText>
      <SillyText color={clr1}>Full Name</SillyText>
      <SillyInput
        value={advice.name}
        onChangeText={name => addFullName({name})}
        placeholder="Full Name"
      />
      <SillyText color={clr1}>Phone Number</SillyText>
      <SillyInput
        value={advice.phone}
        keyboardType="number-pad"
        onChangeText={phone => addPhone({phone})}
        placeholder="Phone Number"
      />
      <SillyText color={clr1}>Email Address</SillyText>
      <SillyInput
        value={advice.email}
        onChangeText={email => addEmail({email})}
        placeholder="Email"
      />
      <SillyText color={clr1}>Age</SillyText>
      <SillyInput
        value={advice.age}
        keyboardType="number-pad"
        onChangeText={age => addAge({age})}
        placeholder="Age"
      />
      <SillyText color={clr1}>Gender</SillyText>
      <View style={[silly.fr, silly.my1]}>
        {[
          {name: 'Male', value: 'MALE'},
          {name: 'Female', value: 'FEMALE'},
          {name: 'Other', value: 'Other'},
        ].map((item, i) => {
          return (
            <SillyButton
              key={i}
              bg={item.value === advice.gender ? clr1 : clr5}
              onPress={() => addGender({gender: item.value})}>
              <SillyText>{item.name}</SillyText>
            </SillyButton>
          );
        })}
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
    addFullName: item => dispatch(addFullName(item)),
    addEmail: item => dispatch(addEmail(item)),
    addAge: item => dispatch(addAge(item)),
    addGender: item => dispatch(addGender(item)),
    addPhone: item => dispatch(addPhone(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
