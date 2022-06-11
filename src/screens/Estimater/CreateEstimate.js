import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { SERVER_URL } from "../../config/variables";
import { ColumnStart } from "../../styles/FlexView";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from "react-native";
import {
  addDoctor,
  addRemark,
  addVisitTotal,
  editStep,
} from "../../store/actions/adviceAction";
import { useNavigation } from "@react-navigation/native";
import SurgeryMap from "./molecules/SurgeryMap";
import InvestigationMap from "./molecules/InvestigationMap";
import ProcedureMap from "./molecules/ProcedureMap";
import PackageMap from "./molecules/PackageMap";
import EstimateType from "./molecules/EstimateType";
import BedWidget from "./molecules/BedWidget";
import EmergencyWidget from "./molecules/EmergencyWidget";
import PaymentWidget from "./molecules/PaymentWidget";
import MultiCharges from "./molecules/MultiCharges";
import { EstimateBox } from "../../styles/styledBoxes";
import { Picker } from "@react-native-picker/picker";
import { doctorVisitCharges } from "../../utils/EstimateCalculator";

const { width } = Dimensions.get("window");

const CreateEstimate = ({
  patientID,
  advice,
  addDoctor,
  editStep,
  addVisitTotal,
  route,
}) => {
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  useEffect(() => {
    console.log(advice);
    scrollRef.current.scrollToEnd({ animated: true });
    // var totalTemp = 0;
    // advice.services.map((item) => {
    //   for (const [key, value] of Object.entries(item)) {
    //     if (key === advice.wardBedType) {
    //       totalTemp +=
    //         value === "" ? 0 : parseInt(value.replace(",", "")) * advice.ward;
    //     }
    //   }
    // });
    // setTotal(totalTemp);
    if (advice.step === 5) {
      addVisitTotal({ visitTotal: doctorVisitCharges() });
    }
  }, [advice.step]);

  const handleCreateSession = async () => {
    const session = advice.services.map((item) => {
      return {
        serviceName: item.Service_Name,
        serviceId: item.ServiceId,
        departmentName: item.Department_Name,
        departmentType: item.Department_Type,
      };
    });
    const createSession = await axios.post(
      `${SERVER_URL}/api/v1/patient/createNewSession`,
      {
        patientID,
        bedType: advice.bedType,
        bedCode: 1,
        wardStay: advice.ward,
        ICUStay: advice.icu,
        estimate: total,
        services: session,
      }
    );
    if (createSession.status == 200) {
      ToastAndroid.show("Estimate created successfull", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Something went wrong please try again",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{
        justifyContent: "flex-end",
        flexGrow: 1,
      }}
    >
      <View
        style={{
          marginVertical: 20,
          padding: 10,
          justifyContent: "flex-end",
        }}
      >
        <EstimateType />
        <BedWidget />
        <EmergencyWidget />
        {/* enter doctors name */}
        <EstimateBox style={{ display: advice.step >= 6 ? "flex" : "none" }}>
          <ColumnStart>
            <Text style={styles.title}>Type Doctor's Name</Text>
            {/* <TextInput
              value={advice.doctor}
              onChangeText={(text) => addDoctor({ doctor: text })}
              onSubmitEditing={() => editStep({ step: 7 })}
              placeholder="Dr Name"
              style={[styles.input, { width: 0.43 * width }]}
            /> */}
            <Picker
              selectedValue={advice.doctor}
              onValueChange={(itemValue) => {
                addDoctor({ doctor: itemValue });
                let step = 7;
                if (advice.doctor == itemValue) {
                  editStep({ step: step });
                } else {
                  editStep({ step: step });
                }
              }}
              style={{
                width: width * 0.85,
              }}
            >
              <Picker.Item value="" label="Select Doctor" />
              <Picker.Item
                value="Dr. Ramesh Talwas"
                label="Dr. Ramesh Talwas"
              />
              <Picker.Item value="Dr. Naveen Jain" label="Dr. Naveen Jain" />
              <Picker.Item value="Dr. Kanti Jindal" label="Dr. Kanti Jindal" />
              <Picker.Item
                value="Dr. Seema Aggarwal"
                label="Dr. Seema Aggarwal"
              />
            </Picker>
          </ColumnStart>
        </EstimateBox>
        <PaymentWidget />
        <SurgeryMap />
        <PackageMap />
        <InvestigationMap />
        <ProcedureMap />
        <MultiCharges data={route.params.data} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.4,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    borderRadius: 0,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  option: {
    backgroundColor: "lightgray",
    margin: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    marginVertical: 4,
  },
});

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDoctor: (item) => dispatch(addDoctor(item)),
    addRemark: (item) => dispatch(addRemark(item)),
    editStep: (item) => dispatch(editStep(item)),
    addVisitTotal: (item) => dispatch(addVisitTotal(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEstimate);

export { styles };
