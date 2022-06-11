import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import { RowBetween } from "../../styles/FlexView";

const {width}  = Dimensions.get('window')

const RoomSelect = ({dispatch, advices}) => {
  return (
    <RowBetween>
      <View>
        <Picker
          style={{ width: width * 0.45 }}
          selectedValue={advices.bedType}
          onValueChange={(itemValue, itemIndex) =>
            dispatch({
              type: "EDIT_DETAILS",
              payload: {
                ward: advices.ward,
                icu: advices.icu,
                bedType: itemValue,
                bedCode: advices.bedCode,
                idIPDPackage: advices.isIPDPackage,
              },
            })
          }
        >
          <Picker.Item label="Four Sharing" value="Four_Sharing" />
          <Picker.Item label="Twin Sharing" value="Twin_Sharing" />
          <Picker.Item label="Single Room" value="Single_Room" />
          <Picker.Item label="Deluxe Room" value="Deluxe_Room" />
          <Picker.Item label="Suite Room" value="Suite_Room" />
        </Picker>
      </View>
      <View>
        <Text>Ward Stay</Text>
        <TextInput
          textContentType="telephoneNumber"
          onChangeText={(text) =>
            dispatch({
              type: "EDIT_DETAILS",
              payload: {
                ward: text,
                icu: advices.icu,
                bedType: advices.bedType,
                bedCode: advices.bedCode,
                idIPDPackage: advices.isIPDPackage,
              },
            })
          }
          value={advices.ward}
          keyboardType="number-pad"
          placeholder="Ward"
          style={styles.input}
        />
      </View>
      <View>
        <Text>245</Text>
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
  

export default RoomSelect;
