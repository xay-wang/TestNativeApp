// components/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout'; // Using Layout for consistency

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={product.imageUrl} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toFixed(2)}₭</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius,
    margin: Layout.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    width: (Layout.window.width / 2.1) - (Layout.spacing.small * 2), // Two columns with margin
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: Layout.borderRadius,
    borderTopRightRadius: Layout.borderRadius,
  },
  infoContainer: {
    padding: Layout.spacing.small,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.small / 2,
    color: Colors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default ProductCard;