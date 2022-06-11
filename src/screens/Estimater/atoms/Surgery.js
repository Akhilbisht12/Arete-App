import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  addService,
  deleteService,
  addDoctorToSurgery,
  deleteDoctorFromSurgery,
  addMinorToSurgery,
  editMinorSurgeryPercent,
} from "../../../store/actions/adviceAction";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { SurgeryList } from "../../../config/Surgery";
import { ColumnCenter, Row, RowBetween } from "../../../styles/FlexView";

const { width, height } = Dimensions.get("window");

const Surgery = ({
  item,
  index,
  advice,
  addService,
  deleteService,
  addDoctorToSurgery,
  deleteDoctorFromSurgery,
  addMinorToSurgery,
  editMinorSurgeryPercent,
}) => {
  const [Prescription, setPrescription] = useState([]);
  const [doctor, setDoctor] = useState("dr-jhon-doe");
  const [equipment, setEquipment] = useState("equipment_a");

  // handle every tick on finding service
  const handleSearchPres = async (text) => {
    const result = await SurgeryList.filter((str) => {
      return str.Service_Name.toLowerCase().includes(text.toLowerCase());
    });
    setPrescription(result.slice(0, 100));
  };

  const addServiceToState = (item) => {
    const tempService = {
      ...item,
      surgeon: [],
      minor: 100,
      isMinor: false,
    };
    addService({ newService: tempService, s_id: index });
  };

  const getServicePrice = ()=>{
    let price = null;
    for(const [key, value] of Object.entries(item)){
      if(key === advice.wardBedType){
        price = value + 0.3*value + 0.35*value + 0.9*value + 0.15*value  
      }
    }
    return price
  }

  return (
    <Row>
      <View style={{ width: 0.85 * width }}>
        <View style={{ display: item.Service_Name ? "none" : "flex" }}>
          <TextInput
            placeholder="find service"
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
          <View
            style={{
              width: 0.85 * width,
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {item.surgeon
              ? item.surgeon.map((surgeo, surgeonIndex) => {
                  return (
                    <RowBetween
                      style={{
                        backgroundColor: "lightblue",
                        paddingVertical: 2,
                        paddingHorizontal: 4,
                        margin: 2,
                        borderRadius: 3,
                      }}
                      key={surgeonIndex}
                    >
                      <Text style={{ paddingHorizontal: 3 }}>
                        {surgeo.name}
                      </Text>
                      <Pressable
                        onPress={() =>
                          deleteDoctorFromSurgery({
                            surgeonIndex,
                            surgeryIndex: index,
                          })
                        }
                      >
                        <Icon name="close-circle-outline" size={16} />
                      </Pressable>
                    </RowBetween>
                  );
                })
              : null}
          </View>
          <View
            style={{
              display: item.Department_Type == "SURGERY" ? "flex" : "none",
            }}
          >
            <Row>
              <Picker
                style={{ width: 0.35 * width }}
                onValueChange={(itemValue, itemIndex) =>
                  addDoctorToSurgery({
                    surgeon: { name: itemValue },
                    serviceindex: index,
                  })
                }
              >
                <Picker.Item label="Dr Jhon Doe" value="dr-jhon-doe" />
                <Picker.Item label="Dr Anna Doe" value="dr-anna-doe" />
                <Picker.Item label="Dr James Doe" value="dr-james-doe" />
                <Picker.Item label="Dr Shirley Doe" value="dr-shirley-doe" />
              </Picker>
              <Picker
                style={{ width: 0.35 * width }}
                selectedValue={doctor}
                onValueChange={(itemValue, itemIndex) => setDoctor(itemValue)}
              >
                <Picker.Item label="equipment_a" value="equipment_a" />
                <Picker.Item label="equipment_b" value="equipment_b" />
                <Picker.Item label="equipment_c" value="equipment_c" />
                <Picker.Item label="equipment_d" value="equipment_d" />
              </Picker>
            </Row>
            <Row style={{ display: index === 0 ? "none" : "flex" }}>
              <Row>
                <Text>Same Site</Text>
                <Pressable
                  onPress={() => {
                    addMinorToSurgery({
                      minorsurgeryindex: index,
                      minorsurgery: !item.isMinor,
                    });
                    editMinorSurgeryPercent({
                      surgerypercent: 50,
                      minorpercentindex: index,
                    });
                  }}
                  style={{ marginHorizontal: 10 }}
                >
                  <Icon
                    size={20}
                    name={item.isMinor ? "checkbox-outline" : "square-outline"}
                  />
                </Pressable>
              </Row>
              {/* <View style={{ display: item.isMinor ? "flex" : "none" }}>
                <TextInput
                  onChangeText={(text) =>
                    editMinorSurgeryPercent({
                      surgerypercent: text,
                      minorpercentindex: index,
                    })
                  }
                  value={item.minor}
                  keyboardType="number-pad"
                  placeholder="Percent"
                  style={styles.input}
                />
              </View> */}
            </Row>
          </View>
        </View>
      </View>
      <Pressable
        style={{ marginVertical: 5 }}
        onPress={() => deleteService({ servicedeleteindex:index })}
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
    addService: (item) => dispatch(addService(item)),
    deleteService: (item) => dispatch(deleteService(item)),
    addDoctorToSurgery: (item) => dispatch(addDoctorToSurgery(item)),
    deleteDoctorFromSurgery: (item) => dispatch(deleteDoctorFromSurgery(item)),
    addMinorToSurgery: (item) => dispatch(addMinorToSurgery(item)),
    editMinorSurgeryPercent: (item) => dispatch(editMinorSurgeryPercent(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surgery);
