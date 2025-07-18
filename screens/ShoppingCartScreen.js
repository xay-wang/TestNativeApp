// screens/ShoppingCartScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const ShoppingCartScreen = ({ navigation }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.imageUrl } style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toFixed(2)}₭</Text>
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
        />
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Your shopping cart is empty. Add some items first!");
      return;
    }
    Alert.alert(
      "Checkout",
      `ລວມ: ${getCartTotal().toFixed(2)}\n\nProceed with payment? (This is a demo)`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => Alert.alert("Success!", "Checkout completed. Thanks for shopping!") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>ກະຕ່າຫວ່າງເປົ່າ!</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('ProductList')}
          >
            <Text style={styles.browseButtonText}>ເລີ່ມຊອບປິ່ນ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContentContainer}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.totalText}>ລວມ: {getCartTotal().toFixed(2)}₭</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>ດໍາເນີນການຊໍາລະເງິນ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContentContainer: {
    padding: Layout.spacing.small,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius,
    padding: Layout.spacing.small,
    marginBottom: Layout.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: Layout.borderRadius / 2,
    marginRight: Layout.spacing.small,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: Colors.red,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.small,
  },
  removeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    padding: Layout.spacing.medium,
    backgroundColor: Colors.white,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: Layout.spacing.medium,
    color: Colors.text,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.medium,
    borderRadius: Layout.borderRadius,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 20,
    color: Colors.text,
    marginBottom: Layout.spacing.large,
  },
  browseButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Layout.spacing.medium,
    paddingHorizontal: Layout.spacing.large,
    borderRadius: Layout.borderRadius,
  },
  browseButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoppingCartScreen;