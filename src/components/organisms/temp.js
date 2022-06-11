import React from "react";
import { View, Text } from "react-native";

const temp = () => {
  return (
    <ScrollView>
      <PatientDetailedView style={{ backgroundColor: "#E4DFDA" }}>
        {/* select type of admission */}
        <Picker
          selectedValue={advice.isIPDPackage}
          onValueChange={(itemValue, itemIndex) =>
            editIPDPackages({ ipd: itemValue })
          }
        >
          <Picker.Item value={true} label="IPD Package" />
          <Picker.Item value={false} label="Non IPD Package" />
        </Picker>
        <View
          style={{
            marginBottom: 8,
            display: advice.isIPDPackage ? "none" : "flex",
          }}
        >
          <WardBedDetails />
          <IcuBedDetails />
        </View>
        <RowBetween>
          <Text style={{ fontSize: 16 }}>Is Emergency</Text>
          <Pressable
            onPress={() => editEmergency({ emergency: !advice.isEmergency })}
          >
            <Icon
              name={advice.isEmergency ? "checkbox-outline" : "square-outline"}
              size={25}
            />
          </Pressable>
        </RowBetween>
        <View style={{ marginVertical: 5 }}>
          <RowBetween style={{ marginVertical: 2 }}>
            <TextInput
              value={advice.doctor}
              onChangeText={(text) => addDoctor({ doctor: text })}
              placeholder="Dr Name"
              style={[styles.input, { width: 0.43 * width }]}
            />
            <TextInput
              value={advice.remark}
              onChangeText={(text) => addRemark({ remark: text })}
              placeholder="Remarks"
              style={[styles.input, { width: 0.43 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <TextInput
              value={advice.paymentType}
              onChangeText={(text) => addPaymentType({ paymentType: text })}
              placeholder="Payment Type"
              style={[styles.input, { width: 0.43 * width }]}
            />
            <TextInput
              value={advice.paymentCompany}
              onChangeText={(text) => addPaymentCompany(text)}
              placeholder="Company"
              style={[styles.input, { width: 0.43 * width }]}
            />
          </RowBetween>
        </View>
        <View>
          {advice.services.map((item, index) => {
            return <Advice key={index} item={item} index={index} />;
          })}
          <Pressable style={{ marginVertical: 5 }} onPress={() => addAdvice()}>
            <Text
              style={{
                color: "blue",
              }}
            >
              Add a service
            </Text>
          </Pressable>
        </View>
        <View>
          {advice.addCharges.map((item, index) => {
            return (
              <RowBetween style={{ marginVertical: 2 }} key={index}>
                <TextInput
                  value={item.key}
                  onChangeText={(text) =>
                    editCharge({
                      key: text,
                      value: item.value,
                      chargeIndex: index,
                    })
                  }
                  placeholder="Key"
                  style={[styles.input, { width: 0.41 * width }]}
                />
                <TextInput
                  value={item.value}
                  keyboardType="number-pad"
                  onChangeText={(text) =>
                    editCharge({
                      key: item.key,
                      value: text,
                      chargeIndex: index,
                    })
                  }
                  placeholder="value"
                  style={[styles.input, { width: 0.41 * width }]}
                />
                <Pressable
                  onPress={() => deleteAddCharge({ deleteChargeIndx: index })}
                >
                  <Icon name="trash" size={20} />
                </Pressable>
              </RowBetween>
            );
          })}

          <Pressable onPress={() => addCharge()}>
            <Text style={{ marginVertical: 5, color: "blue" }}>
              Add Additional Charges
            </Text>
          </Pressable>
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ color: "green" }}>Est: {total}</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("EstimatePreview")}
          style={{ backgroundColor: "lightblue", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ textAlign: "center" }}>Preview</Text>
        </Pressable>
      </PatientDetailedView>
    </ScrollView>
  );
};

export default temp;
