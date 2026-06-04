import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoleSelectionScreen from '../authScreen/RoleSelectionScreen';
import LoginScreen from '../authScreen/LoginScreen';
import AttendanceScreen from '../ screens/Category Screen/Attendnce';
import HomeworkScreen from '../ screens/Category Screen/HomeworkScreen';
import BottomTabs from './BottomTabs';
import SchoolDetails from '../ screens/Category Screen/SchoolDetails';
import FeesDetailsScreen from '../ screens/Category Screen/fees';
import TeacherDashboard from '../Teacher/TeacherDashboard';
import TeacherBottomTabs from './TeacherBottomTabs';
import CategorySection from '../compoment/CategorySection';
import CategoryTeacher from '../Teacher/CategorySection';
import FeesScreen from '../Teacher/FeesScreen';
import AttendanceScreenTeacher from '../Teacher/AttendanceScreen';
import HomeworkScreenTeacher from '../Teacher/HomeworkScreen';



const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="RoleSelectionScreen"
          component={RoleSelectionScreen}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />

        <Stack.Screen
          name="AttendanceScreen"
          component={AttendanceScreen}
        />

        <Stack.Screen
          name="HomeworkScreen"
          component={HomeworkScreen}
        />

        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
        />

        <Stack.Screen
          name="SchoolDetails"
          component={SchoolDetails}
        />

        <Stack.Screen
          name="FeesDetailsScreen"
          component={FeesDetailsScreen}
        />

       <Stack.Screen
  name="TeacherTabs"
  component={TeacherBottomTabs}
/>
  <Stack.Screen
  name="CategoryTeacher"
  component={CategoryTeacher}
/>
<Stack.Screen
  name="FeesScreen"
  component={FeesScreen}
/>
<Stack.Screen
  name="AttendanceScreenTeacher"
  component={AttendanceScreenTeacher}
/>
<Stack.Screen
  name="HomeworkScreenTeacher"
  component={HomeworkScreenTeacher}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;