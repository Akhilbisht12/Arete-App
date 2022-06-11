import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  addNewProcedure,
  addProcedureTotal,
  editStep,
} from "../../../store/actions/adviceAction";
import { ColumnStart, RowBetween } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import { calculateProcedure } from "../../../utils/EstimateCalculator";
import Diagnostics from "../atoms/Diagnostics";
import Procedure from "../atoms/Procedure";
import styles from "../styles";
import Icon from "react-native-vector-icons/Ionicons";
import Medicine from "../atoms/Medicine";

const { width, height } = Dimensions.get("window");

const MedicineMap = ({
  addNewProcedure,
  advice,
  addProcedureTotal,
  editStep,
}) => {
  return (
    <EstimateBox>
      <ColumnStart>
        <Text style={styles.title}>Add Medicine</Text>
        <ColumnStart>
          <View>
            {advice.procedures.map((item, index) => {
              return <Medicine key={index} item={item} index={index} />;
            })}
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => addNewProcedure()}
              >
                <Icon name="add-circle-outline" size={20} color={"black"} />
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins-Bold",
                  }}
                >
                  Add Another Medicine
                </Text>
              </Pressable>
              {/* <Pressable
                style={styles.option}
                onPress={() => {
                  addProcedureTotal({ procedureTotal: calculateProcedure() });
                  console.log(calculateProcedure());
                }}
              >
                <Text>calculate Total</Text>
              </Pressable> */}
            </View>
          </View>
        </ColumnStart>
        {/* <RowBetween style={{ marginVertical: 2 }}>
          <Text
            style={{
              width: 0.41 * width,
              paddingHorizontal: 10,
              fontSize: 17,
              fontWeight: "700",
              color: "gray",
            }}
          >
            Diagnostics Total
          </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="value"
            value={advice.procedureTotal.toString()}
            onChangeText={(text) => {
              if (!text) {
                addProcedureTotal({ procedureTotal: parseInt(0) });
              } else {
                addProcedureTotal({ procedureTotal: parseInt(text) });
              }
            }}
            style={[styles.input, { width: 0.41 * width }]}
          />
        </RowBetween> */}
      </ColumnStart>
    </EstimateBox>
  );
};
const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewProcedure: () => dispatch(addNewProcedure()),
    addProcedureTotal: (item) => dispatch(addProcedureTotal(item)),
    editStep: (item) => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MedicineMap);
