import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { RowBetween, RowEven } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
const { width, height } = Dimensions.get("window");
import SessionHistoryTab from "./SessionHistoryTab";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { restoreState } from "../../store/actions/adviceAction";
import { connect } from "react-redux";

const PatientSessionTabs = ({ patientID, restoreState }) => {
  const navigation = useNavigation();
  const [IsHistoryActive, setIsHistoryActive] = useState(true);
  return (
    <View>
      {/* <PatientDetailedView label>
        <RowBetween>
          <PatientDetailedView
            style={{ backgroundColor: IsHistoryActive ? "#C1666B" : "#E4DFDA" }}
          >
            <Pressable style={{ width: 0.36 * width }}>
              <Text>Session History</Text>
            </Pressable>
          </PatientDetailedView>
          <PatientDetailedView
            style={{ backgroundColor: IsHistoryActive ? "#E4DFDA" : "#C1666B" }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("CreateEstimate", { patientID })
              }
              style={{ width: 0.36 * width }}
            >
              <Text>Create Estimate</Text>
            </Pressable>
          </PatientDetailedView>
        </RowBetween>

        <PatientDetailedView style={{ backgroundColor: "lightgray" }}>
          <Pressable
            onPress={() =>
              navigation.navigate("QuickPrescriptionUpload", { patientID })
            }
          >
            <Text style={{ textAlign: "center" }}>
              Quick Prescription Upload
            </Text>
          </Pressable>
        </PatientDetailedView>
        {IsHistoryActive ? (
          <SessionHistoryTab patientID={patientID} />
        ) : (
          <CreateNewSessionTab patientID={patientID} />
        )}
      </PatientDetailedView> */}
      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={() => navigation.navigate("PatientHistory", { patientID })}
          style={{
            margin: 10,
            width: width * 0.9,
            backgroundColor: "#f5f5f5",
            elevation: 3,
            borderRadius: 7,
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Icon name="finger-print" size={30} color={"#151E3F"} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "#030303",
              textAlign: "center",
              paddingHorizontal: 10,
            }}
          >
            Patient History
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("FullPrescription", { patientID })}
          style={{
            margin: 10,
            width: width * 0.9,
            backgroundColor: "#f5f5f5",
            elevation: 3,
            borderRadius: 7,
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Icon name="cloud-upload" size={30} color={"#151E3F"} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "#030303",
              textAlign: "center",
              paddingHorizontal: 10,
            }}
          >
            Upload Full Prescription
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            restoreState({});
            navigation.navigate("CreateEstimate", { patientID });
          }}
          style={{
            margin: 10,
            width: width * 0.9,
            backgroundColor: "#f5f5f5",
            elevation: 3,
            borderRadius: 7,
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Icon name="calculator-outline" size={30} color={"#151E3F"} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "#030303",
              textAlign: "center",
              paddingHorizontal: 10,
            }}
          >
            Create Admission Estimate
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate("QuickPrescriptionUpload", { patientID })
          }
          style={{
            margin: 10,
            width: width * 0.9,
            backgroundColor: "#f5f5f5",
            elevation: 3,
            borderRadius: 7,
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Icon name="scan" size={30} color={"#151E3F"} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "#030303",
              textAlign: "center",
              paddingHorizontal: 10,
            }}
          >
            Quick Prescription Upload
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    restoreState: (item) => dispatch(restoreState(item)),
  };
};

export default connect(null, mapDispatchToProps)(PatientSessionTabs);
