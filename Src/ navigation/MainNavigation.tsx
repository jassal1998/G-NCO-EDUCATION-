import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../ screens/HomeScreen';



const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />

        {/* <Tab.Screen
          name="School"
          component={SchoolScreen}
        />

        <Tab.Screen
          name="Account"
          component={AccountScreen}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;