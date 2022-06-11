import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { connect } from "react-redux";
import { addAdvice, editStep } from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import Surgery from "../atoms/Surgery";
import styles from "../styles";
const { width } = Dimensions.get("window");

const SurgeryMap = ({ addAdvice, advice, editStep }) => {
  const sortedService = advice.services.sort((a, b) => {
    return b - a;
  });
  return (
    <EstimateBox
      style={{
        display: advice.step >= 9 && !advice.isIPDPackage ? "flex" : "none",
      }}
    >
      <ColumnStart>
        <Text style={styles.title}>Add Surgery</Text>
        <ColumnStart>
          <View>
            {advice.services
              .sort((a, b) => {
                return b.OPD - a.OPD;
              })
              .map((item, index) => {
                return <Surgery key={index} item={item} index={index} />;
              })}
            <Pressable
              style={{ marginVertical: 5 }}
              onPress={() => addAdvice()}
            >
              <Text
                style={{
                  color: "blue",
                }}
              >
                Add surgery
              </Text>
            </Pressable>
          </View>
        </ColumnStart>
        <View
          style={{
            alignItems: "flex-end",
            width: width * 0.85,
            display: advice.step === 9 ? "flex" : "none",
          }}
        >
          <Pressable
            style={styles.option}
            onPress={() => editStep({ step: 11 })}
          >
            <Text>Next</Text>
          </Pressable>
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
const mapDispatchToProps = (dispatch) => {
  return {
    addAdvice: () => dispatch(addAdvice()),
    editStep: (item) => dispatch(editStep(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurgeryMap);
