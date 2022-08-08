import React from 'react';
import Index from '../screens/Index';
import PatientEntry from '../screens/PatientEntry';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import QuickPrescriptionUpload from '../screens/QuickPrescription/QuickPrescriptionUpload';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import BottomNavigator from './BottomNavigator';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import Preview from '../screens/FullPrescription/Preview';
import FullPrescription from '../screens/FullPrescription/FullPrescription';
import History from '../screens/History/History';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="AgentIndex" component={BottomNavigator} />
      <Stack.Screen name="FullPrescription" component={FullPrescription} />
      <Stack.Screen name="Home" component={Index} />
      <Stack.Screen name="PatientEntry" component={PatientEntry} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen
        name="QuickPrescriptionUpload"
        component={QuickPrescriptionUpload}
      />
      <Stack.Screen name="SAEstPrev" component={Preview} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
