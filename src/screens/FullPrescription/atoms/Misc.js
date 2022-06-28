import React, {useState} from 'react';
import {View, Dimensions, ScrollView, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {
  addMiscPackage,
  deleteMisc,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1} from '../../../config/globals';
import {SERVER_URL} from '../../../config/variables';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

const Misc = ({item, index, addMiscPackage, deleteMisc, editStep, advice}) => {
  const [Prescription, setPrescription] = useState([]);

  const handleSearchService = async name => {
    try {
      const services = await axios.post(
        `${SERVER_URL}/api/v1/content/service/miscellaneous`,
        {
          name,
        },
      );
      setPrescription(services.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addServiceToState = item => {
    addMiscPackage({newMisc: item, misc_id: index});
  };

  return (
    <SillyView style={[silly.fr, silly.aic]}>
      <Pressable
        style={{marginVertical: 5}}
        onPress={() => deleteMisc({misc_index: index})}>
        <Icon style={[silly.mr1]} name="trash" color={clr1} size={20} />
      </Pressable>
      <View>
        <View style={{display: item.name ? 'none' : 'flex'}}>
          <SillyInput
            style={[silly.w75p]}
            placeholder="find packages"
            onChangeText={text => handleSearchService(text)}
          />
          <ScrollView
            nestedScrollEnabled
            style={{marginVertical: 2, padding: 2, maxHeight: 0.15 * height}}>
            {Prescription.map(service => {
              return (
                <SillyButton
                  bg="lightgray"
                  key={service._id}
                  onPress={() => {
                    addServiceToState(service);
                    advice.step <= 18 ? editStep({step: 20}) : null;
                  }}>
                  <SillyText color="black">{service.name}</SillyText>
                </SillyButton>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            display: item.name ? 'flex' : 'none',
          }}>
          <View style={[silly.fr, silly.jcbtw]}>
            <View>
              <SillyText color="black" my={5} style={{width: 0.6 * width}}>
                {item.name}
              </SillyText>
              <View style={[silly.fr]}>
                <SillyView bg={clr1}>
                  <SillyText>{item.department}</SillyText>
                </SillyView>
                <SillyView bg={clr1}>
                  <SillyText>{item.department_type}</SillyText>
                </SillyView>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SillyView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMisc: item => dispatch(deleteMisc(item)),
    addMiscPackage: item => dispatch(addMiscPackage(item)),
    editStep: item => dispatch(editStep(item)),
  };
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Misc);
