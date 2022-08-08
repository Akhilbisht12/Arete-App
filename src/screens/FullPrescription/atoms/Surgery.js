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
  addSameDoctor,
  editStep,
  addSameSite,
} from '../../../store/actions/SAEstimatorActions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
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
  addSameDoctor,
  editStep,
  addSameSite,
}) => {
  const [Prescription, setPrescription] = useState([]);

  // handle every tick on finding service
  console.log(advice.nonPackages.services);
  const handleSearchService = async name => {
    try {
      const services = await axios.post(
        `${SERVER_URL}/api/v1/content/service/surgeries`,
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
                  onPress={() => {
                    addServiceToState(service);
                    advice.step <= 14 ? editStep({step: 16}) : null;
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
                  <SillyText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[silly.wmax30p]}>
                    {item.department}
                  </SillyText>
                </SillyView>
              </View>
            </View>
          </View>

          <View>
            <View style={[index === 0 ? silly.dn : silly.fr]}>
              <View style={[silly.fr]}>
                <SillyText color="black">Same Site & Doctor</SillyText>
                <Pressable
                  onPress={() => {
                    addSameSite({
                      site_index: index,
                      site_surgery: !item.sameSite,
                    });
                  }}
                  style={{marginHorizontal: 10}}>
                  <Icon
                    color={clr1}
                    size={20}
                    name={item.sameSite ? 'checkbox-outline' : 'square-outline'}
                  />
                </Pressable>
              </View>
              {/* <View style={[silly.fr]}>
                <SillyText color="black">Same Doctor</SillyText>
                <Pressable
                  onPress={() => {
                    addSameDoctor({
                      doc_index: index,
                      doc_surgery: !item.sameDoctor,
                    });
                  }}
                  style={{marginHorizontal: 10}}>
                  <Icon
                    color={clr1}
                    size={20}
                    name={
                      item.sameDoctor ? 'checkbox-outline' : 'square-outline'
                    }
                  />
                </Pressable>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </SillyView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addService: item => dispatch(addService(item)),
    deleteService: item => dispatch(deleteService(item)),
    addSameDoctor: item => dispatch(addSameDoctor(item)),
    editStep: item => dispatch(editStep(item)),
    addSameSite: item => dispatch(addSameSite(item)),
  };
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surgery);
