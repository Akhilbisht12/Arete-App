import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import axios from 'axios';
import {SERVER_URL} from '../config/variables';
import ImgBox from '../styles/ImgBox';
import HeadingText from '../styles/HeadingText';
import {RowStart} from '../styles/FlexView';
import PatientDetailedView from '../styles/PatientDetailsView';
import PatientSessionTabs from '../components/organisms/PatientSessionTabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  addEmail,
  addAge,
  addFullName,
  addGender,
  addPhone,
} from '../store/actions/SAEstimatorActions';

const {width, height} = Dimensions.get('window');

const PatientEntry = ({
  route,
  addEmail,
  addAge,
  addFullName,
  addGender,
  addPhone,
}) => {
  const [showAction, setShowAction] = useState(false);
  const [isAdmission, setisAdmission] = useState(0);
  const [selectedAdmPkg, setSelectedAdmPkg] = useState(0);

  const data = route.params.data;
  addFullName({patient: data});

  return (
    <ScrollView style={Styles.main}>
      <View style={Styles.spaceBetween}>
        <View>
          <PatientDetailedView>
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 5,
                fontFamily: 'Poppins-Medium',
                fontSize: 22,
                textAlign: 'right',
              }}>
              UHID {data.uhid}
            </Text>
            <RowStart>
              <ImgBox>
                <HeadingText>
                  {data.firstName[0]}
                  {data.lastName[0]}
                </HeadingText>
              </ImgBox>
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  fontFamily: 'Poppins-Medium',
                }}>
                {data.firstName} {data.lastName}
              </Text>
              {data.gender == 'M' ? (
                <Icon name="male" size={15} color={'white'} />
              ) : data.gender == 'F' ? (
                <Icon name="female" size={15} color={'white'} />
              ) : (
                <Icon name="male-female" size={15} color={'white'} />
              )}
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 16,
                }}>
                {data.age} Yrs
              </Text>
            </RowStart>
            <RowStart style={{paddingTop: 10}}>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Phone No.
              </Text>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                +91 {data.phone}
              </Text>
            </RowStart>
            <RowStart>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Email:
              </Text>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                {data.email}
              </Text>
            </RowStart>
            {/* <RowStart>
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 5,
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Date Of Registration:
              </Text>
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 5,
                  fontFamily: "Poppins-Medium",
                  fontSize: 14,
                }}
              >
                {moment(data.createdAt).format("DD/MM/YY hh:mm a")}
              </Text>
            </RowStart> */}
            <RowStart>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                Speciality:
              </Text>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                Dr. Naveen Jain (Cardiology)
              </Text>
            </RowStart>
          </PatientDetailedView>
          <PatientSessionTabs patientID={data._id} />
        </View>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative',
  },
  nameView: {
    padding: 10,
    backgroundColor: 'pink',
  },
  spaceBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  popup: {
    backgroundColor: 'pink',
    width: 0.8 * width,
    height: 0.2 * height,
    top: 0.4 * height,
    left: 0.1 * width,
    borderRadius: 5,
    padding: 15,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
const mapDispatchToProps = dispatch => {
  return {
    addFullName: item => dispatch(addFullName(item)),
    addEmail: item => dispatch(addEmail(item)),
    addAge: item => dispatch(addAge(item)),
    addGender: item => dispatch(addGender(item)),
    addPhone: item => dispatch(addPhone(item)),
  };
};
export default connect(null, mapDispatchToProps)(PatientEntry);
