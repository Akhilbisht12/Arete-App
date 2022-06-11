import React from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {
  addNewPackage,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
import Package from '../atoms/Package';
import {
  SillyView,
  SillyText,
  SillyButton,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
const {width} = Dimensions.get('window');

const PackageMap = ({addNewPackage, advice}) => {
  return (
    <SillyView
      style={{
        display: advice.step >= 10 && advice.isIPDPackage ? 'flex' : 'none',
      }}>
      <View>
        <SillyText color="black" my={10}>
          Add Package
        </SillyText>
        <View>
          <View>
            {advice.packages.services.map((item, index) => {
              return <Package key={index} item={item} index={index} />;
            })}
            <View style={[silly.fr]}>
              <SillyButton
                style={{marginVertical: 5}}
                onPress={() => addNewPackage()}>
                <SillyText>Add a Package</SillyText>
              </SillyButton>
            </View>
          </View>
        </View>
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
    addNewPackage: () => dispatch(addNewPackage()),
    editStep: item => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PackageMap);
