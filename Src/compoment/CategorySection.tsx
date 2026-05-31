import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const categories = [
  {id: '1', title: 'School', icon: '🏫'},
  {id: '2', title: 'Homework', icon: '📚'},
  {id: '3', title: 'Parents', icon: '👨‍🏫'},
  {id: '4', title: 'Fees Details', icon: '💰'},
  {id: '5', title: 'Attendance', icon: '📅'},
  {id: '6', title: 'Results', icon: '📝'},
];

const CategorySection = () => {
  return (
    <FlatList
      data={categories}
      numColumns={2}
      scrollEnabled={false}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: 'center',
    elevation: 4,
  },
  icon: {
    fontSize: 35,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});