import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import { addPackage, deletePackage } from "../../../store/actions/adviceAction";
import { ColumnCenter, Row, RowBetween } from "../../../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";
import { PackageList } from "../../../config/IPDPackage";

const { width, height } = Dimensions.get("window");

const Package = ({ item, index, advice, addPackage, deletePackage }) => {
  const [Prescription, setPrescription] = useState([]);

  const handleSearchPres = async (text) => {
    const result = await PackageList.filter((str) => {
      return str.Service_Name.toLocaleLowerCase().includes(text.toLowerCase());
    });
    setPrescription(result.slice(0, 100));
  };

  const addServiceToState = (item) => {
    addPackage({ newPackage: item, pkg_id: index });
  };

  const getServicePrice = () => {
    let price = null;
    for (const [key, value] of Object.entries(item)) {
      if (key === advice.wardBedType) {
        price = value;
      }
    }
    return price;
  };

  return (
    <Row>
      <View style={{ width: 0.85 * width }}>
        <View style={{ display: item.Service_Name ? "none" : "flex" }}>
          <TextInput
            placeholder="find packages"
            onChangeText={(text) => handleSearchPres(text)}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              marginVertical: 1,
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}
          />
          <ScrollView
            style={{ marginVertical: 2, padding: 2, maxHeight: 0.15 * height }}
          >
            {Prescription.map((item) => {
              return (
                <Pressable
                  style={styles.service}
                  key={item.ServiceId}
                  onPress={() => addServiceToState(item)}
                >
                  <Text>{item.Service_Name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            display: item.Service_Name ? "flex" : "none",
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: "lightgray",
            borderRadius: 5,
            marginVertical: 4,
          }}
        >
          <RowBetween>
            <View>
              <Text style={{ width: 0.6 * width }}>
                {item.Service_Name ? item.Service_Name : ""}
              </Text>
              <Row>
                <Text style={styles.badge}>
                  {item.Department_Name ? item.Department_Name : ""}
                </Text>
                <Text style={styles.badge}>
                  {item.Department_Type ? item.Department_Type : ""}
                </Text>
              </Row>
            </View>
            <ColumnCenter>
              <Text>{getServicePrice()}</Text>
            </ColumnCenter>
          </RowBetween>
        </View>
      </View>
      <Pressable
        style={{ marginVertical: 5 }}
        onPress={() => deletePackage({ packageindex: index })}
      >
        <Icon name="trash" size={20} />
      </Pressable>
    </Row>
  );
};
const styles = StyleSheet.create({
  service: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "lightgray",
    marginVertical: 2,
    borderRadius: 5,
  },
  badge: {
    backgroundColor: "blue",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    margin: 2,
  },
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
    deletePackage: (item) => dispatch(deletePackage(item)),
    addPackage: (item) => dispatch(addPackage(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Package);
