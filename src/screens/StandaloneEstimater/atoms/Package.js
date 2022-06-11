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
  deletePackage,
} from '../../../store/actions/SAEstimatorActions';
import Icon from 'react-native-vector-icons/Ionicons';
import {PackageList} from '../../../config/IPDPackage';
import {
  SillyView,
  SillyText,
  SillyInput,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {clr1} from '../../../config/globals';

const {width, height} = Dimensions.get('window');

const Package = ({item, index, advice, addPackage, deletePackage}) => {
  const [Prescription, setPrescription] = useState([]);

  const handleSearchPres = async text => {
    const result = await PackageList.filter(str => {
      return str.Service_Name.toLocaleLowerCase().includes(text.toLowerCase());
    });
    setPrescription(result.slice(0, 100));
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
        <View style={{display: item.Service_Name ? 'none' : 'flex'}}>
          <SillyInput
            style={[silly.w75p]}
            placeholder="find packages"
            onChangeText={text => handleSearchPres(text)}
          />
          <ScrollView
            nestedScrollEnabled
            style={{marginVertical: 2, padding: 2, maxHeight: 0.15 * height}}>
            {Prescription.map(item => {
              return (
                <SillyButton
                  bg="lightgray"
                  key={item.ServiceId}
                  onPress={() => addServiceToState(item)}>
                  <SillyText color="black">{item.Service_Name}</SillyText>
                </SillyButton>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            display: item.Service_Name ? 'flex' : 'none',
          }}>
          <View style={[silly.fr, silly.jcbtw]}>
            <View>
              <SillyText color="black" my={5} style={{width: 0.6 * width}}>
                {item.Service_Name ? item.Service_Name : ''}
              </SillyText>
              <View style={[silly.fr]}>
                <SillyView bg={clr1}>
                  <SillyText>
                    {item.Department_Name ? item.Department_Name : ''}
                  </SillyText>
                </SillyView>
                <SillyView bg={clr1}>
                  <SillyText>
                    {item.Department_Type ? item.Department_Type : ''}
                  </SillyText>
                </SillyView>
              </View>
            </View>
            <View style={[silly.jcc]}>
              <SillyText color="black">{getServicePrice()}</SillyText>
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
  };
};

const mapStateToProps = state => {
  return {
    advice: state.SAEst,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Package);
