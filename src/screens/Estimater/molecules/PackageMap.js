import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { connect } from "react-redux";
import { addNewPackage, editStep } from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import Package from "../atoms/Package";
import styles from "../styles";
const { width } = Dimensions.get("window");

const PackageMap = ({ addNewPackage, advice, editStep }) => {
  return (
    <EstimateBox
      style={{
        display: advice.step >= 10 && advice.isIPDPackage ? "flex" : "none",
      }}
    >
      <ColumnStart>
        <Text style={styles.title}>Add Package</Text>
        <ColumnStart>
          <View>
            {advice.packages.map((item, index) => {
              return <Package key={index} item={item} index={index} />;
            })}
            <Pressable
              style={{ marginVertical: 5 }}
              onPress={() => addNewPackage()}
            >
              <Text
                style={{
                  color: "blue",
                }}
              >
                Add a Package
              </Text>
            </Pressable>
          </View>
        </ColumnStart>
        <View
          style={{
            alignItems: "flex-end",
            width: width * 0.85,
            display: advice.step === 10 ? "flex" : "none",
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
    addNewPackage: () => dispatch(addNewPackage()),
    editStep: (item) => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PackageMap);
