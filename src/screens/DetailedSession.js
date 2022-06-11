import React from "react";
import { View, Text, ScrollView } from "react-native";
import PatientDetailedView from "../styles/PatientDetailsView";

const DetailedSession = ({ route }) => {
  const Session = route.params.data;
  console.log(Session);
  return (
    <ScrollView>
      <View key={Session._id}>
        <View>
          <Text>Stage: {Session.stage}</Text>
          <Text>Status: {Session.status}</Text>
        </View>
        <View>
          <Text>Bed Type: {Session.advice.bedType}</Text>
          <Text>Bed Code: {Session.advice.bedCode}</Text>
          <Text>ICU Stay: {Session.advice.ICUStay}</Text>
          <Text>Ward Stay: {Session.advice.wardStay}</Text>
          <Text>Estimate: {Session.advice.estimate}</Text>
        </View>
        <View>
          {Session.advice.services.map((item) => {
            return (
              <View style={{marginVertical : 5}}>
                <Text>Service Name: {item.serviceName}</Text>
                <Text>Service ID: {item.serviceId}</Text>
                <Text>Department Name: {item.departmentName}</Text>
                <Text>Department Type: {item.departmentType}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailedSession;
