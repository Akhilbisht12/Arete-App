import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  View,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  SillyButton,
  SillyInput,
  SillyText,
  SillyView,
} from '../../../Silly/components/silly_comps';
import silly from '../../../Silly/styles/silly';
import {
  addPaymentCompany,
  addPaymentType,
  editStep,
} from '../../../store/actions/SAEstimatorActions';
const {width} = Dimensions.get('window');
import DocumentPicker from 'react-native-document-picker';
import {clr1, clr4, clr5} from '../../../config/globals';
import axios from 'axios';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {SERVER_URL} from '../../../config/variables';
const PaymentWidget = ({
  advice,
  editStep,
  addPaymentCompany,
  addPaymentType,
}) => {
  const [insurance, setInsurance] = useState({
    upload: null,
    doc: null,
    insert: null,
  });
  const [loading, setLoading] = useState(false);
  const getInsuranceData = async file => {
    try {
      const formdata = new FormData();
      formdata.append('insurance', {
        uri: file.fileCopyUri,
        type: 'image/jpg',
        name: 'insurance',
      });
      console.log(file.fileCopyUri);
      const res = await axios.post(
        `${SERVER_URL}/api/v1/lead/insurance`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const number = res.data.policy_amount.split('%2C');
      addPaymentCompany({
        paymentCompany: advice.payment.insurance.company,
        policy_number: res.data.policy_number,
        policy_amount: number.join(''),
      });
      setInsurance(prev => {
        prev.number = res.data.policy_number;
        prev.show = false;
        prev.amount = number.join(',');
        return {...prev};
      });
    } catch (error) {
      console.log(error.response, 'error');
    }
  };
  console.log(insurance);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const panDocUpload = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: ['application/pdf'],
      }).then(async file => {
        await getInsuranceData(file);
      });
      setInsurance({...insurance, doc: panDocUpload});
      setLoading(false);
      advice.isIPDPackage ? editStep({step: 15}) : editStep({step: 14});
    } catch (error) {
      ToastAndroid.show(
        'Failed to fetch details. Please add manually!',
        ToastAndroid.SHORT,
      );
      console.log(error);
      editStep({step: 12.6});
      setLoading(false);
    }
  };
  return (
    <View>
      <SillyView style={[advice.step >= 12 ? {} : silly.dn]}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Select Payment Mode
          </SillyText>
          <View style={{width: width * 0.85}}>
            <Picker
              onBlur={() => {
                if (!advice.payment.mode) {
                  ToastAndroid.show('Field Required!', ToastAndroid.SHORT);
                  return;
                } else {
                  advice.payment.mode === 'cash' ||
                  advice.payment.mode === 'echg-cghs'
                    ? advice.isIPDPackage
                      ? editStep({step: 15})
                      : editStep({step: 14})
                    : editStep({step: 12.2});
                }
              }}
              style={{color: 'black'}}
              selectedValue={advice.payment.mode}
              onValueChange={(itemValue, itemIndex) => {
                addPaymentType({paymentType: itemValue});
              }}>
              <Picker.Item value="" label="Payment Mode" />
              <Picker.Item value="cash" label="Cash" />
              <Picker.Item value="echg-cghs" label="ECHG/CGHS" />
              <Picker.Item value="insurance" label="Insurance" />
            </Picker>
          </View>
        </View>
      </SillyView>
      {/* payment company */}
      <SillyView
        style={[
          advice.payment.mode === 'insurance' && advice.step >= 12.2
            ? {}
            : silly.dn,
        ]}>
        <View style={[silly.ais]}>
          <SillyText my={10} color="black">
            Select Payment Company
          </SillyText>
          <View style={{width: width * 0.85}}>
            <Picker
              onBlur={() => {
                if (!advice.payment.insurance.company) {
                  ToastAndroid.show('Field Required!', ToastAndroid.SHORT);
                  return;
                }
                editStep({step: 12.4});
              }}
              style={{color: 'black'}}
              selectedValue={advice.payment.insurance.company}
              onValueChange={(itemValue, itemIndex) => {
                addPaymentCompany({paymentCompany: itemValue});
              }}>
              <Picker.Item value="" label="Select Insurance Company" />
              <Picker.Item
                value="IFFCO Tokio General Insurance"
                label="IFFCO Tokio General Insurance"
              />
              <Picker.Item
                value="Care Health Insurance"
                label="Care Health Insurance"
              />
              <Picker.Item
                value="Magma HDI Insurance"
                label="Magma HDI Insurance"
              />
              <Picker.Item
                value="The Oriental Insurance Company"
                label="The Oriental Insurance Company"
              />
              <Picker.Item
                value="New India General Insurance"
                label="New India General Insurance"
              />
            </Picker>
          </View>
        </View>
      </SillyView>
      <SillyView
        style={[
          advice.payment.mode === 'insurance' && advice.step >= 12.4
            ? {}
            : silly.dn,
        ]}>
        <SillyText my={10} color="black">
          Do you want to upload insurance document?
        </SillyText>
        <View style={[silly.fr]}>
          {[
            {name: 'Yes', value: true},
            {name: 'No', value: false},
          ].map((item, i) => {
            return (
              <SillyButton
                onPress={() => {
                  setInsurance(prev => {
                    prev.upload = item.value;
                    return {...prev};
                  });
                }}
                bg={insurance.upload === item.value ? clr1 : clr5}
                key={i}>
                <SillyText>{item.name}</SillyText>
              </SillyButton>
            );
          })}
        </View>
        <SillyButton
          onPress={handleUpload}
          style={[
            silly.fr,
            silly.jcbtw,
            silly.bg3,
            silly.aic,
            silly.p1,
            silly.my1,
            insurance.upload ? {} : silly.dn,
          ]}>
          <SillyText family="Medium" size={18} color={clr1} fw={700}>
            {insurance.doc ? 'document name' : 'Upload Insurance Document'}
          </SillyText>
          {loading ? (
            <ActivityIndicator color={clr4} size={35} />
          ) : (
            <Ionicon
              style={[silly.ph, silly.bg1, silly.br5, silly.mh]}
              name="add-outline"
              size={15}
              color="white"
            />
          )}
        </SillyButton>
        <View style={[insurance.upload === false ? {} : silly.dn]}>
          <SillyText my={10} color="black">
            Do you want to insert policy number & amount?
          </SillyText>
          <View style={[silly.fr]}>
            {[
              {name: 'Yes', value: true},
              {name: 'No', value: false},
            ].map((item, i) => {
              return (
                <SillyButton
                  onPress={() => {
                    setInsurance(prev => {
                      prev.insert = item.value;
                      return {...prev};
                    });
                    item.value ? null : editStep({step: 12.6});
                  }}
                  bg={insurance.insert === item.value ? clr1 : clr5}
                  key={i}>
                  <SillyText>{item.name}</SillyText>
                </SillyButton>
              );
            })}
          </View>
        </View>

        <View
          style={[
            insurance.insert || (advice.step && insurance.upload >= 12.6)
              ? {}
              : silly.dn,
          ]}>
          <SillyText color={clr1}>Policy Number</SillyText>
          <SillyInput
            keyboardType={'number-pad'}
            value={advice.payment.insurance.policy_number}
            onBlur={() => {
              if (!advice.payment.insurance.policy_number) {
                ToastAndroid.show('Field Required!', ToastAndroid.SHORT);
                return;
              }
              advice.isIPDPackage ? editStep({step: 15}) : editStep({step: 14});
            }}
            onChangeText={number =>
              addPaymentCompany({
                paymentCompany: advice.payment.insurance.company,
                policy_number: number,
                policy_amount: advice.payment.insurance.policy_amount,
              })
            }
            placeholder="Policy Number"
          />
          <SillyText color={clr1}>Policy Amount</SillyText>
          <SillyInput
            keyboardType={'number-pad'}
            value={advice.payment.insurance.policy_amount}
            onBlur={() => {
              if (!advice.payment.insurance.policy_amount) {
                ToastAndroid.show('Field Required!', ToastAndroid.SHORT);
                return;
              }
              advice.isIPDPackage ? editStep({step: 15}) : editStep({step: 14});
            }}
            onChangeText={amount =>
              addPaymentCompany({
                paymentCompany: advice.payment.insurance.company,
                policy_number: advice.payment.insurance.policy_number,
                policy_amount: amount,
              })
            }
            placeholder="Policy Amount"
          />
        </View>
        <TouchableOpacity
          style={[silly.ph, silly.aie]}
          onPress={() =>
            advice.isIPDPackage ? editStep({step: 15}) : editStep({step: 14})
          }>
          <SillyText color={clr1}>Skip</SillyText>
        </TouchableOpacity>
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
    editStep: item => dispatch(editStep(item)),
    addPaymentType: item => dispatch(addPaymentType(item)),
    addPaymentCompany: item => dispatch(addPaymentCompany(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWidget);
