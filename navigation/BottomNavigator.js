import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/ProductListScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Cart" component={ShoppingCartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;