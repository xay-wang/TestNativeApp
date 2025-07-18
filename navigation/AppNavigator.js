// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import Colors from '../constants/Colors';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext'; // To display cart count

const Stack = createNativeStackNavigator();

const CartIcon = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
      style={styles.cartIconContainer}
      onPress={() => navigation.navigate('ShoppingCart')}
    >
      <Text style={styles.cartText}>🛒</Text>
      {totalItems > 0 && (
        <Text style={styles.cartBadge}>{totalItems}</Text>
      )}
    </TouchableOpacity>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{
            title: 'ສິນຄ້າຂອງພວກເຮົາ',
            headerRight: () => <CartIcon />,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ route }) => ({
            title: route.params?.product.name || 'Product Details',
            headerRight: () => <CartIcon />,
          })}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCartScreen}
          options={{ title: 'ກະຕ່າສິນຄ້າ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  cartText: {
    fontSize: 24,
  },
  cartBadge: {
    backgroundColor: Colors.accent,
    color: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: -5, // Overlap the emoji slightly
    marginTop: -10, // Adjust position
  },
});

export default AppNavigator;