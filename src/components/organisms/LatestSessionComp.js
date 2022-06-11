import React from "react";
import { View, Text } from "react-native";
import moment from "moment";

const LatestSessionComp = ({ session }) => {
  return (
    <View>
      <Text>
        Last Session: {moment(session.createdAT).format("dd-mm-yy h:mm a")}
      </Text>
      <Text>Status: {session.status}</Text>
      <Text>Stage: {session.stage}</Text>
      {session.activity.map((item) => {
        return (
          <View key={item._id}>
            <Text>Activity Type: {item.activityType}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default LatestSessionComp;
