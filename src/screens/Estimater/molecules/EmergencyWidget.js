import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { connect } from "react-redux";
import { editEmergency, editStep } from "../../../store/actions/adviceAction";
import { ColumnStart, Row } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import styles from "../styles";
const { width } = Dimensions.get("window");

const EmergencyWidget = ({ advice, editStep, editEmergency }) => {
  return (
    <EstimateBox style={{ display: advice.step >= 5 ? "flex" : "none" }}>
      <ColumnStart>
        <Text style={styles.title}>Is emergency case?</Text>
        <Row>
          <Pressable
            style={[
              styles.option,
              {
                backgroundColor:
                  advice.step >= 6 && advice.isEmergency
                    ? "lightblue"
                    : "lightgray",
              },
            ]}
            onPress={() => {
              if (advice.doctor) {
                editStep({ step: 7 });
              } else {
                editStep({ step: 6 });
              }

              editEmergency({ emergency: true });
            }}
          >
            <Text>Yes</Text>
          </Pressable>
          <Pressable
            style={[
              styles.option,
              {
                backgroundColor:
                  advice.step >= 6 && !advice.isEmergency
                    ? "lightblue"
                    : "lightgray",
              },
            ]}
            onPress={() => {
              if (advice.doctor) {
                editStep({ step: 7 });
              } else {
                editStep({ step: 6 });
              }
              editEmergency({ emergency: false });
            }}
          >
            <Text>No</Text>
          </Pressable>
        </Row>
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
    editStep: (item) => dispatch(editStep(item)),
    editEmergency: (item) => dispatch(editEmergency(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyWidget);
