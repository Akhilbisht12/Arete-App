import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  addService,
  deleteService,
  addDoctorToSurgery,
  deleteDoctorFromSurgery,
  addMinorToSurgery,
  editMinorSurgeryPercent,
} from '../../../store/actions/SAEstimatorActions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {SurgeryList} from '../../../config/Surgery';
import {
  SillyView,
  SillyText,
  SillyButton,
  SillyInput,
} from '../../../Silly/components/silly_comps';
import {clr1} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
import axios from 'axios';
import {SERVER_URL} from '../../../config/variables';

const {width, height} = Dimensions.get('window');

const Surgery = ({
  item,
  index,
  advice,
  addService,
  deleteService,
  addDoctorToSurgery,
  deleteDoctorFromSurgery,
  addMinorToSurgery,
  editMinorSurgeryPercent,
}) => {
  const [Prescription, setPrescription] = useState([]);

  // handle every tick on finding service

  const handleSearchService = async name => {
    try {
      const services = await axios.post(
        `${SERVER_URL}/api/v1/content/service/find`,
        {
          name,
        },
      );
      console.log(services.data);
      setPrescription(services.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addServiceToState = service => {
    const tempService = {
      ...service,
      surgeon: [],
      minor: 100,
      isMinor: false,
    };
    console.log(tempService);
    addService({newService: tempService, s_id: index});
  };

  return (
    <SillyView style={[silly.fr, silly.aic]}>
      <Pressable
        style={[silly.mr1]}
        onPress={() => deleteService({servicedeleteindex: index})}>
        <Icon name="trash" color={clr1} size={20} />
      </Pressable>
      <View>
        <View style={{display: item.name ? 'none' : 'flex'}}>
          <SillyInput
            style={[silly.w75p]}
            placeholder="find service"
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
                  onPress={() => addServiceToState(service)}>
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
          <View style={[silly.fr, silly.jcbtw, silly.aic]}>
            <View>
              <SillyText color="black" style={{width: 0.6 * width}}>
                {item.name}
              </SillyText>
              <View style={[silly.fr]}>
                <SillyView bg={clr1}>
                  <SillyText>{item.department_type}</SillyText>
                </SillyView>
                <SillyView bg={clr1}>
                  <SillyText>{item.department}</SillyText>
                </SillyView>
              </View>
            </View>
          </View>
          <View
            style={{
              width: 0.85 * width,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {item.surgeon
              ? item.surgeon.map((surgeo, surgeonIndex) => {
                  return (
                    <SillyView
                      style={[silly.fr, silly.jcbtw]}
                      key={surgeonIndex}>
                      <SillyText color={clr1} style={{paddingHorizontal: 3}}>
                        {surgeo.name}
                      </SillyText>
                      <Pressable
                        onPress={() =>
                          deleteDoctorFromSurgery({
                            surgeonIndex,
                            surgeryIndex: index,
                          })
                        }>
                        <Icon
                          name="close-circle-outline"
                          color={clr1}
                          style={[silly.mxh]}
                          size={16}
                        />
                      </Pressable>
                    </SillyView>
                  );
                })
              : null}
          </View>
          <View
            style={{
              display: item.Department_Type == 'SURGERY' ? 'flex' : 'none',
            }}>
            <View style={[silly.fr]}>
              <Picker
                style={{width: 0.35 * width}}
                onValueChange={(itemValue, itemIndex) =>
                  addDoctorToSurgery({
                    surgeon: {name: itemValue},
                    serviceindex: index,
                  })
                }>
                <Picker.Item label="Dr Jhon Doe" value="dr-jhon-doe" />
                <Picker.Item label="Dr Anna Doe" value="dr-anna-doe" />
                <Picker.Item label="Dr James Doe" value="dr-james-doe" />
                <Picker.Item label="Dr Shirley Doe" value="dr-shirley-doe" />
              </Picker>
              {/* <Picker
                style={{width: 0.35 * width}}
                selectedValue={doctor}
                onValueChange={(itemValue, itemIndex) => setDoctor(itemValue)}>
                <Picker.Item label="equipment_a" value="equipment_a" />
                <Picker.Item label="equipment_b" value="equipment_b" />
                <Picker.Item label="equipment_c" value="equipment_c" />
                <Picker.Item label="equipment_d" value="equipment_d" />
              </Picker> */}
            </View>
            <View
              style={({display: index === 0 ? 'none' : 'flex'}, [silly.fr])}>
              <View style={[silly.fr]}>
                <SillyText color="black">Same Site</SillyText>
                <Pressable
                  onPress={() => {
                    addMinorToSurgery({
                      minorsurgeryindex: index,
                      minorsurgery: !item.isMinor,
                    });
                  }}
                  style={{marginHorizontal: 10}}>
                  <Icon
                    size={20}
                    name={item.isMinor ? 'checkbox-outline' : 'square-outline'}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SillyView>
  );
};

const styles = StyleSheet.create({
  service: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: 'lightgray',
    marginVertical: 2,
    borderRadius: 5,
  },
  badge: {
    backgroundColor: 'blue',
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    margin: 2,
  },
  input: {
    width: width * 0.2,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    addService: item => dispatch(addService(item)),
    deleteService: item => dispatch(deleteService(item)),
    addDoctorToSurgery: item => dispatch(addDoctorToSurgery(item)),
    deleteDoctorFromSurgery: item => dispatch(deleteDoctorFromSurgery(item)),
    addMinorToSurgery: item => dispatch(addMinorToSurgery(item)),
    editMinorSurgeryPercent: item => dispatch(editMinorSurgeryPercent(item)),
  };
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surgery);
