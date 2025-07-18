// navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/ProductListScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
// import ProfileScreen from '../screens/ProfileScreen'; // If you add one later

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Cart" component={ShoppingCartScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

// And then in AppNavigator.js, you'd render BottomTabNavigator
// <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />