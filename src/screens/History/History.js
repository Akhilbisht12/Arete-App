import {View, ScrollView, ToastAndroid, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from '../../config/variables';
import SillyView from '../../Silly/components/SillyView';
import SillyText from '../../Silly/components/SillyText';
import silly from '../../Silly/styles/silly';
import {clr1, clr2, clr5} from '../../config/globals';
import Icon from 'react-native-vector-icons/Ionicons';

const History = ({route, navigation}) => {
  const [history, setHistory] = useState([]);
  const getPatientHistory = async () => {
    try {
      const historyres = await axios.get(
        `${SERVER_URL}/api/v1/lead/patient/${route.params.uhid}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );
      setHistory(historyres.data);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        'Failed getting patient history. Please try again!',
        ToastAndroid.SHORT,
      );
    }
  };
  useEffect(() => {
    getPatientHistory();
  }, []);
  return (
    <ScrollView contentContainerStyle={[silly.p1]}>
      <View style={[silly.fr, silly.aic]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[silly.aic]}>
          <Icon color={clr1} name="chevron-back-outline" size={30} />
        </TouchableOpacity>
        <SillyText family="Medium" color={clr1} size={30}>
          History
        </SillyText>
      </View>

      <View>
        {history.length === 0 ? (
          <SillyText color={clr5}>
            Patient has no previous appointments
          </SillyText>
        ) : (
          history.map((item, i) => {
            return (
              <SillyView key={i}>
                <SillyText color={clr1} size={20}>
                  Diagnosis: {item.diagnosis}
                </SillyText>
                <SillyText color={clr1}>
                  Doctor: {item.doctor} ({item.speciality})
                </SillyText>
                <SillyText color={clr1}>
                  Progress: {item.stages.selected.name}
                </SillyText>
                <SillyText color={clr1}>Priority: {item.priority}</SillyText>
              </SillyView>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default History;
