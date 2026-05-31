import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Header from '../compoment/Header';
import SchoolGallery from '../compoment/SchoolGallery';
import CategorySection from '../compoment/CategorySection';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View>   <SchoolGallery /></View>
      <View><CategorySection /></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});