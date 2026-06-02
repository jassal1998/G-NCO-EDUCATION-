import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import SchoolDetails from '../ screens/Category Screen/SchoolDetails';
import FeesDetailsScreen from '../ screens/Category Screen/fees';





const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

        {/* Bottom Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
        />
        <Stack.Screen
  name="SchoolDetails"
  component={SchoolDetails}
  options={{title: 'School Details'}}
/>
   <Stack.Screen
  name="FeesDetailsScreen"
  component={FeesDetailsScreen}
  options={{title: 'Fees Details'}}
/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;