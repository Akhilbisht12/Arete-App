import React from 'react';
import {View, Text} from 'react-native';
import Index from '../screens/Index';
import PatientEntry from '../screens/PatientEntry';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FindPatientByID from '../screens/FindPatientByID';
import DetailedSession from '../screens/DetailedSession';
import LoginScreen from '../screens/Auth/LoginScreen';
import QuickPrescriptionUpload from '../screens/QuickPrescription/QuickPrescriptionUpload';
import EstimatePreview from '../components/organisms/EstimatePreview';
import CreateEstimate from '../screens/Estimater/CreateEstimate';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import EstimateOutput from '../screens/EstimateOutput';
import SessionHistoryTab from '../components/organisms/SessionHistoryTab';
import AgentIndex from '../screens/AgentIndex';
import RegisterPatient from '../screens/RegisterPatient';
import BottomNavigator from './BottomNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import FullPrescriptionUpload from '../screens/FullPrescriptionUpload';
import QuerySupervisor from '../screens/QuerySupervisor';
import Preview from '../screens/StandaloneEstimater/Preview';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="FindPatient" component={FindPatientByID} />
      <Stack.Screen name="AgentIndex" component={BottomNavigator} />
      <Stack.Screen
        name="FullPrescription"
        component={FullPrescriptionUpload}
      />
      <Stack.Screen name="Home" component={Index} />
      <Stack.Screen name="PatientEntry" component={PatientEntry} />
      <Stack.Screen name="PatientHistory" component={SessionHistoryTab} />
      <Stack.Screen name="DetailedSession" component={DetailedSession} />
      <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
      <Stack.Screen
        name="QuickPrescriptionUpload"
        component={QuickPrescriptionUpload}
      />
      <Stack.Screen name="Supervisor Query" component={QuerySupervisor} />
      <Stack.Screen name="CreateEstimate" component={CreateEstimate} />
      <Stack.Screen name="EstimatePreview" component={EstimatePreview} />
      <Stack.Screen name="EstimateOutput" component={EstimateOutput} />
      <Stack.Screen name="SAEstPrev" component={Preview} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
