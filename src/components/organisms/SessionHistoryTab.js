import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import axios from "axios";
import { SERVER_URL } from "../../config/variables";
import PatientDetailedView from "../../styles/PatientDetailsView";
import moment from "moment";
import { ColumnEvenly, RowBetween } from "../../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SessionHistoryTab = ({ route }) => {
  const navigation = useNavigation();
  const { patientID } = route.params;
  const [AllSessions, setAllSessions] = useState([]);
  useEffect(async () => {
    const allSessions = await axios.post(
      `${SERVER_URL}/api/v1/patient/getAllSessions`,
      {
        patientID,
      }
    );
    setAllSessions(allSessions.data);
  }, []);
  return (
    <View>
      {AllSessions.map((item) => {
        return (
          <PatientDetailedView
            key={item._id}
            style={{ backgroundColor: "#E4DFDA" }}
          >
            <RowBetween>
              <View>
                <Text>{moment(item.createdAT).format("D-MMM-YY hh:mm a")}</Text>
                <Text>status: {item.status}</Text>
                <Text>stage: {item.stage}</Text>
                {/* <Text>
                  Last Activity: {item.activity[item.activity.length-1].taskType}
                  {item.activity[item.activity.length - 1].activityType}
                </Text> */}
              </View>
              <ColumnEvenly>
                <Pressable
                  onPress={() =>
                    navigation.navigate("DetailedSession", { data: item })
                  }
                >
                  <Icon name="eye-outline" size={25} />
                </Pressable>
                <Pressable>
                  <Icon name="create-outline" size={25} />
                </Pressable>
              </ColumnEvenly>
            </RowBetween>
          </PatientDetailedView>
        );
      })}
    </View>
  );
};

export default SessionHistoryTab;
