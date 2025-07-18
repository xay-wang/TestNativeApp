import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { PRODUCTS } from '../constants/Data';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const ProductListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const results = PRODUCTS.filter(
          (product) =>
            product.name.toLowerCase().includes(lowercasedQuery) ||
            product.category.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(results);
        setLoading(false);
      }, 500); // Simulate network delay
    };

    fetchProducts();
  }, [searchQuery]);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => { /* search is already handled by useEffect on query change */ }}
      />
      {filteredProducts.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noResultsText}>!ບໍ່ພົບສິນຄ້າ.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
          numColumns={2} // Display in 2 columns
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingHorizontal: Layout.spacing.small,
    paddingBottom: Layout.spacing.medium,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Layout.spacing.small,
    fontSize: 16,
    color: Colors.text,
  },
  noResultsText: {
    fontSize: 18,
    color: Colors.red,
    textAlign: 'center',
    marginTop: Layout.spacing.large,
  },
});

export default ProductListScreen;