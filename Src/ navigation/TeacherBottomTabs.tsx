import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TeacherDashboard from '../Teacher/TeacherDashboard';
import AttendanceScreenTeacher from '../Teacher/AttendanceScreen';

const Tab = createBottomTabNavigator();

const TeacherBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarStyle: {
          height: 85,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (
            route.name ===
            'AttendanceScreenTeacher'
          ) {
            iconName = focused
              ? 'calendar'
              : 'calendar-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}>
      
      <Tab.Screen
        name="Dashboard"
        component={TeacherDashboard}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="AttendanceScreenTeacher"
        component={AttendanceScreenTeacher}
        options={{
          tabBarLabel: 'Attendance',
        }}
      />

    </Tab.Navigator>
  );
};

export default TeacherBottomTabs;