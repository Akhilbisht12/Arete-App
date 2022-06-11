import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addInvestigation,
  addNewInvestigation,
  deleteInvestigation,
} from '../../../store/actions/adviceAction';
import {
  SillyView,
  SillyInput,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1} from '../../../config/globals';
import axios from 'axios';
import {SERVER_URL} from '../../../config/variables';

const {width, height} = Dimensions.get('window');
const Investigation = ({
  advice,
  addInvestigation,
  deleteInvestigation,
  addNewInvestigation,
  item,
  index,
}) => {
  const [Prescription, setPrescription] = useState([]);

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
    addInvestigation({newInvestigation: service, i_id: index});
  };

  return (
    <SillyView style={[silly.fr, silly.aic]}>
      <Pressable
        onPress={() => deleteInvestigation({investigationindex: index})}>
        <Icon color={clr1} style={[silly.mr1]} name="trash" size={20} />
      </Pressable>
      <View>
        <View style={[item.name ? silly.dn : {}]}>
          <SillyInput
            style={[silly.w75p]}
            placeholder="find service"
            onChangeText={text => handleSearchService(text)}
          />
          <ScrollView
            nestedScrollEnabled
            style={{
              marginVertical: 2,
              padding: 2,
              maxHeight: 0.25 * height,
            }}>
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

        <View style={[item.name ? {} : silly.dn]}>
          <View>
            <SillyText color="black" my={5} style={{width: 0.6 * width}}>
              {item.name}
            </SillyText>
            <View style={[silly.fr]}>
              <SillyView mx={5} bg={clr1}>
                <SillyText>{item.department}</SillyText>
              </SillyView>
              <SillyView bg={clr1}>
                <SillyText>{item.department_type}</SillyText>
              </SillyView>
            </View>
          </View>
        </View>
      </View>
    </SillyView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addInvestigation: item => dispatch(addInvestigation(item)),
    deleteInvestigation: item => dispatch(deleteInvestigation(item)),
    addNewInvestigation: item => dispatch(addNewInvestigation(item)),
  };
};

const mapStateToProps = state => {
  return {
    advice: state.advice,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Investigation);
