import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { connect } from "react-redux";
import { BedFeeMaster } from "../../../config/BedFee";
import { addIcuBed, addIcuStay } from "../../../store/actions/adviceAction";
import { RowBetween } from "../../../styles/FlexView";
import styles from "../styles";
const { width } = Dimensions.get("window");

const IcuBedDetails = ({ addIcuBed, addIcuStay, advice }) => {
  const [Total, setTotal] = useState(0);
  useEffect(() => {
    let temptotal = 0;
    BedFeeMaster.map((item) => {
      if (item.Billing_Code === advice.icuBedType) {
        temptotal += (advice.isEmergency?item.Emergency_Fee:item.IP_Fee)*advice.icu;
      }
    });
    setTotal(temptotal);
  }, [advice]);
  return (
    <RowBetween>
      <View style={{ width: width * 0.45 }}>
        <Picker
          
          selectedValue={advice.icuBedType}
          onValueChange={(itemValue, itemIndex) =>
            addIcuBed({ icuBed: itemValue })
          }
        >
          {BedFeeMaster.map((item) => {
            return (
              <Picker.Item
                key={item.Service_Id}
                label={item.Bed_Category}
                value={item.Billing_Code}
              />
            );
          })}
        </Picker>
      </View>
      <View style={{ width: width * 0.25 }}>
        <Text>ICU Stay</Text>
        <TextInput
          textContentType="telephoneNumber"
          value={advice.icu}
          onChangeText={(text) => addIcuStay({ icuStay: text })}
          keyboardType="number-pad"
          placeholder="ICU"
          style={styles.input}
        />
      </View>
      <View style={{ width: width * 0.3 }}>
        <Text>{Total} INR</Text>
      </View>
    </RowBetween>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.2,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addIcuBed: (item) => dispatch(addIcuBed(item)),
    addIcuStay: (item) => dispatch(addIcuStay(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IcuBedDetails);
