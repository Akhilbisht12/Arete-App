import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import {
  addProcedure,
  addProcedureTotal,
  deleteProcedure,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SillyInput,
  SillyButton,
  SillyText,
  SillyView,
} from '../../../Silly/components/silly_comps';
import {clr1} from '../../../config/globals';
import silly from '../../../Silly/styles/silly';
import axios from 'axios';
import {SERVER_URL} from '../../../config/variables';
const {width, height} = Dimensions.get('window');

const Procedure = ({
  item,
  index,
  advice,
  addProcedure,
  deleteProcedure,
  addProcedureTotal,
  editStep,
}) => {
  const [Prescription, setPrescription] = useState([]);

  const handleSearchService = async name => {
    try {
      const services = await axios.post(
        `${SERVER_URL}/api/v1/content/service/procedures`,
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

  const addServiceToState = item => {
    addProcedure({newProcedure: item, p_id: index});
  };

  return (
    <SillyView style={[silly.fr, silly.aic]}>
      <Pressable
        style={silly.mr1}
        onPress={() => deleteProcedure({procedureindex: index})}>
        <Icon color={clr1} name="trash" size={20} />
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
            style={{marginVertical: 2, padding: 2, maxHeight: 0.15 * height}}>
            {Prescription.map(service => {
              return (
                <SillyButton
                  bg="lightgray"
                  key={service._id}
                  onPress={() => {
                    addServiceToState(service);
                    advice.step <= 17 ? editStep({step: 18}) : null;
                  }}>
                  <SillyText color={clr1}>{service.name}</SillyText>
                </SillyButton>
              );
            })}
          </ScrollView>
        </View>
        <View style={[item.name ? {} : silly.dn]}>
          <View style={[silly.fr, silly.jcbtw, silly.aic]}>
            <View>
              <SillyText color={clr1} style={{width: 0.6 * width}}>
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
    deleteProcedure: item => dispatch(deleteProcedure(item)),
    addProcedure: item => dispatch(addProcedure(item)),
    addProcedureTotal: item => dispatch(addProcedureTotal(item)),
    editStep: item => dispatch(editStep(item)),
  };
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Procedure);
