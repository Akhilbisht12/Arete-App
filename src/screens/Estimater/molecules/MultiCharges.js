import React from "react";
import { View, Text, Dimensions, TextInput, Pressable } from "react-native";
import { connect } from "react-redux";
import {
  addBloodRequirement,
  addEquipmentCharge,
  addMedicineCharge,
  addStent,
  addVisitTotal,
  editStep,
  data,
} from "../../../store/actions/adviceAction";
import {
  ColumnCenter,
  ColumnStart,
  RowBetween,
} from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const MultiCharges = ({
  advice,
  addMedicineCharge,
  addVisitTotal,
  addBloodRequirement,
  addEquipmentCharge,
  addStent,
  patientID,
}) => {
  const navigation = useNavigation();
  return (
    <EstimateBox style={{ display: advice.step >= 13 ? "flex" : "none" }}>
      <ColumnStart>
        <View>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Visit Charge
            </Text>
            <TextInput
              value={advice.visitTotal.toString()}
              onChangeText={(text) => {
                if (!text) {
                  addVisitTotal({ visitTotal: parseInt(0) });
                } else {
                  addVisitTotal({ visitTotal: parseInt(text) });
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Medicine Charge
            </Text>
            <TextInput
              value={advice.medicine.toString()}
              onChangeText={(text) => {
                if (!text) {
                  addMedicineCharge({ medicine: parseInt(0) });
                } else {
                  addMedicineCharge({ medicine: parseInt(text) });
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Equipment Charge
            </Text>
            <TextInput
              value={advice.equipment.toString()}
              onChangeText={(text) => {
                if (!text) {
                  addEquipmentCharge({ equipment: parseInt(0) });
                } else {
                  addEquipmentCharge({ equipment: parseInt(text) });
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Blood Requirement
            </Text>
            <TextInput
              value={advice.blood.toString()}
              onChangeText={(text) => {
                if (!text) {
                  addBloodRequirement({ blood: parseInt(0) });
                } else {
                  addBloodRequirement({ blood: parseInt(text) });
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Stent/Implant Cost
            </Text>
            <TextInput
              value={advice.stent.toString()}
              onChangeText={(text) => {
                if (!text) {
                  addStent({ stent: parseInt(0) });
                } else {
                  addStent({ stent: parseInt(text) });
                }
              }}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          {data == false ? (
            <ColumnCenter>
              <Pressable
                style={styles.option}
                onPress={() => navigation.navigate("EstimateOutput")}
              >
                <Text>Preview Estimate</Text>
              </Pressable>
            </ColumnCenter>
          ) : (
            <ColumnCenter>
              <Pressable
                style={styles.option}
                onPress={() => {
                  navigation.goBack("FullPrescription");
                }}
              >
                <Text>Go Back To Prescription</Text>
              </Pressable>
            </ColumnCenter>
          )}
        </View>
      </ColumnStart>
    </EstimateBox>
  );
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = (dispacth) => {
  return {
    addVisitTotal: (item) => dispacth(addVisitTotal(item)),
    addMedicineCharge: (item) => dispacth(addMedicineCharge(item)),
    addBloodRequirement: (item) => dispacth(addBloodRequirement(item)),
    addEquipmentCharge: (item) => dispacth(addEquipmentCharge(item)),
    addStent: (item) => dispacth(addStent(item)),
    editStep: (item) => dispacth(editStep(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiCharges);
