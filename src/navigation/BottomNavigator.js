import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import RegisterPatient from '../screens/RegisterPatient';
import AgentIndex from '../screens/Dashboard/AgentIndex';
import AgentSetting from '../screens/AgentSetting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FindPatientByID from '../screens/PatientFind/FindPatientByID';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Add Patient':
              iconName = 'add-circle-outline';
              break;

            case 'Find':
              iconName = 'search-outline';
              break;
            case 'Agent':
              iconName = 'person-outline';
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarStyle: {
          backgroundColor: 'rgb(24,16,65)',
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={AgentIndex}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Add Patient" component={RegisterPatient} />
      <Tab.Screen name="Find" component={FindPatientByID} />
      <Tab.Screen name="Agent" component={AgentSetting} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
