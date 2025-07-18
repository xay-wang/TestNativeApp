import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ຄົ້ນຫາສິນຄ້າ..."
        placeholderTextColor={Colors.lightGray}
        value={searchQuery}
        onChangeText={onSearchChange}
        onSubmitEditing={onSearchSubmit} // Trigger search on keyboard "done"
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Layout.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  input: {
    height: 40,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: Layout.borderRadius,
    paddingHorizontal: Layout.spacing.medium,
    fontSize: 16,
    color: Colors.text,
  },
});

export default SearchBar;