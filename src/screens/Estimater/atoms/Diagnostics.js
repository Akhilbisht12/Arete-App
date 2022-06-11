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
import {
  addInvestigationTotal,
  addDiagnostic,
  addProcedureTotal,
  deleteDiagnostic,
} from "../../../store/actions/adviceAction";
import { ColumnCenter, Row, RowBetween } from "../../../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";
import { ProcedureList } from "../../../config/Procedures";

const { width, height } = Dimensions.get("window");

const Diagnostics = ({
  item,
  index,
  advice,
  addDiagnostic,
  deleteDiagnostic,
  addProcedureTotal,
}) => {
  const [Prescription, setPrescription] = useState([]);
  const [closeInput, setcloseInput] = useState(true);

  const handleSearchPres = async (text) => {
    const result = await ProcedureList.filter((str) => {
      return str.Service_Name.toLowerCase().includes(text.toLowerCase());
    });
    setPrescription(result.slice(0, 100));
  };

  const addServiceToState = (item) => {
    addDiagnostic({ newDiagnostic: item, d_id: index });
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
    <Row style={{ width: width * 0.8 }}>
      <View>
        <View style={{ display: item.Service_Name ? "none" : "flex" }}>
          <RowBetween>
            <TextInput
              placeholder="Search Diagnostics"
              onChangeText={(text) => handleSearchPres(text)}
              style={[
                styles.input,
                { display: closeInput == true ? "flex" : "none" },
              ]}
            />
            <Pressable
              style={{ marginHorizontal: 10, justifyContent: "center" }}
              onPress={() => {
                setcloseInput(!closeInput);
              }}
            >
              {closeInput == true ? (
                <Icon name="close-circle" size={25} color={"black"} />
              ) : (
                <Icon name="create" size={25} color={"black"} />
              )}
            </Pressable>
          </RowBetween>
          <ScrollView
            nestedScrollEnabled={true}
            style={{
              marginVertical: 2,
              padding: 2,
              maxHeight: 0.2 * height,
            }}
          >
            {Prescription.map((item) => {
              return (
                <Pressable
                  style={styles.service}
                  key={item.ServiceId}
                  onPress={() => addServiceToState(item)}
                >
                  <Text style={{ fontFamily: "Poppins-Medium" }}>
                    {item.Service_Name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            display: item.Service_Name ? "flex" : "none",
            paddingVertical: 5,
            flexDirection: "row",
            width: width * 0.85,
            paddingHorizontal: 10,
            backgroundColor: "olive",
            borderRadius: 5,
            marginVertical: 4,
          }}
        >
          <Pressable
            style={{
              borderRadius: 7,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => deleteDiagnostic({ diagnosticindex: index })}
          >
            <Icon name="trash" size={20} color={"white"} />
          </Pressable>
          <RowBetween>
            <View>
              <Text
                style={{
                  width: 0.6 * width,
                  fontFamily: "Poppins-Medium",
                  color: "white",
                }}
              >
                {console.log(item)}
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
            {/* <ColumnCenter>
              <Text>{getServicePrice()}</Text>
            </ColumnCenter> */}
          </RowBetween>
        </View>
      </View>
    </Row>
  );
};
const styles = StyleSheet.create({
  service: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: "lightgray",
    marginVertical: 2,
    borderRadius: 5,
  },
  badge: {
    backgroundColor: "#030027",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    margin: 2,
    fontFamily: "Poppins-Medium",
  },
  input: {
    width: width * 0.7,
    backgroundColor: "#f5f5f5",
    color: "black",
    borderRadius: 5,
    height: 35,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    deleteDiagnostic: (item) => dispatch(deleteDiagnostic(item)),
    addDiagnostic: (item) => dispatch(addDiagnostic(item)),
    addProcedureTotal: (item) => dispatch(addProcedureTotal(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Diagnostics);
