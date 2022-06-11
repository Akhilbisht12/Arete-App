import React, { useState } from "react";
import { View, Text, Pressable, Picker } from "react-native";
import { RowBetween } from "../../styles/FlexView";
import Icon from 'react-native-vector-icons/Ionicons'

const CreatePETCT = ({ petProps }) => {
  const { IsPETCTAdvised, setIsPETCTAdvised, selectedPETCT, setSelectedPETCT, PETCTDepartment, setPETCTDepartment } =
    petProps;
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#D4B483",
        marginVertical: 10,
        borderRadius: 5,
      }}
    >
      <RowBetween>
        <Text>Is PET-CT Advised</Text>
        <Pressable onPress={() => setIsPETCTAdvised(!IsPETCTAdvised)}>
          {IsPETCTAdvised ? (
            <Icon name="checkbox-outline" size={25} />
          ) : (
            <Icon name="square-outline" size={25} />
          )}
        </Pressable>
      </RowBetween>
      <View
        style={{
          display: IsPETCTAdvised ? "flex" : "none",
        }}
      >
        <Picker
          selectedValue={PETCTDepartment}
          onValueChange={(itemValue, itemIndex) => setPETCTDepartment(itemValue)}
        >
          <Picker.Item label="Select PETCT Department" value={''} />
          <Picker.Item label="Dept 1" value={'Dept'} />
          <Picker.Item label="Dept 2" value={'Dept'} />
        </Picker>
        <Picker
          selectedValue={selectedPETCT}
          onValueChange={(itemValue, itemIndex) => setSelectedPETCT(itemValue)}
        >
          <Picker.Item label="Select PET-CT Package" value={0} />
          <Picker.Item label="PET-CT" value={140000} />
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
          Est. Price: {selectedPETCT.valueOf(selectedPETCT)}
        </Text>
      </View>
    </View>
  );
};

export default CreatePETCT;
