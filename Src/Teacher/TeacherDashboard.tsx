import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from '../compoment/Header';
import SchoolGallery from '../compoment/SchoolGallery';
import TeacherStudentsCard from './TeacherStudentsCard';


const TeacherDashboard = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>

      <Header />
      <View>   <SchoolGallery /></View>
    <View>   <TeacherStudentsCard /></View>


    

    </ScrollView>
  );
};

export default TeacherDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
});