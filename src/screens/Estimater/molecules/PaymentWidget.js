import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import {
  addPaymentCompany,
  addPaymentType,
  editStep,
} from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import styles from "../styles";
const { width } = Dimensions.get("window");

const PaymentWidget = ({
  advice,
  editStep,
  addPaymentCompany,
  addPaymentType,
}) => {
  return (
    <View>
      <EstimateBox style={{ display: advice.step >= 7 ? "flex" : "none" }}>
        <ColumnStart>
          <Text style={styles.title}>Select Payment Mode</Text>
          <View style={{ width: width * 0.85 }}>
            <Picker
              selectedValue={advice.paymentType}
              onValueChange={(itemValue, itemIndex) => {
                itemValue === "cash"
                  ? advice.isIPDPackage
                    ? editStep({ step: 10 })
                    : editStep({ step: 9 })
                  : editStep({ step: 8 });
                addPaymentType({ paymentType: itemValue });
              }}
            >
              <Picker.Item value="" label="Payment Mode" />
              <Picker.Item value="cash" label="Cash" />
              <Picker.Item value="echg-cghs" label="ECHG/CGHS" />
              <Picker.Item value="insurance" label="Insurance" />
            </Picker>
          </View>
        </ColumnStart>
      </EstimateBox>
      {/* payment company */}
      <EstimateBox
        style={{
          display:
            advice.step >= 8 && advice.paymentType !== "cash" ? "flex" : "none",
        }}
      >
        <ColumnStart>
          <Text style={styles.title}>Select Payment Company</Text>
          <View style={{ width: width * 0.85 }}>
            <Picker
              selectedValue={advice.paymentCompany}
              onValueChange={(itemValue, itemIndex) => {
                advice.isIPDPackage
                  ? editStep({ step: 10 })
                  : editStep({ step: 9 });
                addPaymentCompany({ paymentCompany: itemValue });
              }}
            >
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
        </ColumnStart>
      </EstimateBox>
    </View>
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
    addPaymentType: (item) => dispatch(addPaymentType(item)),
    addPaymentCompany: (item) => dispatch(addPaymentCompany(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWidget);
