import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TeacherDashboard from '../Teacher/TeacherDashboard';
import AttendanceScreenTeacher from '../Teacher/AttendanceScreen';


const Tab = createBottomTabNavigator();

const TeacherBottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Dashboard"
        component={TeacherDashboard}
      />

      <Tab.Screen
        name="AttendanceScreenTeacher"
        component={AttendanceScreenTeacher}
      />

     
    </Tab.Navigator>
  );
};

export default TeacherBottomTabs;