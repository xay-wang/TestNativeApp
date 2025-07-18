// screens/ProductDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Added to Cart!', `${product.name} has been added to your cart.`, [
      { text: 'OK', style: 'cancel' },
      { text: 'View Cart', onPress: () => navigation.navigate('ShoppingCart') } // Assuming you pass navigation prop or use useNavigation()
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={product.imageUrl} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toFixed(2)}₭</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>ເພີ່ມເຂົ້າກະຕ່າ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain', // Or 'cover' depending on preference
    backgroundColor: Colors.background, // In case image has transparency
  },
  detailsContainer: {
    padding: Layout.spacing.medium,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.small,
    color: Colors.text,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Layout.spacing.medium,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: Layout.spacing.large,
  },
  addToCartButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Layout.spacing.medium,
    borderRadius: Layout.borderRadius,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;