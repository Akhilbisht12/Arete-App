import React from "react";
import { View, Text, Pressable, Dimensions, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  addInvestigationTotal,
  addNewInvestigation,
  addNewOTH,
  editStep,
} from "../../../store/actions/adviceAction";
import { ColumnStart, RowBetween } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import { calculateInvestigation } from "../../../utils/EstimateCalculator";
import Investigation from "../atoms/Investigation";
import styles from "../styles";
const { width } = Dimensions.get("window");

const OTHMap = ({
  addNewInvestigation,
  advice,
  addInvestigationTotal,
  editStep,
}) => {
  const handleUpdateInvestigation = () => {
    const investigation = calculateInvestigation();
    addInvestigationTotal({ investigationTotal: investigation });
  };

  return (
    <EstimateBox style={{ display: advice.step >= 11 ? "flex" : "none" }}>
      <ColumnStart>
        <Text style={styles.title}>Add Investigation</Text>
        <ColumnStart>
          <View>
            {advice.investigations.map((item, index) => {
              return <Investigation key={index} item={item} index={index} />;
            })}
            <RowBetween>
              <Pressable
                style={{ marginVertical: 5 }}
                onPress={() => addNewInvestigation()}
              >
                <Text
                  style={{
                    color: "blue",
                  }}
                >
                  Add a investigation
                </Text>
              </Pressable>
              <Pressable
                style={styles.option}
                onPress={handleUpdateInvestigation}
              >
                <Text>calculate Total</Text>
              </Pressable>
            </RowBetween>
          </View>
        </ColumnStart>
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
            Investigation
          </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="value"
            value={advice.investigationTotal.toString()}
            onChangeText={(text) =>
              addInvestigationTotal({ investigationTotal: parseInt(text) })
            }
            style={[styles.input, { width: 0.41 * width }]}
          />
        </RowBetween>
      </ColumnStart>
      <View
        style={{
          alignItems: "flex-end",
          width: width * 0.85,
          display: advice.step === 11 ? "flex" : "none",
        }}
      >
        <Pressable style={styles.option} onPress={() => editStep({ step: 12 })}>
          <Text>Next</Text>
        </Pressable>
      </View>
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
    addNewOTH: () => dispatch(addNewOTH()),
    editStep: (item) => dispatch(editStep(item)),
    addInvestigationTotal: (item) => dispatch(addot(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTHMap);
