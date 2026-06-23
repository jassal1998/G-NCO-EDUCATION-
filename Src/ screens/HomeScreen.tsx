import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from '../compoment/Header';
import SchoolGallery from '../compoment/SchoolGallery';
import CategorySection from '../compoment/CategorySection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMySchool} from '../Redux/api/schoolApiMethods';
const HomeScreen = () => {
  useEffect(() => {
    const checkTokens = async () => {
      const token = await AsyncStorage.getItem('token');

      const refreshToken =
        await AsyncStorage.getItem(
          'refreshToken',
        );

      console.log('TOKEN =>', token);
      console.log(
        'REFRESH TOKEN =>',
        refreshToken,
      );
    };

    checkTokens();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        <SchoolGallery />

        <CategorySection />

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    paddingBottom: 30,
  },
});