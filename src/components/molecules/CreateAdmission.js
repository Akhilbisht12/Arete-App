import React, { useState } from "react";
import { View, Text, Pressable, Picker } from "react-native";
import { RowBetween } from "../../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";
const CreateAdmission = ({ admProps }) => {
  const { IsAdmAdvised, setIsAdmAdvised, selectedAdmPkg, setSelectedAdmPkg, AdmDepartment, setAdmDepartment } =
    admProps;

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#D4B483",
        marginVertical: 10,
        borderRadius: 5,
      }}
    >
      <RowBetween style={{ flexDirection: "row" }}>
        <Text>Is admission Advised</Text>
        <Pressable onPress={() => setIsAdmAdvised(!IsAdmAdvised)}>
          {IsAdmAdvised ? (
            <Icon name="checkbox-outline" size={25} />
          ) : (
            <Icon name="square-outline" size={25} />
          )}
        </Pressable>
      </RowBetween>
      <View
        style={{
          display: IsAdmAdvised ? "flex" : "none",
        }}
      >
        <Picker
          selectedValue={AdmDepartment}
          onValueChange={(itemValue, itemIndex) => setAdmDepartment(itemValue)}
        >
          <Picker.Item label="Select Department" value={''} />
          <Picker.Item label="Cardiology" value={'Cardiology'} />
          <Picker.Item label="Neurology" value={'Neurology'} />
        </Picker>
        <Picker
          selectedValue={selectedAdmPkg}
          onValueChange={(itemValue, itemIndex) => setSelectedAdmPkg(itemValue)}
        >
          <Picker.Item label="Select Admission Package" value={0} />
          <Picker.Item label="CABG" value={120000} />
          <Picker.Item label="Some other surgery" value={100000} />
        </Picker>
        <Text
          style={{
            padding: 10,
            textAlign: "center",
            backgroundColor: "lightblue",
            borderRadius: 5,
            marginVertical: 10,
          }}
        >
          Est. Price: {selectedAdmPkg.valueOf(selectedAdmPkg)}
        </Text>
      </View>
    </View>
  );
};

export default CreateAdmission;
