import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../ screens/HomeScreen';
import ProfileScreen from '../ screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({color, size, focused}) => {
          let iconName = '';

          if (route.name === 'HomeTab') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (
            route.name === 'ProfileScreen'
          ) {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarStyle: {
          height: 90,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}>
      
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{title: 'Home'}}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTabs;