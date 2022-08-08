import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import {
  addPackage,
  addSameSitePkg,
  deletePackage,
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

const Package = ({
  item,
  index,
  advice,
  addPackage,
  deletePackage,
  editStep,
  addSameSitePkg,
}) => {
  const [Prescription, setPrescription] = useState([]);

  const handleSearchService = async name => {
    try {
      const services = await axios.post(
        `${SERVER_URL}/api/v1/content/service/packages`,
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
    addPackage({newPackage: item, pkg_id: index});
  };

  const getServicePrice = () => {
    let price = null;
    for (const [key, value] of Object.entries(item)) {
      if (key === advice.wardBedType) {
        price = value;
      }
    }
    return price;
  };

  return (
    <SillyView style={[silly.fr, silly.aic]}>
      <Pressable
        style={{marginVertical: 5}}
        onPress={() => deletePackage({packageindex: index})}>
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
                    advice.step <= 15
                      ? editStep({
                          step: advice.admission_type === 'Radiation' ? 21 : 16,
                        })
                      : null;
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
          <View style={[index === 0 ? silly.dn : silly.fr]}>
            <View style={[silly.fr]}>
              <SillyText color="black">Same Site & Doctor</SillyText>
              <Pressable
                onPress={() => {
                  addSameSitePkg({
                    pkg_index: index,
                    site_pkg: !item.sameSite,
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
          </View>
        </View>
      </View>
    </SillyView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deletePackage: item => dispatch(deletePackage(item)),
    addPackage: item => dispatch(addPackage(item)),
    editStep: item => dispatch(editStep(item)),
    addSameSitePkg: item => dispatch(addSameSitePkg(item)),
  };
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Package);
